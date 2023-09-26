from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from pyrebase import pyrebase

# Create your views here.

firebaseConfig = {
  "apiKey": "AIzaSyBvKVolKBWlue9RNZIjNXdxXV71AWoiLao",
  "authDomain": "upload-big-files-91607.firebaseapp.com",
  "databaseURL": "https://upload-big-files-91607-default-rtdb.firebaseio.com",
  "projectId": "upload-big-files-91607",
  "storageBucket": "upload-big-files-91607.appspot.com",
  "messagingSenderId": "732864974108",
  "appId": "1:732864974108:web:8ae8b4d9f1dfb46479fed9"
}

firebase = pyrebase.initialize_app(firebaseConfig)
database = firebase.database()

@api_view(["POST"])
def upload_files():
    return Response("hello world", status=status.HTTP_200_OK)