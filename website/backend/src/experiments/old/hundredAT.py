import osmnx as ox
import numpy as np
import pandas as pd

from src.final_functions import getAnytimeAlgorithmData, variablesToUseFix

np.random.seed(0)

G = ox.load_graphml('./data/graph-BH-1km-7-7-22-0130.graphml')
variablesToUse = ['noWay', 'isClosed', 'maxSpeed', 'speed']
variablesToUseFix(variablesToUse)

allNodes = []
at_values = []
solvableCount = 0

usedNodes = []

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
        at_values.append(optimalValues_anytime)
        usedNodes.append(currentNodes)
        
        newData = pd.DataFrame({
            'nodes': usedNodes,
            'anytime_algorithm_values': at_values,
            })


        newData.to_csv('./data/anytime_algorithm_problems.csv', index=False)
            
        if optimalValues_anytime[len(optimalValues_anytime) -1] != None:
            solvableCount += 1
            
    except:
        pass

    print(solvableCount)

    
newData = pd.DataFrame({
    'nodes': usedNodes,
    'anytime_algorithm_values': at_values,
    })


newData.to_csv('./data/anytime_algorithm_problems.csv', index=False)