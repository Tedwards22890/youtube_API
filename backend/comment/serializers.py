from rest_framework import serializers
from .models import Comment

class SongSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['user_id','video_id', 'text', 'likes', 'dislikes']
        depth = 1