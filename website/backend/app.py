from flask import Flask, jsonify, request
from flask_cors import CORS
from .final_functions import getPathExplanation


app = Flask(__name__)
cors = CORS(app)


@app.route('/', methods = ['GET'])
def get_explanations():
    
    desired_path = [int(n) for n in request.args.getlist('desired_path')]
    
    shortest_path = getPathExplanation(desired_path)
    
    return jsonify({ 'shortest_path': shortest_path })


if __name__ == "__main__":
    app.run(debug=True)