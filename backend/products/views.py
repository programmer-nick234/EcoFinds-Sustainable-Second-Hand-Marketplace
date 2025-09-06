from rest_framework import generics, permissions, status, filters
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.parsers import MultiPartParser, FormParser
from django.shortcuts import get_object_or_404
from django.db import models
from django.db.models import Q, Count, Avg, Min, Max
from django_filters.rest_framework import DjangoFilterBackend
from .models import Product, Category, ProductImage
from .serializers import (
    ProductSerializer, ProductCreateSerializer, ProductUpdateSerializer, 
    ProductListSerializer, CategorySerializer, ProductImageSerializer
)


class ProductListCreateView(generics.ListCreateAPIView):
    queryset = Product.objects.filter(is_available=True).select_related('category', 'owner').prefetch_related('images')
    permission_classes = [AllowAny]  # Allow anyone to view products
    parser_classes = [MultiPartParser, FormParser]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'condition', 'is_featured']
    search_fields = ['title', 'description', 'category__name']
    ordering_fields = ['price', 'title', 'created_at', 'view_count']
    ordering = ['-created_at']
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return ProductCreateSerializer
        return ProductListSerializer
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
    
    def get_queryset(self):
        queryset = Product.objects.filter(is_available=True).select_related('category', 'owner').prefetch_related('images')
        
        # Price range filter
        min_price = self.request.query_params.get('min_price')
        max_price = self.request.query_params.get('max_price')
        if min_price:
            queryset = queryset.filter(price__gte=min_price)
        if max_price:
            queryset = queryset.filter(price__lte=max_price)
        
        # Location filter
        location = self.request.query_params.get('location')
        if location:
            queryset = queryset.filter(location__icontains=location)
        
        # Featured products filter
        featured = self.request.query_params.get('featured')
        if featured and featured.lower() == 'true':
            queryset = queryset.filter(is_featured=True)
        
        return queryset


class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all().select_related('category', 'owner').prefetch_related('images')
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]
    
    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]
        return [IsAuthenticated()]
    
    def get_serializer_class(self):
        if self.request.method in ['PUT', 'PATCH']:
            return ProductUpdateSerializer
        return ProductSerializer
    
    def get_object(self):
        obj = get_object_or_404(Product, pk=self.kwargs['pk'])
        
        # Check permissions for update/delete
        if self.request.method in ['PUT', 'PATCH', 'DELETE']:
            if obj.owner != self.request.user:
                from rest_framework.exceptions import PermissionDenied
                raise PermissionDenied("You can only edit your own products.")
        
        return obj
    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        # Increment view count
        instance.increment_view_count()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
    
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        # Soft delete - mark as unavailable instead of hard delete
        instance.is_available = False
        instance.save()
        return Response({'message': 'Product deleted successfully'}, status=status.HTTP_200_OK)


class UserProductsView(generics.ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['is_available', 'is_featured']
    ordering_fields = ['price', 'title', 'created_at', 'view_count']
    ordering = ['-created_at']
    
    def get_queryset(self):
        return Product.objects.filter(owner=self.request.user).select_related('category').prefetch_related('images')


class CategoryListCreateView(generics.ListCreateAPIView):
    queryset = Category.objects.filter(is_active=True)
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]
    
    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]
        return [IsAuthenticated()]


class CategoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]
    
    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]
        return [IsAuthenticated()]


class FeaturedProductsView(generics.ListAPIView):
    serializer_class = ProductListSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        return Product.objects.filter(is_available=True, is_featured=True).select_related('category', 'owner').prefetch_related('images').order_by('-created_at')[:10]


class TrendingProductsView(generics.ListAPIView):
    serializer_class = ProductListSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        return Product.objects.filter(is_available=True).select_related('category', 'owner').prefetch_related('images').order_by('-view_count')[:10]


@api_view(['GET'])
@permission_classes([AllowAny])
def product_categories(request):
    """Get all available product categories with product counts"""
    categories = Category.objects.filter(is_active=True).annotate(
        product_count=Count('products', filter=Q(products__is_available=True))
    ).order_by('name')
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def toggle_product_availability(request, pk):
    """Toggle product availability (soft delete/restore)"""
    try:
        product = get_object_or_404(Product, pk=pk, owner=request.user)
        product.is_available = not product.is_available
        product.save()
        
        status_text = "available" if product.is_available else "unavailable"
        return Response({
            'message': f'Product marked as {status_text}',
            'is_available': product.is_available
        }, status=status.HTTP_200_OK)
    except Product.DoesNotExist:
        return Response({'error': 'Product not found or you do not have permission'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
@permission_classes([AllowAny])
def search_products(request):
    """Advanced product search with filters"""
    queryset = Product.objects.filter(is_available=True).select_related('category', 'owner').prefetch_related('images')
    
    # Search query
    search = request.query_params.get('q', '')
    if search:
        queryset = queryset.filter(
            Q(title__icontains=search) | 
            Q(description__icontains=search) |
            Q(category__name__icontains=search)
        )
    
    # Category filter
    category = request.query_params.get('category', '')
    if category:
        queryset = queryset.filter(category__slug=category)
    
    # Condition filter
    condition = request.query_params.get('condition', '')
    if condition:
        queryset = queryset.filter(condition=condition)
    
    # Price range
    min_price = request.query_params.get('min_price')
    max_price = request.query_params.get('max_price')
    if min_price:
        queryset = queryset.filter(price__gte=min_price)
    if max_price:
        queryset = queryset.filter(price__lte=max_price)
    
    # Location filter
    location = request.query_params.get('location', '')
    if location:
        queryset = queryset.filter(location__icontains=location)
    
    # Sort options
    sort_by = request.query_params.get('sort', '-created_at')
    valid_sorts = ['price', '-price', 'title', '-title', 'created_at', '-created_at', 'view_count', '-view_count']
    if sort_by in valid_sorts:
        queryset = queryset.order_by(sort_by)
    
    # Pagination
    page_size = int(request.query_params.get('page_size', 20))
    page = int(request.query_params.get('page', 1))
    
    start = (page - 1) * page_size
    end = start + page_size
    
    products = queryset[start:end]
    serializer = ProductListSerializer(products, many=True)
    
    return Response({
        'results': serializer.data,
        'count': queryset.count(),
        'page': page,
        'page_size': page_size,
        'total_pages': (queryset.count() + page_size - 1) // page_size
    })


@api_view(['GET'])
@permission_classes([AllowAny])
def product_analytics(request):
    """Get product analytics and statistics"""
    total_products = Product.objects.filter(is_available=True).count()
    total_categories = Category.objects.filter(is_active=True).count()
    
    # Price statistics
    price_stats = Product.objects.filter(is_available=True).aggregate(
        avg_price=Avg('price'),
        min_price=Min('price'),
        max_price=Max('price')
    )
    
    # Category distribution
    category_stats = Category.objects.filter(is_active=True).annotate(
        product_count=Count('products', filter=Q(products__is_available=True))
    ).values('name', 'product_count').order_by('-product_count')
    
    # Recent products
    recent_products = Product.objects.filter(is_available=True).order_by('-created_at')[:5]
    recent_serializer = ProductListSerializer(recent_products, many=True)
    
    return Response({
        'total_products': total_products,
        'total_categories': total_categories,
        'price_statistics': price_stats,
        'category_distribution': list(category_stats),
        'recent_products': recent_serializer.data
    })


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upload_product_images(request, pk):
    """Upload multiple images for a product"""
    try:
        product = get_object_or_404(Product, pk=pk, owner=request.user)
        images = request.FILES.getlist('images')
        
        if not images:
            return Response({'error': 'No images provided'}, status=status.HTTP_400_BAD_REQUEST)
        
        uploaded_images = []
        for i, image in enumerate(images):
            product_image = ProductImage.objects.create(
                product=product,
                image=image,
                is_primary=(i == 0)  # First image is primary
            )
            uploaded_images.append(ProductImageSerializer(product_image).data)
        
        return Response({
            'message': f'{len(images)} images uploaded successfully',
            'images': uploaded_images
        }, status=status.HTTP_201_CREATED)
        
    except Product.DoesNotExist:
        return Response({'error': 'Product not found or you do not have permission'}, status=status.HTTP_404_NOT_FOUND)