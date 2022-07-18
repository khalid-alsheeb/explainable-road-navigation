# Imports
import networkx as nx
import numpy as np
import cvxpy as cp

from .graph_helpers import *

def inverseShortestPath(graph, desiredPath):
    print('\nFormalising the problem')
    # Constants
    inf = 1e6
    epsilon = 1e-6
    possibleMaxSpeeds = [5, 10, 20, 30, 40, 50, 60, 70, 80, 90]
    inversePossibleMaxSpeeds = [getInverse(s) for s in possibleMaxSpeeds] + [0]
    inversePossibleMaxSpeeds = np.asarray(inversePossibleMaxSpeeds)
    
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
    maxSpeeds_H1E = []
    speedOrMaxSpeed_original = []
    
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
        speedOrMaxSpeed_original.append(data['speedOrMaxSpeed'])
        
        # hot 1 encoding original data
        hot1E = []
        for ms in inversePossibleMaxSpeeds:
            if getInverse(data['maxSpeed']) == ms:
                hot1E.append(1)
            else:
                hot1E.append(0)
        maxSpeeds_H1E.append(hot1E)
        
        
        
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
    maxSpeeds_H1E_original = np.asarray(maxSpeeds_H1E)
    speedOrMaxSpeed_original = np.asarray(speedOrMaxSpeed_original)
    
    
    # Variables
    pi_ = cp.Variable(len(nodes)) #(2d)
    lambda_ = cp.Variable(len(edges)) #(2d)
    
    noWay_ = cp.Variable(len(edges), boolean=True)
    areClosed_ = cp.Variable(len(edges), boolean=True)
    inverseSpeeds_ = cp.Variable(len(edges))
    inverseMaxSpeeds_ = cp.Variable(len(edges))
    maxSpeeds_H1E_ = cp.Variable(maxSpeeds_H1E_original.shape, boolean=True)
    # If 1, then change speed, else if 0 change maxSpeed.
    speedOrMaxSpeed_ = cp.Variable(len(edges), boolean=True)
        
        
    # Constraints
    constraints = []
    
    #(2e)
    for j in range(len(edges)):
        if xzero[j] == 0:
            constraints.append( lambda_[j] >= 0 )
            
            
    # Hot 1 Encoding    
    for row in maxSpeeds_H1E_:
        constraints.append( sum(row) == 1)
        
    
    for j in range(len(edges)):
        
        # Hot 1 Encoding, For all edges in G
        constraints.append( inverseMaxSpeeds_[j] == inversePossibleMaxSpeeds.T @ maxSpeeds_H1E_[j] )
        
        
        if xzero[j] == 1: #for all j in desired path
            d_j = inverseSpeeds_[j] * lengths[j] + inverseMaxSpeeds_[j] * lengths[j] + inf * noWay_[j] + inf * areClosed_[j]
        
            # sum_i a_ij * pi_i = d_j,               (2b)
            constraints.append( cp.sum(cp.multiply(A[:,j], pi_)) == d_j )
            
            # inverseSpeed is at least the max speed; ie speed is at most max speed.
            #constraints.append( inverseSpeeds_[j] >= inverseMaxSpeeds_original[j] )
            
            # if speed/maxSpeed >= 3/4 choose the maxSpeed to change, else the speed.
            if inverseMaxSpeeds_original[j] / inverseSpeeds_original[j] >= 4/3:#3/4:
                # Change maxSpeed
                constraints.append( speedOrMaxSpeed_[j] == 0 )
                constraints.append( inverseMaxSpeeds_[j] >= epsilon )
            else:
                # Change speed
                constraints.append( speedOrMaxSpeed_[j] == 1 )
                
                
            # Lower bound and Upper bounds are 0, if we use the other metric. For speed and max Speed.
            constraints.append( (1 - speedOrMaxSpeed_[j]) * min(inversePossibleMaxSpeeds) <= inverseMaxSpeeds_[j] )
            constraints.append( (1 - speedOrMaxSpeed_[j]) * max(inversePossibleMaxSpeeds) >= inverseMaxSpeeds_[j] )
            
            constraints.append( speedOrMaxSpeed_[j] * inverseMaxSpeeds_original[j] <= inverseSpeeds_[j] )
            constraints.append( speedOrMaxSpeed_[j] * inverseSpeeds_original[j] >= inverseSpeeds_[j] )
            
        else: # for all j not in desired path
            d_j = inverseSpeeds_[j] * lengths[j] + inf * noWay_[j] + inf * areClosed_[j]
            
            # sum_i a_ij * pi_i + lambda_j = d_j,    (2c)
            constraints.append( cp.sum(cp.multiply(A[:,j], pi_)) + lambda_[j] == d_j )
            
            # Do not change datta
            constraints.append( noWay_[j] == noWay_original[j] )
            constraints.append( areClosed_[j] == areClosed_original[j] )
            constraints.append( inverseSpeeds_[j] == inverseSpeeds_original[j] )
            constraints.append( inverseMaxSpeeds_[j] == inverseMaxSpeeds_original[j] )
            constraints.append( maxSpeeds_H1E_[j] == maxSpeeds_H1E_original[j] )
            constraints.append( speedOrMaxSpeed_[j] == speedOrMaxSpeed_original[j] )
            
            # Keep using speed, and not maxSpeed
            constraints.append( speedOrMaxSpeed_[j] == 1)
    
    # TODO: CHANGE PENALTIES
    penalty1 = 1#5
    penalty2 = 1#100
    # Cost function, split up
    cost1 = cp.norm1(cp.multiply(inverseSpeeds_ - inverseSpeeds_original, penalty1))
    cost2 = cp.norm1(cp.multiply(inverseMaxSpeeds_ - inverseMaxSpeeds_original, penalty2))
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
        return None
    
    
    print('Creating the new Graph')
    
    # Creating the new Graph
    newGraph = nx.MultiDiGraph()
    
    for (i, j), index in edgeIndex.items():
        if speedOrMaxSpeed_.value[index] == 0:
            s = getInverse(inverseSpeeds_original[index])
        else:
            # rounding error with floats
            if (inverseSpeeds_original[index] < inverseSpeeds_.value[index]):
                s = getInverse(inverseSpeeds_original[index])
            else:
                s = getInverse(inverseSpeeds_.value[index])
            
        if speedOrMaxSpeed_.value[index] == 1:
            ms = getInverse(inverseMaxSpeeds_original[index])
        else:
            ms = getInverse(inverseMaxSpeeds_.value[index])
            
        addEdgeToNewGraph(graph, newGraph, i, j)
        
        newGraph[i][j][0]['noWay'] = int(noWay_.value[index])
        newGraph[i][j][0]['isClosed'] = int(areClosed_.value[index])
        newGraph[i][j][0]['speed'] = s
        newGraph[i][j][0]['maxSpeed'] = int(round(ms))
        newGraph[i][j][0]['speedOrMaxSpeed'] = int((speedOrMaxSpeed_.value[index]))
        
        
    updateGraphWeights(newGraph)
    
    
    # Final checks
    try:
        sp = nx.shortest_path(newGraph, source=desiredPath[0], target=desiredPath[-1], weight="weight")
        
        desiredPathWeight = getPathWeight(desiredPath, newGraph)
        optimalPathWeight = getPathWeight(sp, newGraph)
        print('\n')
        
        if (desiredPathWeight - optimalPathWeight) <= epsilon:
            print('The desired Path is equal to the Shortest Path')
        elif desiredPathWeight < optimalPathWeight:
            print('The desired Path is better than the Shortest Path')
        elif desiredPathWeight > optimalPathWeight:
            print('The desired Path is worse than the Shortest Path')
        
        
        print('Optimal Path Weight = ', optimalPathWeight)
        print('The path is: ', sp)
        print('numbers after decimal point: ', len(str(optimalPathWeight).replace('.','')) - 1)
        print('\n')
        print('Desired Path Weight = ', desiredPathWeight)
        print('The path is: ', desiredPath)
        print('numbers after decimal point: ', len(str(desiredPathWeight).replace('.','')) - 1)
    except:
        pass
        
    return newGraph



