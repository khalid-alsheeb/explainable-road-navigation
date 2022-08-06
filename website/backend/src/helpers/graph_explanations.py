def getGraphExplanation(oldGraph, newGraph, path):
    explanations = {}
    
    for i in range(len(path) - 1):
        j = i + 1
        source = path[i]
        target = path[j]
        
        oldEdge = oldGraph.get_edge_data(source, target)[0]
        newEdge = newGraph.get_edge_data(source, target)[0]
        
        if(oldEdge != newEdge):
    
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
                    exp = getEdgeExplanation(oldEdge, newEdge, nameX)
                    explanations[nameX] = exp
                count += 1
            
    return explanations


def getEdgeExplanation(oldEdge, newEdge, name):
    
    reason = ''
    explanation = ''
    
    if oldEdge['noWay'] != newEdge['noWay']:
        reason = '{} is only a one way street (on the other side).'.format(name)
        explanation = "{} was a two way street.".format(name)
        
    elif oldEdge['isClosed'] != newEdge['isClosed']:
        reason = '{} is closed, rightnow.'.format(name)
        explanation = "{} was open.".format(name)
        
    elif oldEdge['maxSpeed'] != newEdge['maxSpeed']:
        reason = '{} has a maximim speed of {} mph.'.format(name, oldEdge['maxSpeed'])
        explanation = "{} had a maximum speed of at least {} mph.".format(name, newEdge['maxSpeed'])
        
    elif oldEdge['speed'] != newEdge['speed']:
        reason = '{} has a current speed of {} mph.'.format(name, oldEdge['speed'])
        explanation = "{} had a current speed of at least {} mph.".format(name, newEdge['speed'])
        
    return (reason, explanation)


def explanationsPrinter(explanations):
    
    s = ''
    for edge, exp in explanations.items():
        if len(explanations[edge]) != 0:
            s +=  "   -   " + str(edge) + ': ' + exp + '\n'
            
    if len(s) != 0:
        print("These are the explanations why the desired path is not the optimal path, and how it would be an optimal path:")
        print(s)
        
        
def makeExplanationsStrings(explanations):
    
    exps = []
    reasons = []
    for key, value in explanations.items():
        if (value[0] != '' or value[1] != ''):
            reasons.append(value[0])
            exps.append(value[1])
        
    return [reasons, exps]