import firebase_admin
from firebase_admin import credentials, storage
import os

# Initialize the Firebase Admin SDK with the storageBucket option
cred = credentials.Certificate("../google-service.json")
firebase_admin.initialize_app(cred)

# Get a reference to the default bucket
bucket = storage.bucket('data-vis-96dc7.appspot.com')

# Path to the folder to be uploaded
folder_path = "plots"

# Get a reference to the folder we want to create
folder_ref = bucket.blob('plot/')

# Create an empty file to create the folder
folder_ref.upload_from_string('')

# Traverse through all the files in the folder and upload each file to Firebase Storage
for subdir, dirs, files in os.walk(folder_path):
    for file in files:
        file_path = os.path.join(subdir, file)
        blob = bucket.blob('plot/' + os.path.relpath(file_path, folder_path))
        blob.upload_from_filename(file_path)

        # Get the public URL of the uploaded file
        url = blob.public_url
        print(url)
