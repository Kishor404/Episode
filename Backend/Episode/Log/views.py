from rest_framework import generics
from .models import Log
from .serializers import LogSerializer

from django.contrib.auth.hashers import check_password
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

class LogListCreateView(generics.ListCreateAPIView):
    queryset = Log.objects.all()
    serializer_class = LogSerializer

class LogDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Log.objects.all()
    serializer_class = LogSerializer


class CheckPasswordView(APIView):
    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')
        
        if not email or not password:
            return Response({"detail": "Email and password must be provided."}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            log_entry = Log.objects.get(Email=email)
        except Log.DoesNotExist:
            return Response({"check":404,"detail": "User not found."}, status=status.HTTP_200_OK)
        
        if check_password(password, log_entry.Password):
            return Response({"check":1,"detail": "Password is correct.","Name":log_entry.Name,"Dept":log_entry.Department,"Year":log_entry.Year,"RegNo":log_entry.RegNo,"Position":log_entry.Position}, status=status.HTTP_200_OK)
        else:
            return Response({"check":0,"detail": "Password is incorrect."}, status=status.HTTP_200_OK)