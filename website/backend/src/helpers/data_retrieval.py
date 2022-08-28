import requests
import pandas as pd
import osmnx as ox
import networkx as nx
import math
from shapely.geometry import Point, LineString

from graph_helpers import fixWrongDataE



def fixGraphData(graph):
    nodes, edges = ox.graph_to_gdfs(graph)
    
    edges = edges[['osmid', 'name', 'maxspeed', 'length', 'geometry', 'oneway']]
    
    edges.rename(columns={'maxspeed': 'maxSpeed'}, inplace=True)
    
    # Converting length from meters to miles
    meterInMiles = 0.00062137
    edges['length'] = edges['length'].apply(lambda x: x * meterInMiles)
    
    # Fillna with mode, and convert string to int
    edges['maxSpeed'].fillna((edges['maxSpeed'].mode()[0]), inplace=True)
    edges['maxSpeed'] = edges['maxSpeed'].apply(convertMaxSpeedToInt)
    
    # Add new noWay column
    edges['noWay'] = 0
    
    edges['weight'] = float('inf')
    
    edges['speedOrMaxSpeed'] = int(1)
    
    add_full_traffic_data(edges)
    
    fixWrongDataE(edges)
    
    return ox.graph_from_gdfs(nodes, edges)


# Gets the traffic data from tomtom for all the edges
def add_full_traffic_data(edges):
    
    edges.name = (edges.name).astype(str)
    names = edges.name.unique()
    
    for name in names:
        add_specific_traffic_data(edges, name)
        
        
        
def convertMaxSpeedToInt(speed):
    if type(speed) == list:
        speeds = []
        for i in speed:
            speeds.append(convertMaxSpeedToInt(i))
        
        return max(speeds)
    else:
        return int((speed.split(" ")[0]))
        


# Gets the traffic data from tomtom for a specific street (all edges with this street name)
def add_specific_traffic_data(edges, name):
    # Create request URL
    BASE_URL = "https://api.tomtom.com/"
    API_KEY = "YOUR KEY"
    #zoom = 22
    TRAFFIC_URL = "traffic/services/4/flowSegmentData/absolute/22/json?key="
    UNIT = "unit=mph"
    ROAD_CLOSURE = "roadClosure=True"
    PARAMS = "&" + UNIT + "&" + ROAD_CLOSURE
    
    coordinates = list(edges.loc[edges['name'] == name].iloc[0].geometry.coords)[0]
    longitude = str(coordinates[0])
    latitude = str(coordinates[1])
    location = "point=" + latitude + ","+ longitude

    request_url = BASE_URL + TRAFFIC_URL + API_KEY + "&" + location + PARAMS
    # Get data
    response = requests.get(request_url)
    
    data = response.json()['flowSegmentData']
    traffic = pd.json_normalize(data)
    
    #edges.loc[edges['name'] == name, 'road_type'] = traffic.frc[0]
    edges.loc[edges['name'] == name, 'speed'] = traffic.currentSpeed[0]
    #edges.loc[edges['name'] == name, 'free_flow_speed'] = traffic.freeFlowSpeed[0]
    #edges.loc[edges['name'] == name, 'traffic_confidence'] = traffic.confidence[0]
    edges.loc[edges['name'] == name, 'isClosed'] = (traffic.roadClosure[0]).astype(int)
    
    


def multiDiGraphToDiGraph(G):
    nodes, edges = ox.graph_to_gdfs(G)
    toChange = edges.query('key == 1').copy()
    
    for index, row in toChange.iterrows():
        coords = list(row['geometry'].coords)
        maxDistance = 0
        for i in range(len(coords) -  1):
            pair = coords[i]
            nextPair = coords[i+1]
            
            if (i == 0):
                distance = math.sqrt( (pair[0] - nextPair[0])** 2 + (pair[1] - nextPair[1])**2 )      
                
            maxDistance += math.sqrt( (pair[0] - nextPair[0])** 2 + (pair[1] - nextPair[1])**2 )  
            
        ratio = distance / maxDistance

        newEdge1 = row.copy()
        newEdge2 = row.copy()

        newEdge1.geometry = LineString([Point(x[0], x[1]) for x in coords[:2]])
        newEdge2.geometry = LineString([Point(x[0], x[1]) for x in coords[1:]])

        newEdge1.length = newEdge1.length * ratio
        newEdge2.length = newEdge2.length * (1 - ratio)

        newNode = nodes.loc[index[0]].copy()
        newPoint = coords[1]
        
        newNode.geometry = Point(newPoint)
        newNode.y = newPoint[1]
        newNode.x = newPoint[0]
        
        newNodeName = round(int(str(index[0]) + str(index[1])) / 1e5)
        
        print(newNodeName in  nodes.index)
        
        edges.loc[(index[0], newNodeName, 0)] = newEdge1
        edges.loc[(newNodeName, index[1], 0)] = newEdge2
        
        nodes.loc[newNodeName] = newNode
        
        print((index[0], newNodeName, 0), (newNodeName, index[1], 0), newNodeName)
        
    edges.drop(edges.query('key == 1').index, inplace=True)

    G_new = ox.graph_from_gdfs(nodes, edges)
    
    return G_new


    
    
    
# address = '30 Aldwych, London WC2B 4BG'
# G = ox.graph_from_address(address, network_type="drive")
# G = fixGraphData(G)

# ox.save_graphml(G)