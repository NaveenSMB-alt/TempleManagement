from django.urls import path
from .views import *

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('roles/', RoleListCreateView.as_view(), name='role-list-create'),
    path('roles/<int:pk>/', RoleDetailView.as_view(), name='role-detail'),
    path('users/', UserListCreateView.as_view(), name='users'),
    path('users/<int:pk>/', UserRetrieveUpdateDestroyView.as_view(), name='users-details'),
]