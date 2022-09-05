import networkx as nx
import numpy as np
import cvxpy as cp

from ..helpers.graph_helpers import *


# Fastest ISP
def inverseShortestPath(graph, desiredPath, variablesToUse):
    print('\nFormalising the problem')
    # Constants
    inf = 1e6
    epsilon = 1e-16
    inverseMaxMaxSpeed = getInverse(70)
    
    # Some graph and path data
    n = len(graph.nodes())
    m = len(graph.edges())
    source = desiredPath[0]
    target = desiredPath[len(desiredPath) - 1]

    # Original Graph data
    noWay = []
    areClosed = []
    inverseSpeeds = []
    inverseMaxSpeeds = []
    lengths = []
    
    # Edges data, and their indecies
    edges = []
    edgeIndex = {}
    for (i, j, data) in graph.edges(data=True):
        # Edges Index
        edgeIndex[i,j] = len(edges)
        # Add edge
        edges.append([i, j])
        
        # Data:
        noWay.append(data['noWay'])
        areClosed.append(data['isClosed'])
        inverseSpeeds.append(getInverse(data['speed']))
        inverseMaxSpeeds.append(getInverse(data['maxSpeed']))
        lengths.append(data['length'])
        
        
    # Nodes data, and their indecies
    nodeIndex = {}
    nodes = []
    for n in graph.nodes:
        # Node Index
        nodeIndex[n] = len(nodes)
        # Add Node
        nodes.append(n)
        
        
    # Ax = b
    A = np.zeros([len(nodes), len(edges)])
    b = np.zeros(len(nodes))

    for i in range(len(nodes)):
        for neighbour in graph.adj[nodes[i]]:
            # Filling A
            j = edgeIndex[nodes[i], neighbour]
            A[i,j] = 1
            if (neighbour, nodes[i]) in edgeIndex:
                j = edgeIndex[neighbour, nodes[i]]
                A[i,j] =-1
            
        # Filling b
        if nodes[i] == source:
            b[i] = 1
        if nodes[i] == target:
            b[i] = -1
            
            
    # optimal x
    path = nx.shortest_path(graph, source=desiredPath[0], target=desiredPath[-1], weight="weight")
    xstar = np.zeros(len(edges))
    for p in range(len(path)-1):
        j = edgeIndex[path[p], path[p+1]]
        xstar[j] = 1

    # desired x
    xzero = np.zeros(len(edges))
    for p in range(len(desiredPath)-1):
        j = edgeIndex[desiredPath[p], desiredPath[p+1]]
        xzero[j] = 1
        


    # LP (ISP):
    
    # Original Data as numpy array. (for mathematical applications)
    noWay_original = np.asarray(noWay)
    areClosed_original = np.asarray(areClosed)
    inverseSpeeds_original = np.asarray(inverseSpeeds)
    inverseMaxSpeeds_original = np.asarray(inverseMaxSpeeds)
    
    
    # Variables
    pi_ = cp.Variable(len(nodes)) #(2d)
    lambda_ = cp.Variable(len(edges)) #(2d)
    
    noWay_ = cp.Variable(len(edges), boolean=True)
    areClosed_ = cp.Variable(len(edges), boolean=True)
    inverseSpeedsChanges_ = cp.Variable(len(edges), boolean=True)
    inverseMaxSpeedsChanges_ = cp.Variable(len(edges), boolean=True)
    
    
    inverseSpeeds_ = cp.multiply(inverseSpeedsChanges_, inverseMaxSpeeds_original) + cp.multiply((1 - inverseSpeedsChanges_), inverseSpeeds_original)
    inverseMaxSpeeds_ = cp.multiply(inverseMaxSpeedsChanges_, inverseMaxMaxSpeed) + cp.multiply((1 - inverseMaxSpeedsChanges_), inverseMaxSpeeds_original)
    
    # Constraints 
    constraints = []
    
    for j in range(len(edges)):
        
        if (xzero[j] == 1): #for all j in desired path
            
            if ('noWay' in variablesToUse):
                constraints.append( noWay_[j] == 0 )
            if ('isClosed' in variablesToUse):
                constraints.append( areClosed_[j] == 0 )
            
            # use both variables
            if (('speed' in variablesToUse) and ('maxSpeed' in variablesToUse)):
                
                # if speed/maxSpeed >= 3/4 choose the maxSpeed to change, else the speed.
                if (inverseMaxSpeeds_original[j] / inverseSpeeds_original[j] >= 4/3):
                    # Change maxSpeed
                    d_j = inverseMaxSpeeds_[j] * lengths[j] + inf * noWay_[j] + inf * areClosed_[j]
                    constraints.append( inverseSpeeds_[j] == inverseSpeeds_original[j] )
                    
                else:
                    # Change speed
                    d_j = inverseSpeeds_[j] * lengths[j] + inf * noWay_[j] + inf * areClosed_[j]
                    constraints.append( inverseMaxSpeeds_[j] == inverseMaxSpeeds_original[j] )
                    
            # use maxSpeed only
            elif ('maxSpeed' in variablesToUse):
                d_j = inverseMaxSpeeds_[j] * lengths[j] + inf * noWay_[j] + inf * areClosed_[j]
                
            # # use only speed
            # elif ('speed' in variablesToUse):
            #     d_j = inverseSpeeds_[j] * lengths[j] + inf * noWay_[j] + inf * areClosed_[j]
                
            # if neither, then use speed to calculate weight, but keep it constant
            else:
                d_j = inverseSpeeds_[j] * lengths[j] + inf * noWay_[j] + inf * areClosed_[j]

                
            # sum_i a_ij * pi_i = d_j,
            constraints.append( cp.sum(cp.multiply(A[:,j], pi_)) == d_j )
                
            
        else: # for all j not in desired path
            
            constraints.append( lambda_[j] >= 0 )
            
            # Use maxSpeed
            if (('speed' not in variablesToUse) and ('maxSpeed' in variablesToUse)):
                d_j = inverseMaxSpeeds_[j] * lengths[j] + inf * noWay_[j] + inf * areClosed_[j]
            # Use speed
            else:
                d_j = inverseSpeeds_[j] * lengths[j] + inf * noWay_[j] + inf * areClosed_[j]
                
            
            # sum_i a_ij * pi_i + lambda_j = d_j,
            constraints.append( cp.sum(cp.multiply(A[:,j], pi_)) + lambda_[j] == d_j )
            
        if (xstar[j] == 1 and xzero[j] == 0): # all edges in SP and not in DP
            # Do not change data
            constraints.append( noWay_[j] == noWay_original[j] )
            constraints.append( areClosed_[j] == areClosed_original[j] )
            constraints.append( inverseMaxSpeeds_[j] == inverseMaxSpeeds_original[j] )
            constraints.append( inverseSpeeds_[j] == inverseSpeeds_original[j] )
            
            
        
        # Variables to change/not change, depending on parameter:
        if ('noWay' not in variablesToUse):
            constraints.append( noWay_[j] == noWay_original[j] )
        if ('isClosed' not in variablesToUse):
            constraints.append( areClosed_[j] == areClosed_original[j] )
        if ('speed' not in variablesToUse):
            constraints.append( inverseSpeeds_[j] == inverseSpeeds_original[j] )    
        if ('maxSpeed' not in variablesToUse):
            constraints.append( inverseMaxSpeeds_[j] == inverseMaxSpeeds_original[j] )
            
    
    
    cost1 = cp.norm1(inverseSpeedsChanges_)
    cost2 = cp.norm1(inverseMaxSpeedsChanges_)
    cost3 = cp.norm1(noWay_ - noWay_original)
    cost4 = cp.norm1(areClosed_ - areClosed_original)
            
    
    # Final Cost funnction
    cost = cost1 + cost2 + cost3 + cost4
    
        
    # Forming the problem
    prob = cp.Problem(cp.Minimize(cost), constraints)
    
    print('Solving the problem')
    
    # Solve the problem
    #prob.solve(solver=cp.GUROBI, verbose=True) #Detailed
    prob.solve(solver=cp.GUROBI) # using gurobi
    print("The optimal value is", prob.value)
    
    
    if(prob.value == None):
        return None, None
    
    
    print('Creating the new Graph')
    
    # Creating the new Graph
    newGraph = nx.MultiDiGraph()
    
    for (i, j), index in edgeIndex.items():
        
        # If max speed is less, use maxSpeed to calculate weights, else use speed
        if (inverseMaxSpeeds_original[index] > inverseMaxSpeeds_.value[index]):
            speedOrmaxSpeed = 0
        else:
            speedOrmaxSpeed = 1
            
            
        addEdgeToNewGraph(graph, newGraph, i, j)
        
        newGraph[i][j][0]['noWay'] = round(noWay_.value[index])
        newGraph[i][j][0]['isClosed'] = round(areClosed_.value[index])
        newGraph[i][j][0]['speed'] = getInverse(inverseSpeeds_.value[index])
        newGraph[i][j][0]['maxSpeed'] = round(getInverse(inverseMaxSpeeds_.value[index]))
        newGraph[i][j][0]['speedOrMaxSpeed'] = speedOrmaxSpeed
        
        
    updateGraphWeights(newGraph)
        
    return newGraph, float(round(prob.value))




# # Original
# def inverseShortestPath(graph, desiredPath, variablesToUse):
#     print('\nFormalising the problem')
#     # Constants
#     inf = 1e6
#     possibleMaxSpeeds = [5, 10, 20, 30, 40, 50, 60, 70, 80, 90]
#     epsilon = 1e-16
#     inversePossibleMaxSpeeds = [getInverse(s) for s in possibleMaxSpeeds]
#     inversePossibleMaxSpeeds = np.asarray(inversePossibleMaxSpeeds)
    
#     # Some graph and path data
#     n = len(graph.nodes())
#     m = len(graph.edges())
#     source = desiredPath[0]
#     target = desiredPath[len(desiredPath) - 1]

#     # Original Graph data
#     noWay = []
#     areClosed = []
#     inverseSpeeds = []
#     inverseMaxSpeeds = []
#     lengths = []
#     maxSpeeds_H1E = []
    
#     # Edges data, and their indecies
#     edges = []
#     edgeIndex = {}
#     for (i, j, data) in graph.edges(data=True):
#         # Edges Index
#         edgeIndex[i,j] = len(edges)
#         # Add edge
#         edges.append([i, j])
        
#         # Data:
#         noWay.append(data['noWay'])
#         areClosed.append(data['isClosed'])
#         inverseSpeeds.append(getInverse(data['speed']))
#         inverseMaxSpeeds.append(getInverse(data['maxSpeed']))
#         lengths.append(data['length'])
        
#         # hot 1 encoding original data
#         hot1E = []
#         for ms in inversePossibleMaxSpeeds:
#             if getInverse(data['maxSpeed']) == ms:
#                 hot1E.append(1)
#             else:
#                 hot1E.append(0)
#         maxSpeeds_H1E.append(hot1E)
        
        
        
#     # Nodes data, and their indecies
#     nodeIndex = {}
#     nodes = []
#     for n in graph.nodes:
#         # Node Index
#         nodeIndex[n] = len(nodes)
#         # Add Node
#         nodes.append(n)
        
        
#     # Ax = b
#     A = np.zeros([len(nodes), len(edges)])
#     b = np.zeros(len(nodes))

#     for i in range(len(nodes)):
#         for neighbour in graph.adj[nodes[i]]:
#             # Filling A
#             j = edgeIndex[nodes[i], neighbour]
#             A[i,j] = 1
#             if (neighbour, nodes[i]) in edgeIndex:
#                 j = edgeIndex[neighbour, nodes[i]]
#                 A[i,j] =-1
            
#         # Filling b
#         if nodes[i] == source:
#             b[i] = 1
#         if nodes[i] == target:
#             b[i] = -1
            
            
#     # optimal x
#     path = nx.shortest_path(graph, source=desiredPath[0], target=desiredPath[-1], weight="weight")
#     xstar = np.zeros(len(edges))
#     for p in range(len(path)-1):
#         j = edgeIndex[path[p], path[p+1]]
#         xstar[j] = 1

#     # desired x
#     xzero = np.zeros(len(edges))
#     for p in range(len(desiredPath)-1):
#         j = edgeIndex[desiredPath[p], desiredPath[p+1]]
#         xzero[j] = 1
        


#     # LP (ISP):
    
#     # Original Data as numpy array. (for mathematical applications)
#     noWay_original = np.asarray(noWay)
#     areClosed_original = np.asarray(areClosed)
#     inverseSpeeds_original = np.asarray(inverseSpeeds)
#     inverseMaxSpeeds_original = np.asarray(inverseMaxSpeeds)
#     maxSpeeds_H1E_original = np.asarray(maxSpeeds_H1E)
    
    
#     # Variables
#     pi_ = cp.Variable(len(nodes)) #(2d)
#     lambda_ = cp.Variable(len(edges)) #(2d)
    
#     noWay_ = cp.Variable(len(edges), boolean=True)
#     areClosed_ = cp.Variable(len(edges), boolean=True)
#     maxSpeeds_H1E_ = cp.Variable(maxSpeeds_H1E_original.shape, boolean=True)
#     inverseSpeedsChanges_ = cp.Variable(len(edges), boolean=True)
    
#     # A way to hold the maxSpeeds floats
#     inverseMaxSpeeds_ = inversePossibleMaxSpeeds.T @ maxSpeeds_H1E_.T
    
#     inverseSpeeds_ = cp.multiply(inverseSpeedsChanges_, inverseMaxSpeeds_original) + cp.multiply((1 - inverseSpeedsChanges_), inverseSpeeds_original)
    
#     # Constraints 
#     constraints = []
    
            
#     # Hot 1 Encoding    
#     for row in maxSpeeds_H1E_:
#         constraints.append( sum(row) == 1)
        
    
#     for j in range(len(edges)):
        
#         if (xzero[j] == 1): #for all j in desired path
            
#             # use both variables
#             if (('speed' in variablesToUse) and ('maxSpeed' in variablesToUse)):
                
#                 # if speed/maxSpeed >= 3/4 choose the maxSpeed to change, else the speed.
#                 if (inverseMaxSpeeds_original[j] / inverseSpeeds_original[j] >= 4/3):
#                     # Change maxSpeed
#                     d_j = inverseMaxSpeeds_[j] * lengths[j] + inf * noWay_[j] + inf * areClosed_[j]
#                     constraints.append( inverseSpeeds_[j] == inverseSpeeds_original[j] )
                    
#                 else:
#                     # Change speed
#                     d_j = inverseSpeeds_[j] * lengths[j] + inf * noWay_[j] + inf * areClosed_[j]
#                     constraints.append( inverseMaxSpeeds_[j] == inverseMaxSpeeds_original[j] )
                    
#             # use maxSpeed only
#             elif ('maxSpeed' in variablesToUse):
#                 d_j = inverseMaxSpeeds_[j] * lengths[j] + inf * noWay_[j] + inf * areClosed_[j]
                
#             # # use only speed
#             # elif ('speed' in variablesToUse):
#             #     d_j = inverseSpeeds_[j] * lengths[j] + inf * noWay_[j] + inf * areClosed_[j]
                
#             # if neither, then use speed to calculate weight, but keep it constant
#             else:
#                 d_j = inverseSpeeds_[j] * lengths[j] + inf * noWay_[j] + inf * areClosed_[j]

                
#             # sum_i a_ij * pi_i = d_j,
#             constraints.append( cp.sum(cp.multiply(A[:,j], pi_)) == d_j )
                
            
#         else: # for all j not in desired path
            
#             # Do not change data
#             constraints.append( noWay_[j] == noWay_original[j] )
#             constraints.append( areClosed_[j] == areClosed_original[j] )
#             constraints.append( inverseMaxSpeeds_[j] == inverseMaxSpeeds_original[j] )
#             constraints.append( inverseSpeeds_[j] == inverseSpeeds_original[j] )
            
#             # Use maxSpeed
#             if (('speed' not in variablesToUse) and ('maxSpeed' in variablesToUse)):
#                 d_j = inverseMaxSpeeds_[j] * lengths[j] + inf * noWay_[j] + inf * areClosed_[j]
#             # Use speed
#             else:
#                 d_j = inverseSpeeds_[j] * lengths[j] + inf * noWay_[j] + inf * areClosed_[j]
                
            
#             # sum_i a_ij * pi_i + lambda_j = d_j,
#             constraints.append( cp.sum(cp.multiply(A[:,j], pi_)) + lambda_[j] == d_j )
            
#             constraints.append( lambda_[j] >= 0 )


#         # Variables to change/not change, depending on parameter:
#         if ('noWay' not in variablesToUse):
#             constraints.append( noWay_[j] == noWay_original[j] )
#         if ('isClosed' not in variablesToUse):
#             constraints.append( areClosed_[j] == areClosed_original[j] )
#         if ('speed' not in variablesToUse):
#             constraints.append( inverseSpeeds_[j] == inverseSpeeds_original[j] )    
#         if ('maxSpeed' not in variablesToUse):
#             constraints.append( inverseMaxSpeeds_[j] == inverseMaxSpeeds_original[j] )
            
    
    
#     cost1 = cp.norm1(inverseSpeedsChanges_ - np.zeros(len(edges)) )
#     cost2 = cp.norm1(maxSpeeds_H1E_ - maxSpeeds_H1E_original) / 2
#     cost3 = cp.norm1(noWay_ - noWay_original)
#     cost4 = cp.norm1(areClosed_ - areClosed_original)
            
    
#     # Final Cost funnction
#     cost = cost1 + cost2 + cost3 + cost4
    
        
#     # Forming the problem
#     prob = cp.Problem(cp.Minimize(cost), constraints)
    
#     print('Solving the problem')
    
#     # Solve the problem
#     #prob.solve(solver=cp.GUROBI, verbose=True) #Detailed
#     prob.solve(solver=cp.GUROBI) # using gurobi
#     print("The optimal value is", prob.value)
    
    
#     if(prob.value == None):
#         return None, None
    
    
#     print('Creating the new Graph')
    
#     # Creating the new Graph
#     newGraph = nx.MultiDiGraph()
    
#     for (i, j), index in edgeIndex.items():
        
#         # If max speed is less, use maxSpeed to calculate weights, else use speeds
#         if (inverseMaxSpeeds_original[index] > inverseMaxSpeeds_.value[index]):
#             speedOrmaxSpeed = 0
#         else:
#             speedOrmaxSpeed = 1
            
            
#         addEdgeToNewGraph(graph, newGraph, i, j)
        
#         newGraph[i][j][0]['noWay'] = int(noWay_.value[index])
#         newGraph[i][j][0]['isClosed'] = int(areClosed_.value[index])
#         newGraph[i][j][0]['speed'] = getInverse(inverseSpeeds_.value[index])
#         newGraph[i][j][0]['maxSpeed'] = int(getInverse(inverseMaxSpeeds_.value[index]))
#         newGraph[i][j][0]['speedOrMaxSpeed'] = speedOrmaxSpeed
        
        
#     updateGraphWeights(newGraph)
    
    
#     # Final checks
#     try:
#         sp = nx.shortest_path(newGraph, source=desiredPath[0], target=desiredPath[-1], weight="weight")
        
#         desiredPathWeight = getPathWeight(desiredPath, newGraph)
#         optimalPathWeight = getPathWeight(sp, newGraph)
#         print('\n')
        
#         if (desiredPathWeight - optimalPathWeight) <= epsilon:
#             print('The desired Path is equal to the Shortest Path')
#         elif desiredPathWeight < optimalPathWeight:
#             print('The desired Path is better than the Shortest Path')
#         elif desiredPathWeight > optimalPathWeight:
#             print('The desired Path is worse than the Shortest Path')
        
        
#         print('Optimal Path Weight = ', optimalPathWeight)
#         print('The path is: ', sp)
#         print('numbers after decimal point: ', len(str(optimalPathWeight).replace('.','')) - 1)
#         print('\n')
#         print('Desired Path Weight = ', desiredPathWeight)
#         print('The path is: ', desiredPath)
#         print('numbers after decimal point: ', len(str(desiredPathWeight).replace('.','')) - 1)
#     except:
#         pass
        
#     return newGraph, prob.value
