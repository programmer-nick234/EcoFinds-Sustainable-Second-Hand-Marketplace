from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.parsers import MultiPartParser, FormParser
from django.shortcuts import get_object_or_404
from django.db.models import Q
from .models import Product
from .serializers import ProductSerializer, ProductCreateSerializer


class ProductListCreateView(generics.ListCreateAPIView):
    queryset = Product.objects.filter(is_available=True)
    permission_classes = [AllowAny]  # Allow anyone to view products
    parser_classes = [MultiPartParser, FormParser]
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return ProductCreateSerializer
        return ProductSerializer
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
    
    def get_queryset(self):
        queryset = Product.objects.filter(is_available=True)
        
        # Search functionality
        search = self.request.query_params.get('search', None)
        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) | 
                Q(description__icontains=search) |
                Q(category__icontains=search)
            )
        
        # Category filter
        category = self.request.query_params.get('category', None)
        if category:
            queryset = queryset.filter(category=category)
        
        # Price range filter
        min_price = self.request.query_params.get('min_price', None)
        max_price = self.request.query_params.get('max_price', None)
        if min_price:
            queryset = queryset.filter(price__gte=min_price)
        if max_price:
            queryset = queryset.filter(price__lte=max_price)
        
        # Sort by
        sort_by = self.request.query_params.get('sort_by', '-created_at')
        if sort_by in ['price', '-price', 'title', '-title', 'created_at', '-created_at']:
            queryset = queryset.order_by(sort_by)
        
        return queryset


class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]
    
    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]
        return [IsAuthenticated()]
    
    def get_serializer_class(self):
        if self.request.method in ['PUT', 'PATCH']:
            return ProductCreateSerializer
        return ProductSerializer
    
    def get_object(self):
        obj = get_object_or_404(Product, pk=self.kwargs['pk'])
        
        # Check permissions for update/delete
        if self.request.method in ['PUT', 'PATCH', 'DELETE']:
            if obj.owner != self.request.user:
                from rest_framework.exceptions import PermissionDenied
                raise PermissionDenied("You can only edit your own products.")
        
        return obj
    
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        # Soft delete - mark as unavailable instead of hard delete
        instance.is_available = False
        instance.save()
        return Response({'message': 'Product deleted successfully'}, status=status.HTTP_200_OK)


class UserProductsView(generics.ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Product.objects.filter(owner=self.request.user).order_by('-created_at')


@api_view(['GET'])
@permission_classes([AllowAny])
def product_categories(request):
    """Get all available product categories"""
    categories = [{'value': choice[0], 'label': choice[1]} for choice in Product.CATEGORY_CHOICES]
    return Response(categories)


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
    queryset = Product.objects.filter(is_available=True)
    
    # Search query
    search = request.query_params.get('q', '')
    if search:
        queryset = queryset.filter(
            Q(title__icontains=search) | 
            Q(description__icontains=search) |
            Q(category__icontains=search)
        )
    
    # Category filter
    category = request.query_params.get('category', '')
    if category:
        queryset = queryset.filter(category=category)
    
    # Price range
    min_price = request.query_params.get('min_price')
    max_price = request.query_params.get('max_price')
    if min_price:
        queryset = queryset.filter(price__gte=min_price)
    if max_price:
        queryset = queryset.filter(price__lte=max_price)
    
    # Sort options
    sort_by = request.query_params.get('sort', '-created_at')
    valid_sorts = ['price', '-price', 'title', '-title', 'created_at', '-created_at']
    if sort_by in valid_sorts:
        queryset = queryset.order_by(sort_by)
    
    # Pagination
    page_size = int(request.query_params.get('page_size', 20))
    page = int(request.query_params.get('page', 1))
    
    start = (page - 1) * page_size
    end = start + page_size
    
    products = queryset[start:end]
    serializer = ProductSerializer(products, many=True)
    
    return Response({
        'results': serializer.data,
        'count': queryset.count(),
        'page': page,
        'page_size': page_size,
        'total_pages': (queryset.count() + page_size - 1) // page_size
    })