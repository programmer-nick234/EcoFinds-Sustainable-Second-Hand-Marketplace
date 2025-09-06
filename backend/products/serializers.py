from rest_framework import serializers
from .models import Product
from django.contrib.auth.models import User


class ProductSerializer(serializers.ModelSerializer):
    owner_username = serializers.CharField(source='owner.username', read_only=True)
    
    class Meta:
        model = Product
        fields = ['id', 'title', 'description', 'category', 'price', 'image', 'owner', 'owner_username', 'created_at', 'updated_at', 'is_available']
        read_only_fields = ['owner', 'created_at', 'updated_at']


class ProductCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['title', 'description', 'category', 'price', 'image', 'is_available']
