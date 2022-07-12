

def getGraphExplanation(oldGraph, newGraph, path):
    explanations = {}
    
    for i in range(len(path) - 1):
        j = i + 1
        source = path[i]
        target = path[j]
        
        oldEdge = oldGraph.get_edge_data(source, target)[0]
        newEdge = newGraph.get_edge_data(source, target)[0]
        
        exp = getEdgeExplanation(oldEdge, newEdge)
        
        if 'name' in oldEdge:
            name = oldEdge['name']
        else:
            # If name is not in data, just use nodes
            name = '(' + str(source) + ', ' + str(target) + ')'
            
        if type(name) == list:
            name = "('" + "', '".join(name) + "')"
        
        # check for more than 1 edge in the same street need changes, if so, nunmber them.
        length = len(explanations)
        count = 1
        nameX = name
        while(length == len(explanations)):
            if (nameX in explanations):
                nameX = name +  " " + '(' + str(count) + ')'
            else:
                explanations[nameX] = exp
            count += 1
            
    return explanations


def getEdgeExplanation(oldEdge, newEdge):
    
    exp = ''
    
    if oldEdge != newEdge:
    
        if oldEdge['noWay'] != newEdge['noWay']:
            exp = "is only one way (on the other side). If it was a two way edge,"
            
        elif oldEdge['isClosed'] != newEdge['isClosed']:
            exp ="is closed. If it was open,"
            
        elif oldEdge['maxSpeed'] != newEdge['maxSpeed']:
            exp = "has a maximim speed of {}. If it had a maximum speed of {},".format(oldEdge['maxSpeed'], newEdge['maxSpeed'])
            
        elif oldEdge['speed'] != newEdge['speed']:
            exp = "has a current speed of {} (heavy traffic). If it had a current speed of {} (less traffic),".format(oldEdge['speed'], newEdge['speed'])
        
    else:
        # Default explanation, no change.
        exp = 'does not require any changes'
        
    return exp


def explanationsPrinter(explanations):
    
    s = ''
    for edge, exp in explanations.items():
        if len(explanations[edge]) != 0:
            s +=  "   -   " + str(edge) + ': ' + exp + '\n'
            
    if len(s) != 0:
        print("These are the explanations why the desired path is not the optimal path, and how it would be an optimal path:")
        print(s)
        
        
def makeExplanationsStrings(explanations):
    
    exp = []
    for key, value in explanations.items():
        if (value != ''):
            exp.append( "{} ".format(key) + value )
        
    return exp


# this is just one explanation. It is not optimal because: i, ii, ii ...
# if instead the following was true, then the desired path would be optimal:
# i was open, ii speed 34 ...

# maxSpeed and speed >= not equal.