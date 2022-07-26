from .ISP_using_LP import inverseShortestPath
from ..helpers.graph_explanations import getGraphExplanation
from .diverse_SPs import edgeSampling, getNewEdges
from ..helpers.graph_helpers import getInverse
import osmnx as ox
import networkx as nx
import time

# It uses diverse shortest path algorithm to generate the possible SPs.
def anytimeAlgorithm(originalGraph, source, waypoint, target, minutes, branchingFactor, ballRadius, variablesToUse):
    # FIFO Queue  (append & pop(0))
    shortestPath_graph_pairs = []
    # A set of k-diverse SPs
    shortestPaths = set()
    # Stop the function after (around) x minutes from now
    timeout = time.time() + 60 * minutes
    # the graph used to get the shortest paths (only speed and length are used to calculate the weight)
    pathsGraph = getTimeOnlyWeightGraph(originalGraph)
    
    # optimal values to be returned
    optimalShortestPath = []
    optimalGraph = None
    optimalValue = float('inf')
    
    count = 0
    
    shortestPath = getShortestPathWaypoint(pathsGraph, source, waypoint, target)
    while(True and (time.time() < timeout)):
        if (len(shortestPath) != 0 ):
            shortestPath_graph_pairs.append((shortestPath, pathsGraph))
            shortestPaths.add(tuple(shortestPath))
            
            #ISP HERE
            possibleOptimalGraph, value = inverseShortestPath(originalGraph, shortestPath, variablesToUse)
            count += 1
            if ((value != None) and (value < optimalValue)):
                optimalValue = value
                optimalGraph = possibleOptimalGraph
                optimalShortestPath = shortestPath
        
        while ((len(shortestPath_graph_pairs) != 0) and (time.time() < timeout)):
            pair = shortestPath_graph_pairs.pop(0)
            shortestPath = pair[0]
            graph = pair[1]
            
            for i in range(branchingFactor):
                sampledEdgeNodes = edgeSampling(graph, shortestPath)
                nodes, edges = ox.graph_to_gdfs(graph)
                sampledEdge = edges.loc[(sampledEdgeNodes[0], sampledEdgeNodes[1], 0)]
                
                newEdges = getNewEdges(edges, sampledEdge, ballRadius)
                
                newGraph = ox.graph_from_gdfs(nodes, newEdges)
                newShortestPath = getShortestPathWaypoint(newGraph, source, waypoint, target)
                
                if (len(newShortestPath) != 0):
                    shortestPath_graph_pairs.append((newShortestPath, newGraph))
                    shortestPaths.add(tuple(newShortestPath)) #NO CRITERIA, FOR NOW. (ACCEPT ALL)
                    
                    #ISP HERE
                    possibleOptimalGraph, value = inverseShortestPath(originalGraph, newShortestPath, variablesToUse)
                    count += 1
                    if ((value != None) and (value < optimalValue)):
                        optimalValue = value
                        optimalGraph = possibleOptimalGraph
                        optimalShortestPath = newShortestPath
                
    optimalExplanation = getGraphExplanation(originalGraph, optimalGraph, optimalShortestPath)
    
    print('times in {} minues = {}'.format(minutes, count))
            
    return optimalShortestPath, optimalExplanation


def getShortestPathWaypoint(graph, source, waypoint, target):
    try:
        shortestPath = nx.shortest_path(graph, source=source, target=waypoint, weight="weight") + nx.shortest_path(graph, source=waypoint, target=target, weight="weight")[1:]
    except:
        shortestPath = []
        
    return shortestPath


def getTimeOnlyWeightGraph(G):
    graph = G.copy()
    for (i, j, data) in graph.edges(data=True):
        graph[i][j][0]['weight'] = getInverse(data['speed']) * data['length']
        
    return graph