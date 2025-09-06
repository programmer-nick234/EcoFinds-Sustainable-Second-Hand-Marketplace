from rest_framework import serializers
from .models import Product, Category, ProductImage
from django.contrib.auth.models import User


class CategorySerializer(serializers.ModelSerializer):
    product_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description', 'icon', 'is_active', 'product_count', 'created_at']
        read_only_fields = ['id', 'created_at']
    
    def get_product_count(self, obj):
        return obj.products.filter(is_available=True).count()


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image', 'alt_text', 'is_primary', 'created_at']
        read_only_fields = ['id', 'created_at']


class ProductSerializer(serializers.ModelSerializer):
    owner_username = serializers.CharField(source='owner.username', read_only=True)
    owner_first_name = serializers.CharField(source='owner.first_name', read_only=True)
    owner_last_name = serializers.CharField(source='owner.last_name', read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)
    category_slug = serializers.CharField(source='category.slug', read_only=True)
    discount_percentage = serializers.ReadOnlyField()
    images = ProductImageSerializer(many=True, read_only=True)
    
    class Meta:
        model = Product
        fields = [
            'id', 'title', 'description', 'category', 'category_name', 'category_slug',
            'condition', 'price', 'original_price', 'discount_percentage', 'image',
            'images', 'owner', 'owner_username', 'owner_first_name', 'owner_last_name',
            'location', 'is_available', 'is_featured', 'view_count',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['owner', 'view_count', 'created_at', 'updated_at']


class ProductCreateSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, required=False)
    
    class Meta:
        model = Product
        fields = [
            'title', 'description', 'category', 'condition', 'price', 'original_price',
            'image', 'images', 'location', 'is_available', 'is_featured'
        ]
    
    def create(self, validated_data):
        images_data = validated_data.pop('images', [])
        product = Product.objects.create(**validated_data)
        
        for image_data in images_data:
            ProductImage.objects.create(product=product, **image_data)
        
        return product


class ProductUpdateSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, required=False)
    
    class Meta:
        model = Product
        fields = [
            'title', 'description', 'category', 'condition', 'price', 'original_price',
            'image', 'images', 'location', 'is_available', 'is_featured'
        ]
    
    def update(self, instance, validated_data):
        images_data = validated_data.pop('images', [])
        
        # Update product fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
        # Handle images if provided
        if images_data:
            # Clear existing images
            instance.images.all().delete()
            # Add new images
            for image_data in images_data:
                ProductImage.objects.create(product=instance, **image_data)
        
        return instance


class ProductListSerializer(serializers.ModelSerializer):
    owner_username = serializers.CharField(source='owner.username', read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)
    category_slug = serializers.CharField(source='category.slug', read_only=True)
    discount_percentage = serializers.ReadOnlyField()
    primary_image = serializers.SerializerMethodField()
    
    class Meta:
        model = Product
        fields = [
            'id', 'title', 'description', 'category', 'category_name', 'category_slug',
            'condition', 'price', 'original_price', 'discount_percentage', 'image',
            'primary_image', 'owner_username', 'location', 'is_available',
            'is_featured', 'view_count', 'created_at'
        ]
    
    def get_primary_image(self, obj):
        primary_img = obj.images.filter(is_primary=True).first()
        if primary_img:
            return ProductImageSerializer(primary_img).data
        return None
