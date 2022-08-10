import osmnx as ox
import numpy as np
import pandas as pd

from src.final_functions import getPathExplanation, getDesiredPathFromWaypoint, variablesToUseFix

np.random.seed(0)

G = ox.load_graphml('./data/graph-BH-1km-7-7-22-0130.graphml')
variablesToUse = ['noWay', 'isClosed', 'maxSpeed']
variablesToUseFix(variablesToUse)

allNodes = []
original_values = []
solvableCount = 0

while solvableCount < 1:
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
        desired_path_original = getDesiredPathFromWaypoint(currentNodes, variablesToUse)
        
        if (len(desired_path_original) > 0):
            shortest_path_original, explanations_original, optimalValue_original = getPathExplanation(desired_path_original, variablesToUse)
        else:
            optimalValue_original = 'No Path'
            
        if optimalValue_original != None:
            solvableCount += 1
        
        original_values.append([optimalValue_original])
    except:
        pass

    
data = pd.DataFrame({
    'nodes': allNodes,
    'original_algorithm_value': original_values,
    })


data.to_csv('./data/original_algorithm_problems.csv', index=False)