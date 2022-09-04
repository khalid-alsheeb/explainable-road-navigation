import osmnx as ox
import numpy as np
import pandas as pd
from ast import literal_eval

from src.final_functions import getPathExplanation, getDesiredPathFromWaypoint, variablesToUseFix, getAnytimeAlgorithmData

np.random.seed(0)

G = ox.load_graphml('./data/graph-BH-1km-7-7-22-0130.graphml')
variablesToUse = ['noWay', 'isClosed', 'maxSpeed', 'speed']
variablesToUseFix(variablesToUse)

data = pd.read_csv('./data/not_fixed_hundred_anytime_vs_original.csv')
data.anytime_algorithm_values = data.anytime_algorithm_values.apply(literal_eval)
data.nodes = data.nodes.apply(literal_eval)

data2 = pd.read_csv('./data/anytime_algorithm_problems.csv')
data2.nodes = data2.nodes.apply(literal_eval)

nodes_100 = []
at_100 = []
allNodes = list(data2.nodes) + list(data.nodes)
for index, row in data.iterrows():
    optimalValues_anytime = row.anytime_algorithm_values
    solution = optimalValues_anytime[len(optimalValues_anytime)  -1]
    current_nodes = row.nodes
    if(solution != None):
        at_100.append(optimalValues_anytime)
        nodes_100.append(current_nodes)
        
print(len(allNodes))
        

print(len(nodes_100))
print(len(at_100))

solvableCount = len(at_100)

while solvableCount < 100:
    currentNodes = []
    
    # random nodes maker
    while(len(currentNodes) < 3):
        randomNode = int(np.random.choice(G.nodes))
        if(randomNode not in currentNodes):
            currentNodes.append(randomNode)
            
        if((len(currentNodes) == 3) and (currentNodes in allNodes)):
            currentNodes = []
        elif (len(currentNodes) == 3):
            allNodes.append(currentNodes)
    
    try:
        
        shortest_path_anytime, desired_path_anytime, explanations_anytime, optimalValues_anytime = getAnytimeAlgorithmData(currentNodes, variablesToUse)
        if(optimalValues_anytime[len(optimalValues_anytime) - 1] != None):
            at_100.append(optimalValues_anytime)
            nodes_100.append(currentNodes)
            
            solvableCount += 1
            
            newData = pd.DataFrame({
                'nodes': nodes_100,
                'anytime_algorithm_values': at_100,
                })
            newData.to_csv('./data/fixed_hundred_anytime_vs_original.csv', index=False)
            
            
            
    except:
        pass

    print(solvableCount)
    
newData = pd.DataFrame({
    'nodes': nodes_100,
    'anytime_algorithm_values': at_100,
    })


newData.to_csv('./data/fixed_hundred_anytime_vs_original.csv', index=False)