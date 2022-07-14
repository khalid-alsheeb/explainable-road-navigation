import { originalEdges, originalNodes } from './ConstantData'


export const getPathFormat = (pathNodes) => {
    let path = []
    if (pathNodes.length > 0) {
        for (var i = 0; i < pathNodes.length - 1; ++i) {
            path.push( originalEdges.find( edge =>
                (
                    (edge['nodes'][0] === pathNodes[i] && pathNodes[i+1] === edge['nodes'][1]) || 
                    (edge['nodes'][1] === pathNodes[i] && pathNodes[i+1] === edge['nodes'][0])
                )
            ))
        }
    }

    return path
}

export const getCorrectNodes = (originalData) => {

    let nodes = []

    for(var i = 0; i < originalData.length; ++i) {
        nodes.push([originalData[i]['lat'], originalData[i]['lng']])
    }

    let closest = [originalNodes[0], originalNodes[0], originalNodes[0]]
    let distances = [getDistance(nodes[0], originalNodes[0]['coordinates']), getDistance(nodes[1], originalNodes[0]['coordinates']), getDistance(nodes[2], originalNodes[0]['coordinates'])]

    for(i = 0; i < originalNodes.length; ++i) {
        for(var j = 0; j < nodes.length; ++j) {
            let dist = getDistance(nodes[j], originalNodes[i]['coordinates'])
            if (dist < distances[j]) {
                distances[j] = dist
                closest[j] = originalNodes[i]
            }
        }
    }

    let newNodes = []

    for(i = 0; i < closest.length; ++i) {
        newNodes.push(closest[i]['id'])
    }

    return newNodes
}

const getDistance = (node1, node2) => {
    return ((node1[0] - node2[0]) ** 2) + ((node1[1] - node2[1]) ** 2)
}
