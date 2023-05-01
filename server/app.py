import firebase_admin
from firebase_admin import credentials, storage
import os
import subprocess

from flask import Flask, jsonify, request
from flask_cors import CORS
# import final.py script
# import final
# pd import
import pandas as pd

app = Flask(__name__)

CORS(app)
# Initialize the Firebase Admin SDK with the storageBucket option
cred = credentials.Certificate("./google-service.json")
firebase_admin.initialize_app(cred)


# @app.route('/run-script')
def run_script():
    print("Hello")
    # import final.py script
    import final
    # run finsl.py script
    # final.main(df)

    # Get a reference to the default bucket
    # bucket = storage.bucket('data-vis-96dc7.appspot.com')

    # # Name of the folder to be uploaded
    # folder_name = "plots"

    # # Get a reference to the folder we want to create
    # folder_ref = bucket.blob(folder_name+'/')

    # # Delete the folder if it already exists
    # if folder_ref.exists():
    #     blobs = bucket.list_blobs(prefix=folder_name+'/')
    #     for blob in blobs:
    #         blob.delete()

    # # Create an empty file to create the folder
    # folder_ref.upload_from_string('')

    # # Traverse through all the files in the folder and upload each file to Firebase Storage
    # # Traverse through all the files in the folder and upload each file to Firebase Storage
    # for subdir, dirs, files in os.walk(folder_name):
    #     # Get a reference to the folder
    #     folder_ref = bucket.blob(subdir+'/')
    #     folder_ref.upload_from_string('')

    #     for file in files:
    #         file_path = os.path.join(subdir, file)
    #         blob = bucket.blob(subdir+'/'+file)
    #         blob.upload_from_filename(file_path)

    #         # Get the public URL of the uploaded file
    #         url = blob.public_url
    #         print(url)

    # Return a message to the client
    return "The script has been executed successfully!"


@app.route('/upload', methods=['POST'])
def upload_file():
    csv_file = request.files['csv_file']
    csv_file.save('data.csv')
    df = pd.read_csv('data.csv')
    # further processing of the DataFrame

    # call the fn run script
    run_script()
    return 'File uploaded successfully'


if __name__ == '__main__':
    app.run(debug=True)
