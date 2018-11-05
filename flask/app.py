from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import random
# Custom Objects
from db_components import database

app = Flask(__name__)
CORS(app)


@app.route('/')
def index():
    return "Here is some dummy data for you"

@app.route('/dict', methods=['POST','GET'])
def dict_data():
    example_list = []
    all_examples = database.get_all_data()
    for ex in all_examples:
        example_list.append(ex.to_dict())
    print(example_list)
    json_string = json.dumps([e for e in example_list])
    return json_string

@app.route('/add/example', methods=['POST','GET'])
def add_example():
    new_data = request.get_json().get('newData')
    new_example = database.add_data(new_data)
    new_example = new_example.to_dict()
    return jsonify(data=new_example['data'], id=new_example['id'])

@app.route('/delete/example', methods=['POST', 'GET'])
def delete_example():
    id = request.get_json().get('id')
    database.delete_data(id)
    return jsonify(status="Success")


if __name__ == '__main__':
    app.run(debug=True)