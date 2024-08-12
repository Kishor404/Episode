from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import Log

class LogSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Log
        fields = '__all__'

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        if password:
            validated_data['Password'] = make_password(password)
        return super().create(validated_data)
