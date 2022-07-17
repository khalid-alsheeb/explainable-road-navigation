import osmnx as ox
import networkx as nx

from .algorithm.diverse_SPs import getShortestPath
from .algorithm.graph_helpers import addReverseEdges, getOriginalAttributeTypes, updateGraphWeights, fixWrongDataG
from .algorithm.ISP_using_LP import inverseShortestPath
from .algorithm.graph_explanations import getGraphExplanation, makeExplanationsStrings
from .algorithm.anytime_algorithm import anytimeAlgorithm


def getPathExplanation(desired_path):

    G = ox.load_graphml('./data/graph-BH-1km-7-7-22-0130.graphml')

    G = getOriginalAttributeTypes(G)

    G = fixWrongDataG(G)
    updateGraphWeights(G)
    
    try:
        shortest_path = nx.shortest_path(G, source=desired_path[0], target=desired_path[-1], weight="weight")
    except:
        shortest_path = []
    
    if(len(desired_path) == 0):
        explanations = ['NO Nodes']
        return shortest_path, explanations
    elif(desired_path == shortest_path):
        explanations = ['SP=DP']
        return shortest_path, explanations
    elif(len(shortest_path) == 0):
        explanations = ['NO SP']
        return shortest_path, explanations
        
    addReverseEdges(G)
    new_graph = inverseShortestPath(G, desired_path)
    
    if(new_graph == None):
        explanations = ['Infeasible']
    else:
        exp = getGraphExplanation(G, new_graph, desired_path)
        explanations = makeExplanationsStrings(exp)
    
    return shortest_path, explanations



def getDesiredPathFromWaypoint(desired_path):

    G = ox.load_graphml('./data/graph-BH-1km-7-7-22-0130.graphml')

    G = getOriginalAttributeTypes(G)

    G = fixWrongDataG(G)
    updateGraphWeights(G)
    
    try:
        dp = nx.shortest_path(G, source=desired_path[0], target=desired_path[1], weight="weight") + nx.shortest_path(G, source=desired_path[1], target=desired_path[2], weight="weight")[1:]
    except:
        dp = []
    
    return dp


def getAnytimeAlgorithmData(nodes):

    G = ox.load_graphml('./data/graph-BH-1km-7-7-22-0130.graphml')
    G = getOriginalAttributeTypes(G)
    G = fixWrongDataG(G)
    updateGraphWeights(G)
    
    source = nodes[0]
    waypoint = nodes[1]
    target = nodes[2]
    numberOfPaths = 1
    
    shortest_path = getShortestPath(G, source, target)
    desired_path, explanattions = anytimeAlgorithm(G, source, waypoint, target, numberOfPaths, branchingFactor=2, ballRadius=0.001)
    
    return shortest_path, desired_path, explanattions