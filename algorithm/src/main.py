import osmnx as ox
import networkx as nx
import numpy as np
from data_retrieval import fixGraphData
from graph_helpers import prepareGraph, getOriginalAttributeTypes, updateGraphWeights, fixWrongDataG, shortenGraphForISP
from ISP_using_LP import inverseShortestPath
from graph_explanations import getGraphExplanation, explanationsPrinter
from diverse_SPs import diverseShortestPaths


# address = '30 Aldwych, London WC2B 4BG'
# G = ox.graph_from_address(address, network_type="drive", dist=2000)
# graph = fixGraphData(G)


G = ox.load_graphml('../data/graph-BH-1km-7-7-22-0130.graphml')

G = getOriginalAttributeTypes(G)

G = fixWrongDataG(G)
updateGraphWeights(G)

#testing  dp
desired_path = [1696030874, 109753, 1617512815, 1707216637, 21392100, 109757, 1707216642, 25472888, 1707216646, 1678452728, 4879371166, 4421008555, 4421008566, 4034060018, 367102039, 4166662878, 26374229, 25378124, 107698, 6139961783, 107697, 282569739]

s = diverseShortestPaths(G, desired_path[0], desired_path[-1], 5, 10, 0.001)

diverseShortestPaths = [list(i) for i in s]
print(diverseShortestPaths)
# for i in s:
#     print(s)
#     print('\n')

# sp = nx.shortest_path(G, source=desired_path[0], target=desired_path[-1], weight="weight")

# print(len(desired_path))
# print(desired_path)
# print(sp)
# print(len(sp))

# prepareGraph(G)
# new_graph = inverseShortestPath(G, desired_path)

# z = getGraphExplanation(G, new_graph, desired_path)
# explanationsPrinter(z)
