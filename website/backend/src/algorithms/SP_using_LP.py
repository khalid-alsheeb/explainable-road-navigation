import numpy as np
import cvxpy as cp



#Shortest Path
def shortestPath(graph, source, target):
    """
        This function calculates the shortest path of a multi-directed graph
            using a Linear Program.

    
    Args:
        graph: a multi directed graph.
        source: the source vertex.
        target: the target vertex.

    Returns:
        e: the dges of the shortest path.
        n: the orderd traversed nodes in the shortest path.
    """

    inf = 1000000
        
    n = len(graph.nodes())

    m = len(graph.edges())

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


    # LP:

    # Variables
    x = cp.Variable(len(edges), boolean=True)

    # Weight
    w = np.asarray(weights)

    # Constraints
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

                
    # Cost function
    cost = w.T @ x

    #Create constraints.
    constraints = [A @ x == b]

    # Form objective.
    obj = cp.Minimize(cost)

    # Form problem.
    prob = cp.Problem(obj, constraints)

    # Solve the problem
    #prob.solve(verbose=True)#Detailed
    prob.solve()  # Returns the optimal value.
    print("\nThe optimal value is", prob.value)
    print("A solution x is")
    print(x.value)
    # print("A dual solution is")
    # print(prob.constraints[0].dual_value)
    e = []
    n = []
    
    for i in range(len(x.value)):
        if x.value[i] == 1.0:
            e.append(edges[i])
            n.append(edges[i][0])

    n.append(target)
        
    print("The SP edges are: ", e)
    print("The SP is: ", n)
    
    return e, n