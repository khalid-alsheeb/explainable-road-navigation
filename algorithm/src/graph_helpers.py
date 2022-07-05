# Imports
import networkx as nx
import numpy as np
import cvxpy as cp
from pyrsistent import v

def prepareGraph(graph):
    cleanGraphAttributes(graph)
    updateGraphWeights(graph)
    addReverseEdges(graph)



def calculateWeight(data):
    # print(type(data['speedOrMaxSpeed']))
    # print(type(data['maxSpeed']))
    # print(type(data['length']))
    # print(type(data['speed']))
    # print(type(data['noWay']))
    # print(type(data['isClosed']))
    
    
    inf = 1e6
    
    weight = (1 - data['speedOrMaxSpeed']) * getInverse(data['maxSpeed']) * data['length'] + data['speedOrMaxSpeed'] * getInverse(data['speed']) * data['length'] + inf * data['noWay'] + inf * data['isClosed']
    
    # if data['speedOrMaxSpeed'] == 1:
    #     weight = getInverse(data['speed']) * data['length'] + inf * data['noWay'] + inf * data['isClosed']
    # else:
    #     weight = getInverse(data['maxSpeed']) * data['length'] + inf * data['noWay'] + inf * data['isClosed']
        
    return weight



def updateEdgeWeight(graph, source, target, data):
    graph[source][target][0]['weight'] = calculateWeight(data)



def updateGraphWeights(graph):
    for (i, j, data) in graph.edges(data=True):
        updateEdgeWeight(graph, i, j, data)
    
    

def getPathWeight(path, graph):
    weights = 0
    for i in range(len(path) - 1):
        j = i + 1
        source = path[i]
        target = path[j]
        weights += graph[source][target][0]['weight']
        
    return weights
        
        

def getInverse(speed):
    return 1/speed



def addReverseEdges(graph):
    for (i, j) in graph.edges():
        if (j, i) not in graph.edges():
            graph.add_edge(
                            j, i, 
                            weight = np.nan,
                            noWay = 1,
                            isClosed = 0,
                            length = 0,
                            speed = graph[i][j][0]['speed'],
                            maxSpeed = graph[i][j][0]['maxSpeed'],
                            speedOrMaxSpeed = 1
                        )
            updateEdgeWeight(graph, j, i, graph[j][i][0])
    
    

def cleanGraphAttributes(graph):
    for (i, j) in graph.edges():
        if graph[i][j][0]['isClosed'] == 1:
            graph[i][j][0]['length'] = 0
            
            
            
def getOriginalAttributeTypes(graph):
    
    for (s, t) in graph.edges():
        graph[s][t][0]['weight'] = float(graph[s][t][0]['weight'])
        graph[s][t][0]['maxSpeed'] = int(graph[s][t][0]['maxSpeed'])
        graph[s][t][0]['speed'] = float(graph[s][t][0]['speed'])
        graph[s][t][0]['length'] = float(graph[s][t][0]['length'])
        graph[s][t][0]['isClosed'] = int(float(graph[s][t][0]['isClosed']))
        graph[s][t][0]['noWay'] = int(float(graph[s][t][0]['noWay']))
        graph[s][t][0]['speedOrMaxSpeed'] = int(float(graph[s][t][0]['speedOrMaxSpeed']))