from rest_framework import generics
from .models import Association
from .serializers import AssociationSerializer


class AssociationListCreateView(generics.ListCreateAPIView):
    queryset = Association.objects.all()
    serializer_class = AssociationSerializer

class AssociationDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Association.objects.all()
    serializer_class = AssociationSerializer
