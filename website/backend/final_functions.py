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
        desired_path, explanations = anytimeAlgorithm(G, source, waypoint, target, minutes, branchingFactor, ballRadius)
        if(len(desired_path) == 0):
            explanations = ['Infeasible']
        else:
            explanations = makeExplanationsStrings(explanations)
    
    return shortest_path, desired_path, explanations



# V2, DP: [109753, 1617512815, 1707216637, 21392100, 109757, 1707216642, 25472888, 1707216646, 1678452728, 4879371166, 4421008555, 4421008566, 4034060018, 5177397823, 5177397825, 5177397828, 1707790023, 5177397822, 5177397824, 1707790067, 1955520890, 21392273, 1707790076, 237908, 1707790096, 21563479, 4530270906, 1617596711, 269589467, 4689775126, 1617596714, 1617647945, 107693, 5006063176, 5006063180, 33141178, 6863550501, 1697772135, 2586635284, 6863503678, 25378119, 107708, 107697, 282569739]