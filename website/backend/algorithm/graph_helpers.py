# Imports
import networkx as nx
import numpy as np
import osmnx as ox
from copy import deepcopy

def calculateWeight(data):
    inf = 1e6
    
    weight = (1 - data['speedOrMaxSpeed']) * getInverse(data['maxSpeed']) * data['length'] + data['speedOrMaxSpeed'] * getInverse(data['speed']) * data['length'] + inf * data['noWay'] + inf * data['isClosed']
        
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


def addReverseEdge(graph, s, t):
    for key, data in graph.get_edge_data(s, t).items():
        graph.add_edge(t, s, key=key, **(deepcopy(data)))


def addReverseEdges(graph):
    for (i, j) in graph.edges():
        if (j, i) not in graph.edges():
            addReverseEdge(graph, i, j)
            graph[j][i][0]['noWay'] = 1
            updateEdgeWeight(graph, j, i, graph[j][i][0])
                        
            
def getOriginalAttributeTypes(graph):
    nodes, edges = ox.graph_to_gdfs(graph)
    edges['isClosed'] = edges['isClosed'].astype(float).astype(int)
    edges['noWay'] = edges['noWay'].astype(float).astype(int)
    edges['maxSpeed'] = edges['maxSpeed'].astype(float).astype(int)
    edges['speedOrMaxSpeed'] = edges['speedOrMaxSpeed'].astype(float).astype(int)
    edges['speed'] = edges['speed'].astype(float)
    edges['length'] = edges['length'].astype(float)
    edges['weight'] = edges['weight'].astype(float)
        
    return ox.graph_from_gdfs(nodes, edges)


def fixWrongDataE(edges):
    edges.loc[edges.speed > edges.maxSpeed, 'speed'] = edges.maxSpeed
    return edges


def fixWrongDataG(graph):
    nodes, edges = ox.graph_to_gdfs(graph)
    edges.loc[edges.speed > edges.maxSpeed, 'speed'] = edges.maxSpeed
    
    return ox.graph_from_gdfs(nodes, edges)


def addEdgeToNewGraph(oldGraph, newGraph, s, t):
    for key, data in oldGraph.get_edge_data(s, t).items():
        newGraph.add_edge(s, t, key=key, **(deepcopy(data)))

    