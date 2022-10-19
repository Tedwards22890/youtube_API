from xml.etree.ElementTree import Comment
from django.contrib import admin
from .models import Comment

admin.site.register(Comment)