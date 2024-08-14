from rest_framework import serializers
from .models import Association

class AssociationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Association
        fields = '__all__'

