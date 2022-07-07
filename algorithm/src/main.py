import osmnx as ox
import networkx as nx
from data_retrieval import fixGraphData
from graph_helpers import prepareGraph, getOriginalAttributeTypes, updateGraphWeights, fixWrongDataG, shortenGraphForISP
from ISP_using_LP import inverseShortestPath
from graph_explanations import getGraphExplanation, explanationsPrinter


# address = '30 Aldwych, London WC2B 4BG'
# G = ox.graph_from_address(address, network_type="drive", dist=2000)
# graph = fixGraphData(G)


G = ox.load_graphml('../data/graph-BH-1km-7-7-22-0130.graphml')

G = getOriginalAttributeTypes(G)

G = fixWrongDataG(G)
updateGraphWeights(G)
dp = [1617596714, 256794594, 1707790024]
desired_path = nx.shortest_path(G, source=dp[0], target=dp[1], weight="weight")[:-1] + nx.shortest_path(G, source=dp[1], target=dp[2], weight="weight")
sp = nx.shortest_path(G, source=desired_path[0], target=desired_path[-1], weight="weight")

print(len(desired_path))
print(desired_path)
print(sp)
print(len(sp))

prepareGraph(G)
new_graph = inverseShortestPath(G, desired_path)

z = getGraphExplanation(G, new_graph, desired_path)
explanationsPrinter(z)



# # These are the explanations why the desired path is not the optimal path, and how it would be an optimal path:
# #    -   (455705625, 1104473061): has a current speed of 12.0 (heavy traffic). If it had a current speed of 12.858546960654117 (less traffic),
# #    -   (25470853, 107852): has a current speed of 9.0 (heavy traffic). If it had a current speed of 20.0 (less traffic),
# #    -   (108034, 108009): has a current speed of 8.0 (heavy traffic). If it had a current speed of 9.711571889677172 (less traffic),