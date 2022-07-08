from cgi import test
from flask import Flask, jsonify
from flask_cors import CORS


app = Flask(__name__)
cors = CORS(app)

@app.route('/', methods = ['GET'])
def get_explanations():
    testEdge = [[51.5203679, -0.1303251], [51.5203965, -0.1302613], [51.5204239, -0.130198], [51.5206942, -0.1295733], [51.5207281, -0.1295001]]
    testEdge2 = [[51.5203679, -0.1303251], [51.5203099, -0.1302591], [51.5202877, -0.1302362], [51.5202612, -0.1302089], [51.5200955, -0.1300357], [51.5197875, -0.129705], [51.5197616, -0.1296765], [51.5197464, -0.1296598], [51.5196837, -0.1295925]]
    testEdges = [testEdge, testEdge2]
    return jsonify({'edges': testEdges})


if __name__ == "__main__":
    app.run(debug=True)