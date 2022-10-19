from django.urls import path
from . import views

urlpatterns = [
    path('all/', views.comment_list),
    path('', views.user_comments)
]