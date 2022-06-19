import requests
import pandas as pd


# Gets the traffic data from tomtom for all the edges
def get_full_traffic_data(edges):
    
    names = edges.name.value_counts().index
    
    for name in names:
        get_specific_traffic_data(edges, name)


#TODO: Fix this for lists as name

# Gets the traffic data from tomtom for a specific street (all edges with this street name)
def get_specific_traffic_data(edges, name):
    # Create request URL
    BASE_URL = "https://api.tomtom.com/"
    API_KEY = "ThfURaOhGRaty7mx9AKALwrbyIZApHd8"
    #zoom = 22
    TRAFFIC_URL = "traffic/services/4/flowSegmentData/absolute/22/json?key="
    UNIT = "unit=kmph"
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
    
    edges.loc[edges['name'] == name, 'road_type'] = traffic.frc[0]
    edges.loc[edges['name'] == name, 'current_speed_kmph'] = traffic.currentSpeed[0]
    edges.loc[edges['name'] == name, 'free_flow_speed_kmph'] = traffic.freeFlowSpeed[0]
    edges.loc[edges['name'] == name, 'traffic_confidence'] = traffic.confidence[0]
    edges.loc[edges['name'] == name, 'road_closure'] = traffic.roadClosure[0]