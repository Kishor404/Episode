from django.urls import path
from .views import AssociationListCreateView, AssociationDetailView

urlpatterns = [
    path('', AssociationListCreateView.as_view(), name='Association-list-create'),
    path('<int:pk>/', AssociationDetailView.as_view(), name='Association-detail'),
]
