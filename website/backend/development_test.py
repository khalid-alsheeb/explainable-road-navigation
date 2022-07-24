# import osmnx as ox
# import networkx as nx
# import numpy as np
# from data_retrieval import fixGraphData
# from graph_helpers import addReverseEdges, getOriginalAttributeTypes, updateGraphWeights, fixWrongDataG
# from ISP_using_LP import inverseShortestPath
# from graph_explanations import getGraphExplanation, explanationsPrinter
# from diverse_SPs import diverseShortestPathsList
# from anytime_algorithm import anytimeAlgorithm


# # address = '30 Aldwych, London WC2B 4BG'
# # G = ox.graph_from_address(address, network_type="drive", dist=2000)
# # graph = fixGraphData(G)


# G = ox.load_graphml('../data/graph-BH-1km-7-7-22-0130.graphml')

# G = getOriginalAttributeTypes(G)

# G = fixWrongDataG(G)
# updateGraphWeights(G)


# #testing  dp
# # desired_path = [1696030874, 109753, 1617512815, 1707216637, 21392100, 109757, 1707216642, 25472888, 1707216646, 1678452728, 4879371166, 4421008555, 4421008566, 4034060018, 367102039, 4166662878, 26374229, 25378124, 107698, 6139961783, 107697, 282569739]

# nodes = [109753, 4421008566, 282569739]

# addReverseEdges(G)

# s = diverseShortestPathsList(G, nodes[0], nodes[1], nodes[2], 1, 2, 0.0001)

# for z in s:
#     print(z)

# #diverseShortestPaths = 
# # print(s)
# # for i in s:
# #     print(s)
# #     print('\n')

# # sp = nx.shortest_path(G, source=desired_path[0], target=desired_path[-1], weight="weight")

# # print(len(desired_path))
# # print(desired_path)
# # print(sp)
# # print(len(sp))

# # dp, ex = anytimeAlgorithm(G, nodes[0], nodes[1], nodes[2], 1)


# # z = getGraphExplanation(G, new_graph, desired_path)
# # explanationsPrinter(z)


# #[109753, 4421008566, 282569739]
# #[109753, 1617512815, 1707216637, 21392100, 109757, 1707216642, 25472888, 1707216646, 1678452728, 4879371166, 4421008555, 4421008566, 4034060018, 5177397823, 5177397825, 5177397828, 1707790023, 5177397822, 5177397824, 1707790067, 1955520890, 21392273, 1707790076, 237908, 1707790096, 21563479, 4530270906, 1617596711, 269589467, 4689775126, 1617596714, 1617647945, 107693, 5006063176, 5006063180, 33141178, 6863550501, 1697772135, 2586635284, 6863503678, 25378119, 107708, 107697, 282569739]

# #[109753, 1617512815, 1707216637, 21392100, 109757, 1707216642, 25472888, 1707216646, 1678452728, 4879371166, 4421008555, 4421008566, 4034060018, 5177397823, 5177397825, 5177397828, 1707790023, 5177397822, 5177397824, 1707790067, 1955520890, 21392273, 1707790076, 237908, 1707790096, 21563479, 4530270906, 1617596711, 269589467, 4689775126, 1617596714, 1617647945, 107693, 5006063176, 5006063180, 33141178, 6863550501, 1697772135, 2586635284, 6863503678, 25378119, 107708, 107697, 282569739]