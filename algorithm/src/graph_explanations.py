


def getGraphExplanation(oldGraph, newGraph, path):
    explanations = {}
    
    for i in range(len(path) - 1):
        j = i + 1
        source = path[i]
        target = path[j]
        
        oldEdge = oldGraph.get_edge_data(source, target)[0]
        newEdge = newGraph.get_edge_data(source, target)[0]
        
        exp = getEdgeExplanation(oldEdge, newEdge)
        
        explanations[source, target] = "Edge ({}, {}) ".format(source, target) + exp
        
    return explanations


def getEdgeExplanation(oldEdge, newEdge):
    
    if oldEdge != newEdge:
    
        if oldEdge['noWay'] != newEdge['noWay']:
            exp = "is only one way (on the other side). If it was a two way edge,"
            
        elif oldEdge['isClosed'] != newEdge['isClosed']:
            exp ="is closed. If it was open,"
            
        elif oldEdge['maxSpeed'] != newEdge['maxSpeed']:
            exp = "has a maximim speed of {}. If it had a maximum speed of {},".format(oldEdge['maxSpeed'], newEdge['maxSpeed'])
            
        elif oldEdge['speed'] != newEdge['speed']:
            exp = "has a current speed of {} (heavy traffic). If it had a current speed of {} (less traffic),".format(oldEdge['speed'], newEdge['speed'])
            
        exp += ' it would help make the path optimal.'
        
    else:
        # Default explanation, no change.
        exp = 'does not require any changes'
        
    return exp


def explanationsPrinter(explanations):
    
    print("These are the explanations why the desired path is not the optimal path, and how it would be an optimal path:")
    
    for edge in explanations:
        print( "   -   " + explanations[edge] )
