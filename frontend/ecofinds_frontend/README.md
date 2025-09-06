# EcoFinds Frontend

This is the frontend application for EcoFinds, built with Next.js 15, TypeScript, and TailwindCSS.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Setup Instructions

1. **Clone the repository** (if not already done):
   ```bash
   git clone <repository-url>
   cd hackathon_2.0/frontend/ecofinds_frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3000`

## 🔧 Configuration

The application is configured to connect to the backend API at `http://localhost:8000/api` by default. This URL is hardcoded in the API configuration and does not require any environment variables.

## 🛠️ Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint

## 🏗️ Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── dashboard/       # Dashboard page
│   ├── login/          # Login page
│   ├── register/       # Registration page
│   ├── products/       # Product-related pages
│   └── layout.tsx      # Root layout
├── components/         # Reusable React components
├── contexts/          # React contexts (Auth, etc.)
└── lib/               # API services and utilities
    ├── api.ts         # Axios configuration
    ├── auth.ts        # Authentication utilities
    └── products.ts    # Product API functions
```

## 🔗 API Integration

The frontend communicates with the Django backend through REST API endpoints. The API configuration is handled in `src/lib/api.ts` with:

- Automatic token authentication
- Request/response interceptors
- Error handling for 401 responses

## 🎨 Styling

The application uses:
- **TailwindCSS** for utility-first styling
- **Lucide React** for icons
- **Responsive design** for mobile and desktop

## 🚨 Troubleshooting

### Common Issues

1. **API Connection Errors**:
   - Ensure the backend server is running on `http://localhost:8000`
   - Verify CORS settings in the backend

2. **API Configuration Issues**:
   - The API URL is hardcoded to `http://localhost:8000/api`
   - If you need to change the backend URL, edit `src/lib/api.ts`

3. **Build Errors**:
   - Clear the `.next` directory: `rm -rf .next`
   - Reinstall dependencies: `rm -rf node_modules && npm install`

### Getting Help

If you encounter issues:
1. Check the browser console for errors
2. Verify the backend server is running
3. Review the main project README.md for full setup instructions

## 📝 Development Notes

- The app uses Next.js 15 with the App Router
- Authentication is handled via token-based auth with localStorage
- All API calls go through the centralized `api.ts` configuration
- The app is fully responsive and works on mobile and desktop