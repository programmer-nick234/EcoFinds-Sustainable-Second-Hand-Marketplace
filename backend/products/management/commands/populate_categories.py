from django.core.management.base import BaseCommand
from products.models import Category


class Command(BaseCommand):
    help = 'Populate categories with default data'

    def handle(self, *args, **options):
        categories_data = [
            {'name': 'Electronics', 'slug': 'electronics', 'description': 'Electronic devices and gadgets', 'icon': 'fas fa-laptop'},
            {'name': 'Clothing', 'slug': 'clothing', 'description': 'Fashion and apparel', 'icon': 'fas fa-tshirt'},
            {'name': 'Books', 'slug': 'books', 'description': 'Books and educational materials', 'icon': 'fas fa-book'},
            {'name': 'Home & Garden', 'slug': 'home-garden', 'description': 'Home improvement and garden items', 'icon': 'fas fa-home'},
            {'name': 'Sports & Outdoors', 'slug': 'sports', 'description': 'Sports equipment and outdoor gear', 'icon': 'fas fa-running'},
            {'name': 'Toys & Games', 'slug': 'toys', 'description': 'Toys, games, and entertainment', 'icon': 'fas fa-gamepad'},
            {'name': 'Automotive', 'slug': 'automotive', 'description': 'Car parts and automotive accessories', 'icon': 'fas fa-car'},
            {'name': 'Other', 'slug': 'other', 'description': 'Miscellaneous items', 'icon': 'fas fa-box'},
        ]

        created_count = 0
        for category_data in categories_data:
            category, created = Category.objects.get_or_create(
                slug=category_data['slug'],
                defaults=category_data
            )
            if created:
                created_count += 1
                self.stdout.write(
                    self.style.SUCCESS(f'Created category: {category.name}')
                )

        self.stdout.write(
            self.style.SUCCESS(f'Successfully created {created_count} categories')
        )
