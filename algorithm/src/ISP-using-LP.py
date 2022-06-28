# Imports
import networkx as nx
import numpy as np
import cvxpy as cp



def inverseShortestPath(graph, desiredPath):
    # auxiliary variables

    inf = 1000000
        
    n = len(graph.nodes())

    m = len(graph.edges())
    
    source = desiredPath[0]
    target = desiredPath[len(desiredPath) - 1]

    weights = []

    edges = []
    edgeIndex = {}
    for (i, j, w) in graph.edges(data='weight'):
        # Edges Index
        edgeIndex[i,j] = len(edges)
        # Edge Weight
        weights.append(w)
        # Add edge
        edges.append([i, j])
        
        
    # Add inverse edges with infinity weight
    for (i, j) in graph.edges():
        if (j, i) not in graph.edges():
            # Edges Index
            edgeIndex[j,i] = len(edges)
            # Edge Weight
            weights.append(inf)
            # Add edge
            edges.append([j, i])
            
            graph.add_edge(j, i, weight=inf)
        
        
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
    
    w_original = np.asarray(weights)
    w_ = cp.Variable(len(w_original), integer=True)   
    pi_ = cp.Variable(len(nodes)) #(2d)
    lambda_ = cp.Variable(len(edges)) #(2d)
        
        
        
    constraints = []
    
    # (2b) & (2c) 
    for j in range(len(edges)):
        d_j = w_[j]
        if xzero[j] == 1:
        # sum_i a_ij * pi_i = d_j,              for all j in desired path (2b)
            constraints.append( cp.sum(cp.multiply(A[:,j], pi_)) == d_j )
        else:
        # sum_i a_ij * pi_i + lambda_j = d_j,   for all j not in desired path (2c)
            constraints.append( cp.sum(cp.multiply(A[:,j], pi_)) + lambda_[j] == d_j )
        
        
    #(2e)
    for j in range(len(edges)):
        if xzero[j] == 0:
            constraints.append( lambda_[j] >= 0 )
            
            
    # Cost funnction
    cost = cp.norm1(w_ - w_original)  # ||w' - w||1 (2a)
        
    # Forming the problem
    prob = cp.Problem(cp.Minimize(cost), constraints)
    
    # Solve the problem
    #prob.solve(verbose=True)#Detailed
    prob.solve()  # Returns the optimal value.
    print("\nThe optimal value is", prob.value)
    print("A solution w' is")
    print(w_.value)
    
    
    newGraph = nx.MultiDiGraph()
    
    for (i, j), index in edgeIndex.items():
        newGraph.add_edge(i, j, weight = w_.value[index])
    
    return newGraph
