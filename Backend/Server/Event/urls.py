from django.urls import path
from .views import EventListCreate, EventRetrieveUpdateDelete

urlpatterns = [
    path('Events/', EventListCreate.as_view(), name='Event-list-create'),
    path('Events/<int:pk>/', EventRetrieveUpdateDelete.as_view(), name='Event-retrieve-update-delete'),
]
