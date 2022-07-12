import osmnx as ox
import networkx as nx
from .algorithm.graph_helpers import prepareGraph, getOriginalAttributeTypes, updateGraphWeights, fixWrongDataG
from .algorithm.ISP_using_LP import inverseShortestPath
from .algorithm.graph_explanations import getGraphExplanation, explanationsPrinter, makeExplanationsStrings


def getPathExplanation(desired_path):

    G = ox.load_graphml('./data/graph-BH-1km-7-7-22-0130.graphml')

    G = getOriginalAttributeTypes(G)

    G = fixWrongDataG(G)
    updateGraphWeights(G)
    
    # testing desired_path = [1696030874, 109753, 1617512815, 1707216637, 21392100, 109757, 1707216642, 25472888, 1707216646, 1678452728, 4879371166, 4421008555, 4421008566, 4034060018, 367102039, 4166662878, 26374229, 25378124, 107698, 6139961783, 107697, 282569739]
    
    try:
        shortest_path = nx.shortest_path(G, source=desired_path[0], target=desired_path[-1], weight="weight")
    except:
        shortest_path = []
        
    prepareGraph(G)
    
    # try:
    #     new_graph = inverseShortestPath(G, desired_path)
    #     exp = getGraphExplanation(G, new_graph, desired_path)
    #     explanations = makeExplanationsStrings(exp)
    # except:
    #     explanations = []
    
    new_graph = inverseShortestPath(G, desired_path)
    # Issue in getGraphExplanation
    exp = getGraphExplanation(G, new_graph, desired_path)
    explanations = makeExplanationsStrings(exp)
    
    return shortest_path, explanations


# EXAMPLE:

# # These are the explanations why the desired path is not the optimal path, and how it would be an optimal path:
# #    -   (455705625, 1104473061): has a current speed of 12.0 (heavy traffic). If it had a current speed of 12.858546960654117 (less traffic),
# #    -   (25470853, 107852): has a current speed of 9.0 (heavy traffic). If it had a current speed of 20.0 (less traffic),
# #    -   (108034, 108009): has a current speed of 8.0 (heavy traffic). If it had a current speed of 9.711571889677172 (less traffic),


