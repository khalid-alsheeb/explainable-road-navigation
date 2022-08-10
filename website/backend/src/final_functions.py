import osmnx as ox
import networkx as nx
import time

from .algorithms.diverse_SPs import getShortestPath
from .helpers.graph_helpers import addReverseEdges, getOriginalAttributeTypes, getPathWeight, updateGraphWeights, fixWrongDataG, updateWeightMetric
from .algorithms.ISP_using_LP import inverseShortestPath
from .helpers.graph_explanations import getGraphExplanation, makeExplanationsStrings
from .algorithms.anytime_algorithm import anytimeAlgorithm, getTimeOnlyWeightGraph


def getPathExplanation(desired_path, variablesToUse):

    G = ox.load_graphml('./data/graph-BH-1km-7-7-22-0130.graphml')

    G = getOriginalAttributeTypes(G)

    G = fixWrongDataG(G)
    updateWeightMetric(G, variablesToUse)
    updateGraphWeights(G)
    
    try:
        shortest_path = nx.shortest_path(G, source=desired_path[0], target=desired_path[-1], weight="weight")
    except:
        shortest_path = []
        
    addReverseEdges(G)
    
    if(len(desired_path) == 0):
        explanations = ['NO Nodes']
        return shortest_path, explanations, None
    elif(desired_path == shortest_path):
        explanations = ['SP=DP']
        return shortest_path, explanations, 0
    elif(len(shortest_path) == 0):
        explanations = ['NO SP']
        return shortest_path, explanations, None
    elif(getPathWeight(desired_path, G) == getPathWeight(shortest_path, G)):
        explanations = ['SP=DP']
        return desired_path, explanations, 0
    
    # average = 0
    # for i in range(10):
    #     start_time = time.time()
    #     new_graph, optimal_value = inverseShortestPath(G, desired_path, variablesToUse)
    #     average += time.time() - start_time
    # average = average/10
    
    # print("\n average of 10 runs is: --- %s seconds ---" % (average))
    # print('\n')
    
    new_graph, optimal_value = inverseShortestPath(G, desired_path, variablesToUse)
    
    if(new_graph == None):
        explanations = ['Infeasible']
    else:
        exp = getGraphExplanation(G, new_graph, desired_path)
        explanations = makeExplanationsStrings(exp)
    
    return shortest_path, explanations, optimal_value




def getDesiredPathFromWaypoint(desired_path, variablesToUse):

    G = ox.load_graphml('./data/graph-BH-1km-7-7-22-0130.graphml')

    G = getOriginalAttributeTypes(G)

    G = fixWrongDataG(G)
    updateWeightMetric(G, variablesToUse)
    
    addReverseEdges(G)
    updateGraphWeights(G)
    G = getTimeOnlyWeightGraph(G)
    
    try:
        dp = nx.shortest_path(G, source=desired_path[0], target=desired_path[1], weight="weight") + nx.shortest_path(G, source=desired_path[1], target=desired_path[2], weight="weight")[1:]
    except:
        dp = []
    
    return dp


def getAnytimeAlgorithmData(nodes, variablesToUse):

    G = ox.load_graphml('./data/graph-BH-1km-7-7-22-0130.graphml')
    G = getOriginalAttributeTypes(G)
    G = fixWrongDataG(G)
    updateGraphWeights(G)
    
    source = nodes[0]
    waypoint = nodes[1]
    target = nodes[2]
    minutes = 5
    branchingFactor = 2
    ballRadius = 0.0001
    
    shortest_path = getShortestPath(G, source, target)
    
    desired_path = []
    explanations = {}
    if(len(nodes) == 0):
        explanations = ['NO Nodes']
    elif(len(shortest_path) == 0):
        explanations = ['NO SP']
    else:
        addReverseEdges(G)
        desired_path, explanations, optimalValues = anytimeAlgorithm(G, source, waypoint, target, minutes, branchingFactor, ballRadius, variablesToUse)
        if(optimalValues[len(optimalValues) - 1] == 0.0):
            explanations = ['SP=DP']
        elif(len(desired_path) == 0):
            explanations = ['Infeasible-AT']
        else:
            explanations = makeExplanationsStrings(explanations)
    
    return shortest_path, desired_path, explanations, optimalValues


def variablesToUseFix(variablesToUse):
    if 'noWay and isClosed' in variablesToUse:
        variablesToUse.remove('noWay and isClosed')
        variablesToUse.append('noWay')
        variablesToUse.append('isClosed')