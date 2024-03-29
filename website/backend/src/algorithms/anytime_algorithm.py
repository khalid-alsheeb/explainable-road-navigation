import osmnx as ox
import networkx as nx
import time

from .ISP_using_LP import inverseShortestPath
from ..helpers.graph_explanations import getGraphExplanation
from .diverse_SPs import edgeSampling, getNewEdges
from ..helpers.graph_helpers import getInverse

# It uses diverse shortest path algorithm to generate the possible SPs.
def anytimeAlgorithm(originalGraph, source, waypoint, target, minutes, branchingFactor, ballRadius, variablesToUse):
    # FIFO Queue  (append & pop(0))
    shortestPath_graph_pairs = []
    # Stop the function after (around) x minutes from now
    timeout = time.time() + 60 * minutes
    # the graph used to get the shortest paths (only speed and length are used to calculate the weight)
    pathsGraph = getTimeOnlyWeightGraph(originalGraph)
    
    # optimal values to be returned
    optimalShortestPath = []
    optimalGraph = None
    optimalValue = float('inf')
    
    try:
        no_waypoint_shortest_path = nx.shortest_path(originalGraph, source=source, target=target, weight="weight")
    except:
        no_waypoint_shortest_path = []
    
    optimalValues = []
    
    count = 0
    
    shortestPath = getShortestPathWaypoint(pathsGraph, source, waypoint, target)
    
    # The zero condition is there to stop if we find a path with the lowest possible optimalValue (zero - no changes needed)
    while((time.time() < timeout) and (optimalValue > 0.0)):
        if (len(shortestPath) != 0 ):
            shortestPath_graph_pairs.append((shortestPath, pathsGraph))
            
            if(shortestPath == no_waypoint_shortest_path):
                value = 0
                possibleOptimalGraph = originalGraph
            else:
                possibleOptimalGraph, value = inverseShortestPath(originalGraph, shortestPath, variablesToUse)
                
            count += 1
            if ((value != None) and (value < optimalValue)):
                optimalValue = value
                optimalGraph = possibleOptimalGraph
                optimalShortestPath = shortestPath
            
            if (value == None and optimalValue == float('inf')):
                optimalValues.append(None)
            else:
                optimalValues.append(optimalValue)
        
        while ((len(shortestPath_graph_pairs) != 0) and (time.time() < timeout) and (optimalValue > 0.0)):
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
                    
                    if(newShortestPath == no_waypoint_shortest_path):
                        value = 0
                        possibleOptimalGraph = originalGraph
                    else:
                        possibleOptimalGraph, value = inverseShortestPath(originalGraph, newShortestPath, variablesToUse)

                    count += 1
                    if ((value != None) and (value < optimalValue)):
                        optimalValue = value
                        optimalGraph = possibleOptimalGraph
                        optimalShortestPath = newShortestPath
                        
                    if (value == None and optimalValue == float('inf')):
                        optimalValues.append(None)
                    else:
                        optimalValues.append(optimalValue)
                
    optimalExplanation, changedEdges = getGraphExplanation(originalGraph, optimalGraph, optimalShortestPath)
    
    print('times in {} minues = {}'.format(minutes, count))
            
    return optimalShortestPath, optimalExplanation, optimalValues, changedEdges


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