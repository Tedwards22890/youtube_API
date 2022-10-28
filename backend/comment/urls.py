from django.urls import path
from . import views

urlpatterns = [
    path('all/', views.comment_list),
    path('', views.user_comments),
    path('<str:video_id>/', views.comment_by_video_id)
]