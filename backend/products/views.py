from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Product
from .serializers import ProductSerializer, ProductCreateSerializer


class ProductListCreateView(generics.ListCreateAPIView):
    queryset = Product.objects.filter(is_available=True)
    permission_classes = [AllowAny]  # Allow anyone to view products
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return ProductCreateSerializer
        return ProductSerializer
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]
    
    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]
        return [IsAuthenticated()]
    
    def get_serializer_class(self):
        if self.request.method in ['PUT', 'PATCH']:
            return ProductCreateSerializer
        return ProductSerializer


class UserProductsView(generics.ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Product.objects.filter(owner=self.request.user)


@api_view(['GET'])
@permission_classes([AllowAny])
def product_categories(request):
    """Get all available product categories"""
    categories = [{'value': choice[0], 'label': choice[1]} for choice in Product.CATEGORY_CHOICES]
    return Response(categories)