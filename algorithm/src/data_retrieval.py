import requests
import pandas as pd
import networkx as nx
import osmnx as ox



def fixGraphData(graph):
    nodes, edges = ox.graph_to_gdfs(graph)
    
    edges.drop(columns=['highway', 'access', 'oneway', 'reversed', 'lanes', 'ref', 'tunnel', 'junction', 'bridge',
       'width', 'est_width', 'service'], inplace=True)
    
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
    API_KEY = "ThfURaOhGRaty7mx9AKALwrbyIZApHd8"
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