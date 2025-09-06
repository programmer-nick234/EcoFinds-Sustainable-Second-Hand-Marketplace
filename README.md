# EcoFinds - Second-Hand Marketplace

A full-stack application built with Django REST Framework (backend) and Next.js (frontend) for a sustainable second-hand marketplace.

## 🚀 Features

- **User Authentication**: Register, login, and logout with token-based authentication
- **Product Management**: Create, read, update, and delete products
- **Product Categories**: Electronics, Clothing, Books, Home & Garden, Sports, Toys, Automotive, and more
- **Image Upload**: Support for product images
- **Admin Panel**: Django admin interface for managing users and products
- **Responsive Design**: Modern UI with TailwindCSS

## 🛠️ Tech Stack

### Backend
- Django 5.2.6
- Django REST Framework 3.16.1
- SQLite (local development)
- Token Authentication
- CORS enabled for frontend integration

### Frontend
- Next.js 15.5.2 (App Router)
- TypeScript
- TailwindCSS
- React Hook Form with Zod validation
- Axios for API communication
- Lucide React for icons

## 📁 Project Structure

```
hackathon_2.0/
├── backend/
│   ├── ecofinds_backend/          # Django project settings
│   ├── accounts/                  # User authentication app
│   ├── products/                  # Product management app
│   ├── manage.py
│   └── requirements.txt
└── frontend/
    └── ecofinds_frontend/         # Next.js application
        ├── src/
        │   ├── app/               # App Router pages
        │   ├── contexts/          # React contexts
        │   └── lib/               # API services and utilities
        └── package.json
```

## 🚀 Getting Started

### Prerequisites
- Python 3.8+
- Node.js 18+
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run database migrations:
   ```bash
   python manage.py migrate
   ```

4. Create a superuser (optional):
   ```bash
   python manage.py createsuperuser
   ```

5. Start the Django development server:
   ```bash
   python manage.py runserver
   ```

The backend will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend/ecofinds_frontend
   ```

2. **IMPORTANT**: Set up environment variables:
   ```bash
   # Copy the example environment file
   cp .env.example .env.local
   
   # Or run the setup script (Windows)
   setup-env.bat
   
   # Or run the setup script (Linux/Mac)
   chmod +x setup-env.sh && ./setup-env.sh
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:3000`

**Note**: If you encounter API connection issues, make sure the backend server is running on `http://localhost:8000` and check that the `NEXT_PUBLIC_API_URL` in your `.env.local` file matches your backend URL.

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/register/` - User registration
- `POST /api/auth/login/` - User login
- `POST /api/auth/logout/` - User logout
- `GET /api/auth/profile/` - Get user profile
- `PUT /api/auth/profile/update/` - Update user profile

### Products
- `GET /api/products/` - List all products
- `POST /api/products/` - Create a new product
- `GET /api/products/{id}/` - Get product details
- `PUT /api/products/{id}/` - Update product
- `DELETE /api/products/{id}/` - Delete product
- `GET /api/products/my-products/` - Get user's products
- `GET /api/products/categories/` - Get product categories

## 👤 Default Admin User

- **Username**: admin
- **Email**: admin@ecofinds.com
- **Password**: admin123

Access the admin panel at: `http://localhost:8000/admin`

## 🎯 Usage

1. **Register/Login**: Create an account or login with existing credentials
2. **Browse Products**: View all available products on the main page
3. **Add Products**: Click "Add Product" to list your own items
4. **Manage Products**: Edit or delete your own products
5. **Admin Panel**: Use the Django admin to manage users and products

## 🔧 Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

## 📝 Notes

- The application uses SQLite for local development
- CORS is configured to allow requests from `http://localhost:3000`
- Product images are stored in the `media/products/` directory
- Token authentication is used for API security
- All API endpoints require authentication except for product listing and user registration/login

## 🚀 Deployment

For production deployment:

1. **Backend**: Configure a production database (PostgreSQL recommended)
2. **Frontend**: Build the Next.js application and deploy to Vercel, Netlify, or similar
3. **Environment**: Update API URLs and security settings
4. **Media Files**: Configure proper media file serving

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is created for hackathon purposes.
