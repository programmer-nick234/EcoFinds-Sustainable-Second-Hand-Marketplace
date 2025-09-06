from django.urls import path
from . import views

urlpatterns = [
    path('', views.ProductListCreateView.as_view(), name='product-list-create'),
    path('<int:pk>/', views.ProductDetailView.as_view(), name='product-detail'),
    path('my-products/', views.UserProductsView.as_view(), name='user-products'),
    path('categories/', views.product_categories, name='product-categories'),
]
