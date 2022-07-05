import osmnx as ox
import networkx as nx
from data_retrieval import fixGraphData
from graph_helpers import prepareGraph, getOriginalAttributeTypes
from ISP_using_LP import inverseShortestPath
from graph_explanations import getGraphExplanation, explanationsPrinter


# address = '30 Aldwych, London WC2B 4BG'
# G = ox.graph_from_address(address, network_type="drive", dist=2000)
# graph = fixGraphData(G)


G = ox.load_graphml('../data/graph-5-7-22-2100.graphml')
desrired_path = [25632859, 25632864, 25632855,1771426174, 20965803, 6369329166, 20965799, 2398924898, 1360122917, 104318, 7946372941, 1684437690, 1810130458, 1832129873, 5265953459, 5265953457, 5265953455, 6724775018, 2453947049, 4211515634, 104315, 25496762, 108903, 25503707, 108902, 973525136, 6060084833, 108901, 107830, 455705625, 1104473061, 1104473062, 107863, 107864, 107865, 11863161, 107999, 107992, 107987, 107990, 107989, 107995, 108021, 108012, 108043, 8253496132, 1685267218, 1685267214, 1685267212]

getOriginalAttributeTypes(G)


prepareGraph(G)
sp = nx.shortest_path(G, source=desrired_path[0], target=desrired_path[-1], weight="weight")
print(sp)

new_graph = inverseShortestPath(G, desrired_path)

z = getGraphExplanation(G, new_graph, desrired_path)
explanationsPrinter(z)