# Travel Booking Application

A full-stack travel booking application with React frontend and Node.js backend.

## Features
- User authentication (login/signup)
- Travel destination search
- Booking management
- Admin panel
- AI-powered travel suggestions
- Email notifications

## Tech Stack
- **Frontend**: React, Vite, React Router, Axios
- **Backend**: Node.js, Express, Sequelize, SQLite
- **Authentication**: JWT

## Setup Instructions

### Backend Setup
1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file with the following variables:
   ```
   PORT=5000
   JWT_SECRET=your_super_secret_jwt_key
   JWT_EXPIRES_IN=7d
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   ADMIN_EMAIL=admin@travelbooking.com
   FRONTEND_URL=http://localhost:5173
   ```

4. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open http://localhost:5173 in your browser

## Default Admin Credentials
- Email: admin@travelbooking.com
- Password: admin123

## Deployment

### Backend Deployment (Render/Railway/Heroku)
1. Push code to GitHub
2. Connect your repository to hosting platform
3. Set environment variables
4. Deploy

### Frontend Deployment (Vercel/Netlify)
1. Build the frontend: `npm run build`
2. Deploy the `dist` folder
3. Update backend CORS settings with production URL

## License
MIT
