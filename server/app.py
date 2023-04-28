from flask import Flask, jsonify, send_file
from flask_cors import CORS
from io import BytesIO

app = Flask(__name__)
CORS(app)
# CORS(app, resources={r"/plot/*": {"origins": "*"}})


@app.route('/')
def index():
    return 'Hello, World!'

@app.route('/get_plots')
def get_plots():
    # Assuming the saved plot is in the temp/images directory
    filename = 'temp/images/numeric_plot0.png'
    return send_file(filename, mimetype='image/png')

@app.route('/plot/<path:filename>')
def send_plot(filename):
    # Serve the requested image file to the client side
    return send_file('temp/images/' + filename)

if __name__ == '__main__':
    app.run(debug=True)
