from django.urls import path
from .views import LogListCreateView, LogDetailView

urlpatterns = [
    path('', LogListCreateView.as_view(), name='Log-list-create'),
    path('<int:pk>/', LogDetailView.as_view(), name='Log-detail'),
]
