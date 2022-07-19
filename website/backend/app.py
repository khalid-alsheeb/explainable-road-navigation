from flask import Flask, jsonify, request
from flask_cors import CORS
from .final_functions import getPathExplanation, getDesiredPathFromWaypoint, getAnytimeAlgorithmData
import json


app = Flask(__name__)
cors = CORS(app)

# change the routes. 1 for explanations, and annother for the sp. If the user only wants the sp.

@app.route('/1/', methods = ['GET'])
def get_explanations1():
    
    desired_path = [int(n) for n in request.args.getlist('desired_path')]
    shortest_path, explanations = getPathExplanation(desired_path)
    
    return jsonify({ 'shortest_path': shortest_path, 'explanations': explanations })

@app.route('/2/', methods = ['GET'])
def get_explanations2():
    
    nodes = [int(n) for n in request.args.getlist('nodes')]
    
    print(nodes)
    
    # calculate the desired path, and then do the same as before.
    # get closest nodes in our graph, to the nodes given
    desired_path = getDesiredPathFromWaypoint(nodes)
    
    print(desired_path)
    if (len(desired_path) > 0):
        shortest_path, explanations = getPathExplanation(desired_path)

    
    return jsonify({ 'desired_path': desired_path, 'shortest_path': shortest_path, 'explanations': explanations })


@app.route('/3/', methods = ['GET'])
def get_explanations3():
    
    nodes = [int(n) for n in request.args.getlist('nodes')]
    
    # bug nodes
    nodes = [107790, 455705622, 107843]
    
    print(nodes)
    
    # Apply the anytime algorithm and get SP
    shortest_path, desired_path, explanations = getAnytimeAlgorithmData(nodes)

    
    return jsonify({ 'desired_path': desired_path, 'shortest_path': shortest_path, 'explanations': explanations })

if __name__ == "__main__":
    app.run(debug=True)