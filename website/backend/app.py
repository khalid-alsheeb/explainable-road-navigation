from flask import Flask, jsonify, request
from flask_cors import CORS
import numpy as np

from .src.final_functions import getPathExplanation, getDesiredPathFromWaypoint, getAnytimeAlgorithmData, variablesToUseFix, calculateShortestPath

app = Flask(__name__)
cors = CORS(app)

@app.route('/1/', methods = ['GET'])
def get_explanations1():
    np.random.seed(0)

    desired_path = [int(n) for n in request.args.getlist('desired_path')]
    variablesToUse = [n for n in request.args.getlist('variablesToUse')]
    variablesToUseFix(variablesToUse)
    
    shortest_path, explanations, optimalValue = getPathExplanation(desired_path, variablesToUse)
    
    return jsonify({ 'shortest_path': shortest_path, 'explanations': explanations })

@app.route('/2/', methods = ['GET'])
def get_explanations2():
    np.random.seed(0)
    
    nodes = [int(n) for n in request.args.getlist('nodes')]
    variablesToUse = [n for n in request.args.getlist('variablesToUse')]
    variablesToUseFix(variablesToUse)
    
    print(nodes)
    
    # calculate the desired path, and then do the same as before.
    # get closest nodes in our graph, to the nodes given
    desired_path = getDesiredPathFromWaypoint(nodes, variablesToUse)
    
    print(desired_path)
    if (len(desired_path) > 0):
        shortest_path, explanations, optimalValue = getPathExplanation(desired_path, variablesToUse)

    
    return jsonify({ 'desired_path': desired_path, 'shortest_path': shortest_path, 'explanations': explanations })


@app.route('/3/', methods = ['GET'])
def get_explanations3():
    np.random.seed(0)
    
    nodes = [int(n) for n in request.args.getlist('nodes')]
    variablesToUse = [n for n in request.args.getlist('variablesToUse')]
    variablesToUseFix(variablesToUse)
    
    print(nodes)
    
    # Apply the anytime algorithm and get SP
    shortest_path, desired_path, explanations, optimalValues = getAnytimeAlgorithmData(nodes, variablesToUse)
    
    return jsonify({ 'desired_path': desired_path, 'shortest_path': shortest_path, 'explanations': explanations })

if __name__ == "__main__":
    app.run(debug=True)
    
    
    
@app.route('/sp/', methods = ['GET'])
def get_shortest_path():
    np.random.seed(0)
    
    nodes = [int(n) for n in request.args.getlist('nodes')]
    
    print(nodes)
    
    source = nodes[0]
    target = nodes[len(nodes) - 1]
    
    shortest_path = calculateShortestPath(source, target)

    
    return jsonify({ 'shortest_path': shortest_path })

if __name__ == "__main__":
    app.run(debug=True)