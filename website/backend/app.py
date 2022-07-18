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
    
    #testing  dp
    # desired_path = [1696030874, 109753, 1617512815, 1707216637, 21392100, 109757, 1707216642, 25472888, 1707216646, 1678452728, 4879371166, 4421008555, 4421008566, 4034060018, 367102039, 4166662878, 26374229, 25378124, 107698, 6139961783, 107697, 282569739]
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
    
    print(nodes)
    
    # Apply the anytime algorithm and get SP
    shortest_path, desired_path, explanations = getAnytimeAlgorithmData(nodes)

    
    return jsonify({ 'desired_path': desired_path, 'shortest_path': shortest_path, 'explanations': explanations })

# [107790, 455705622, 107843]
# bug nodes
if __name__ == "__main__":
    app.run(debug=True)