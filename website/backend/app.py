from flask import Flask, jsonify, request
from flask_cors import CORS
from .final_functions import getPathExplanation
import json


app = Flask(__name__)
cors = CORS(app)

# change the routes. 1 for explanations, and annother for the sp. If the user only wants the sp.

@app.route('/', methods = ['GET'])
def get_explanations():
    
    version = request.args.get('version')
    
    desired_path = [int(n) for n in request.args.getlist('desired_path')]
    
    if(version == 2):
        # calculate the desired path, and then do the same as before.
        # get closest nodes in our graph, to the nodes given
        pass
    
    if(version == 3):
        # Apply the anytime algorithm.
        # get closest nodes in our graph, to the nodes given
        pass

    #testing  dp
    # desired_path = [1696030874, 109753, 1617512815, 1707216637, 21392100, 109757, 1707216642, 25472888, 1707216646, 1678452728, 4879371166, 4421008555, 4421008566, 4034060018, 367102039, 4166662878, 26374229, 25378124, 107698, 6139961783, 107697, 282569739]
    
    shortest_path, explanations = getPathExplanation(desired_path)
    
    return jsonify({ 'shortest_path': shortest_path, 'explanations': explanations })


if __name__ == "__main__":
    app.run(debug=True)