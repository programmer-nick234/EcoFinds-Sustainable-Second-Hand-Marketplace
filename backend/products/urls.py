from django.urls import path
from . import views

urlpatterns = [
    # Product endpoints
    path('', views.ProductListCreateView.as_view(), name='product-list-create'),
    path('<int:pk>/', views.ProductDetailView.as_view(), name='product-detail'),
    path('my-products/', views.UserProductsView.as_view(), name='user-products'),
    path('featured/', views.FeaturedProductsView.as_view(), name='featured-products'),
    path('trending/', views.TrendingProductsView.as_view(), name='trending-products'),
    path('<int:pk>/toggle-availability/', views.toggle_product_availability, name='toggle-product-availability'),
    path('<int:pk>/upload-images/', views.upload_product_images, name='upload-product-images'),
    
    # Category endpoints
    path('categories/', views.CategoryListCreateView.as_view(), name='category-list-create'),
    path('categories/<int:pk>/', views.CategoryDetailView.as_view(), name='category-detail'),
    path('categories/list/', views.product_categories, name='product-categories'),
    
    # Search and analytics
    path('search/', views.search_products, name='search-products'),
    path('analytics/', views.product_analytics, name='product-analytics'),
]
