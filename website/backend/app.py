from flask import Flask, jsonify
from flask_cors import CORS


app = Flask(__name__)
cors = CORS(app)

@app.route('/', methods = ['GET'])
def get_explanations():
    return jsonify({'data':'test'})


if __name__ == "__main__":
    app.run(debug=True)