from flask import Flask

app = Flask(__name__)


@app.route('/')
def index():
    return "Here is some dummy data for you"

@app.route('/dict')
def dic_data():
    return {"key": "More Dummy Data"}


if __name__ == '__main__':
    app.run(debug=True)