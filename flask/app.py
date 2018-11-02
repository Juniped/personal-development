from flask import Flask
from flask_cors import CORS
import json
import random
# Custom Objects
from models.example import Example

app = Flask(__name__)
CORS(app)


@app.route('/')
def index():
    return "Here is some dummy data for you"

@app.route('/dict', methods=['POST','GET'])
def dict_data():
    example_list = []
    for i in range(0,5):
        example = Example(random.randint(0,100))
        example_list.append(example)
    # ret_dict = {"key": "More Dummy Data"}
    # ret_json = json.dumps(ret_dict)
    # return ret_json
    # Convert example data to json
    json_string = json.dumps([e.to_json() for e in example_list])
    return json_string


if __name__ == '__main__':
    app.run(debug=True)