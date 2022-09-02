import osmnx as ox
import numpy as np
import pandas as pd
from ast import literal_eval

from src.final_functions import getPathExplanation, getDesiredPathFromWaypoint, variablesToUseFix, getAnytimeAlgorithmData

np.random.seed(0)

G = ox.load_graphml('./data/graph-BH-1km-7-7-22-0130.graphml')
variablesToUse = ['noWay', 'isClosed', 'maxSpeed', 'speed']
variablesToUseFix(variablesToUse)

data = pd.read_csv('./data/hundred_original_vs_anytime.csv')
data.nodes = data.nodes.apply(literal_eval)

nodes_100 = []
original_100 = []
for index, row in data.iterrows():
    current_nodes = row.nodes
    
    desired_path_original = getDesiredPathFromWaypoint(current_nodes, variablesToUse)
    
    nodes_100.append(current_nodes)
    
    if (len(desired_path_original) > 0):
        shortest_path_original, explanations_original, original_value = getPathExplanation(desired_path_original, variablesToUse)
    else:
        original_value = 'No Path'
        
    original_100.append([original_value])
        
    newData = pd.DataFrame({
        'nodes': nodes_100,
        'original_algorithm_value': original_100,
        })


    newData.to_csv('./data/fixed_hundred_original_vs_anytime.csv', index=False)

    
newData = pd.DataFrame({
    'nodes': nodes_100,
    'original_algorithm_value': original_100,
    })


newData.to_csv('./data/fixed_hundred_original_vs_anytime.csv', index=False)