def getGraphExplanation(oldGraph, newGraph, path):
    explanations = {}
    changedEdges = []
    
    for u, v, oldEdge in oldGraph.edges(data=True):
        for u2, v2, newEdge in newGraph.edges(data=True):
            if(u==u2 and v==v2):
                if(oldEdge!=newEdge):
                    source = u
                    target = v
                    
                    changedEdges.append([source, target])
            
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
            
    return explanations, changedEdges


def getEdgeExplanation(oldEdge, newEdge, name):
    
    reason = ''
    explanation = ''
    
    if oldEdge['noWay'] != newEdge['noWay']:
        if oldEdge['noWay'] == 1:
            reason = '{} is only a one-way road (on the other side).'.format(name)
            explanation = "{} was a two-way road.".format(name)
        else:
            reason = "{} is a two-way road.".format(name)
            explanation = '{} was only a one-way road (on the other side).'.format(name)
    
    elif oldEdge['isClosed'] != newEdge['isClosed']:
        if oldEdge['isClosed'] == 1:
            reason = '{} is closed, rightnow.'.format(name)
            explanation = "{} was open.".format(name)
        else:
            reason =  "{} is open.".format(name)
            explanation = '{} was closed.'.format(name)
        
    elif oldEdge['maxSpeed'] != newEdge['maxSpeed']:
        reason = '{} has a maximum speed of {} mph.'.format(name, oldEdge['maxSpeed'])
        explanation = "{} had a maximum speed of {} mph.".format(name, newEdge['maxSpeed'])
        
    elif oldEdge['speed'] != newEdge['speed']:
        reason = '{} has heavy traffic.'.format(name, oldEdge['speed'])
        explanation = "{} had less traffic.".format(name, newEdge['speed'])
        
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
