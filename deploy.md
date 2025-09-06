# EcoFinds Deployment Guide

## 🚀 Quick Deployment (5 Minutes)

### Backend Deployment (Railway/Heroku)

1. **Prepare Backend for Production**
   ```bash
   cd backend
   pip install -r requirements.txt
   python manage.py collectstatic --noinput
   python manage.py migrate
   ```

2. **Deploy to Railway**
   - Go to [Railway.app](https://railway.app)
   - Connect your GitHub repository
   - Select the `backend` folder
   - Add environment variables:
     ```
     SECRET_KEY=your-secret-key-here
     DEBUG=False
     DB_NAME=railway
     DB_USER=postgres
     DB_PASSWORD=your-db-password
     DB_HOST=your-db-host
     DB_PORT=5432
     ```
   - Deploy!

3. **Deploy to Heroku (Alternative)**
   ```bash
   cd backend
   heroku create ecofinds-backend
   heroku addons:create heroku-postgresql:hobby-dev
   heroku config:set SECRET_KEY=your-secret-key-here
   heroku config:set DEBUG=False
   git push heroku main
   heroku run python manage.py migrate
   ```

### Frontend Deployment (Vercel)

1. **Prepare Frontend**
   ```bash
   cd frontend/ecofinds_frontend
   npm run build
   ```

2. **Deploy to Vercel**
   - Go to [Vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Select the `frontend/ecofinds_frontend` folder
   - Add environment variable:
     ```
     NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app/api
     ```
   - Deploy!

### Environment Variables

**Backend (Railway/Heroku):**
```
SECRET_KEY=your-secret-key-here
DEBUG=False
DB_NAME=railway
DB_USER=postgres
DB_PASSWORD=your-db-password
DB_HOST=your-db-host
DB_PORT=5432
```

**Frontend (Vercel):**
```
NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app/api
```

## 🎯 Demo Checklist

- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] User registration works
- [ ] User login works
- [ ] Product creation works
- [ ] Product listing works
- [ ] Search and filter works
- [ ] Product detail view works
- [ ] User dashboard works
- [ ] Mobile responsive

## 🚨 Troubleshooting

1. **CORS Issues**: Update CORS_ALLOWED_ORIGINS in settings_production.py
2. **Database Issues**: Check database connection and run migrations
3. **Static Files**: Ensure collectstatic is run
4. **Environment Variables**: Verify all required variables are set

## 📱 Demo Script

1. **Show Registration**: Create a new account
2. **Show Product Creation**: Add a product with image
3. **Show Search**: Search and filter products
4. **Show Product Detail**: View individual product
5. **Show Dashboard**: Manage user products
6. **Show Mobile**: Demonstrate mobile responsiveness

## 🏆 Hackathon Success Tips

- Keep the demo simple and focused
- Have backup screenshots ready
- Test everything before presenting
- Have a clear user journey
- Emphasize the sustainability angle
- Show the technical stack
- Highlight the responsive design
