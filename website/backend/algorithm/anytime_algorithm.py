import scipy as sp
from .diverse_SPs import diverseShortestPathsList
from .ISP_using_LP import inverseShortestPath
from .graph_explanations import getGraphExplanation


def anytimeAlgorithm(graph, source, waypoint, target, numberOfPaths, branchingFactor=2, ballRadius=0.001):
    
    desiredPaths = calculatingAllDesiredtPaths(graph, source, waypoint, target, numberOfPaths, branchingFactor, ballRadius)
    
    print('Number of desired Paths:', len(desiredPaths))
    
    optimalDesiredPath = []
    optimalExplanations = {}
    optimalExplanationsLength = float('inf')
    
    
    for dp in desiredPaths:
        newGraph = inverseShortestPath(graph, dp)
        if(newGraph != None):
            explanations = getGraphExplanation(graph, newGraph, dp)
            
            expLength = len(explanations)
            
            if (expLength < optimalExplanationsLength):
                optimalDesiredPath = dp
                optimalExplanations = explanations
                optimalExplanationsLength = expLength
            
    
    return optimalDesiredPath, optimalExplanations


def calculatingAllDesiredtPaths(graph, source, waypoint, target, numberOfPaths, branchingFactor, ballRadius):
    sourceToWaypointSPs = diverseShortestPathsList(graph, source, waypoint, numberOfPaths, branchingFactor, ballRadius)
    waypointToTargetSPs = diverseShortestPathsList(graph, waypoint, target, numberOfPaths, branchingFactor, ballRadius)

    desiredPaths = []
    
    for s_w_dp in sourceToWaypointSPs:
        for w_t_dp in waypointToTargetSPs:
            desiredPaths.append( s_w_dp + w_t_dp[1:] )
            
    return desiredPaths