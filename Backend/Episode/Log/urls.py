from django.urls import path
from .views import LogListCreateView, LogDetailView, CheckPasswordView,LogDetailByRegNoView

urlpatterns = [
    path('', LogListCreateView.as_view(), name='Log-list-create'),
    path('<int:pk>/', LogDetailView.as_view(), name='Log-detail'),
    path('Reg/<str:regno>/', LogDetailByRegNoView.as_view(), name='Log-RegNo'),
    path('checkpassword/', CheckPasswordView.as_view(), name='Check-password'),
]
