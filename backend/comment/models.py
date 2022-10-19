from django.db import models

class Comment(models.Model):
    user=models.CharField(max_length=255)
    video_id=models.CharField(max_length=255)
    text=models.CharField(max_length=255)
    likes=models.IntegerField(default=0)
    dislikes=models.IntegerField(default=0)
