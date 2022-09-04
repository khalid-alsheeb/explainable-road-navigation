import osmnx as ox
import numpy as np
import pandas as pd
from ast import literal_eval

from src.final_functions import getPathExplanation, getDesiredPathFromWaypoint, variablesToUseFix, getAnytimeAlgorithmData

np.random.seed(0)

G = ox.load_graphml('./data/graph-BH-1km-7-7-22-0130.graphml')
variablesToUse = ['noWay', 'isClosed', 'maxSpeed', 'speed']
variablesToUseFix(variablesToUse)

data = pd.read_csv('./data/hundred_anytime_vs_original_old2.csv')
data.nodes = data.nodes.apply(literal_eval)

nodes_100 = []
at_100 = []

for index, row in data.iterrows():
    current_nodes = row.nodes
        
    shortest_path_anytime, desired_path_anytime, explanations_anytime, optimalValues_anytime = getAnytimeAlgorithmData(current_nodes, variablesToUse)
    at_100.append(optimalValues_anytime)
    nodes_100.append(current_nodes)
        
            
    newData = pd.DataFrame({
        'nodes': nodes_100,
        'anytime_algorithm_values': at_100,
        })


    newData.to_csv('./data/fixed_hundred_anytime_vs_original.csv', index=False)

    
newData = pd.DataFrame({
    'nodes': nodes_100,
    'anytime_algorithm_values': at_100,
    })


newData.to_csv('./data/fixed_hundred_anytime_vs_original.csv', index=False)