#Taken from "A Heuristic Approach to Finding Diverse Short Paths" (Caleb Voss, Mark Moll, and Lydia E. Kavraki)

# Imports
import networkx as nx
import numpy as np
import cvxpy as cp
import math
from graph_helpers import *

def diverseShortestPaths(graph, source, target, numberOfPaths, branchingFactor, ballRadius):
    # FIFO Queue  (append & pop(0))
    shortestPath_graph_pairs = []
    # A set of k-diverse SPs
    shortestPaths = set()
    
    shortestPath = getShortestPath(graph, source, target)
        
    if (len(shortestPath) != 0 ):
        shortestPath_graph_pairs.append((shortestPath, graph))
        shortestPaths.add(tuple(shortestPath))
        
    while (len(shortestPath_graph_pairs) != 0):
        pair = shortestPath_graph_pairs.pop(0)
        shortestPath = pair[0]
        graph = pair[1]
        
        for i in range(branchingFactor):
            sampledEdgeNodes = edgeSampling(graph, shortestPath)
            
            nodes, edges = ox.graph_to_gdfs(graph)
            
            sampledEdge = edges.loc[(sampledEdgeNodes[0], sampledEdgeNodes[1], 0)]
            
            newEdges = getNewEdges(edges, sampledEdge, ballRadius)
            
            newGraph = ox.graph_from_gdfs(nodes, newEdges)
            
            newShortestPath = getShortestPath(newGraph, source, target)
            
            if (len(newShortestPath) != 0):
                shortestPath_graph_pairs.append((newShortestPath, newGraph))
            
            #TODO
            if (len(newShortestPath) != 0): #NO CRITERIA, FOR NOW. (ACCEPT ALL)
                # change sp from list to tuple, to be hashed
                shortestPaths.add(tuple(newShortestPath))
                
            if (len(shortestPaths) == numberOfPaths):
                return shortestPaths
            
    return shortestPaths


def edgeSampling(graph, path):
    pathWeight = getPathWeight(path, graph)
    probability_distribution = []
    sourceNodesIndexes = []
    
    for i in range(len(path) - 1):
        j = i + 1
        source = path[i]
        target = path[j]
        sourceNodesIndexes.append(i)
        
        edgeWeight = graph[source][target][0]['weight']
        
        probability_distribution.append(edgeWeight / pathWeight)
        
    edgeSourceIndex = np.random.choice(sourceNodesIndexes, 1,
              p=probability_distribution, replace=False)[0]
    
    edge = (path[edgeSourceIndex], path[edgeSourceIndex+1])
    
    return edge    
    

def getNewEdges(oldEdges, sampledEdge, ballRadius):
    distances = oldEdges.apply(getMinDistance, args=(sampledEdge, ), axis=1)
    mask = distances > ballRadius
    newEdges = oldEdges[mask]
    
    return newEdges


# only intersects if both have the same nnode, so no need to consider other intersection cases
def getMinDistance(edge1, edge2):
    points1 = list(edge1['geometry'].coords)
    points2 = list(edge2['geometry'].coords)
    minDistance = float('inf')
    
    for i in range(len(points1)):
        point1 = points1[i]
        for j in range(len(points2)):
            point2 = points2[j]
            distance = getDistance(point1, point2)
            if (distance < minDistance):
                minDistance = distance
    
    return minDistance


def getDistance(point1, point2):
    return math.sqrt((point1[0] - point2[0])**2 + (point1[1] - point2[1])**2)


def getShortestPath(graph, source, target):
    try:
        shortestPath = nx.shortest_path(graph, source=source, target=target, weight="weight")
    except:
        shortestPath = []
        
    return shortestPath