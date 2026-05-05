# Travel Booking App - Setup Guide

## Prerequisites
- Node.js (v16 or higher) - Just installed ✓
- Git (to clone the repository)

## Step 1: Verify Node.js Installation

**IMPORTANT FOR WINDOWS USERS**: Use **Command Prompt (CMD)**, NOT PowerShell!

To open Command Prompt:
1. Press `Windows + R`
2. Type `cmd`
3. Press Enter

Check Node.js installation:

```bash
node --version
npm --version
```

You should see version numbers. If not, restart your terminal or computer.

### If you see "scripts is disabled" error in PowerShell:

**Option 1 (Recommended)**: Use Command Prompt (CMD) instead of PowerShell

**Option 2**: Fix PowerShell (requires admin rights)
1. Right-click PowerShell
2. Select "Run as Administrator"
3. Run this command:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```
4. Type `Y` and press Enter
5. Close and reopen PowerShell

## Step 2: Clone or Get the Project

If you received the project folder, skip to Step 3.

If cloning from Git:
```bash
git clone <repository-url>
cd travel-booking-app
```

## Step 3: Setup Backend

In Command Prompt (CMD), navigate to the backend folder:

```bash
cd travel-booking/backend
```

Install dependencies:
```bash
npm install
```

This will take a few minutes to download all packages.

Check if `.env` file exists in the backend folder. It should contain:
```
PORT=5000
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d
EMAIL_HOST=smtp-relay.brevo.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password_here
ADMIN_EMAIL=your_email@gmail.com
FRONTEND_URL=http://localhost:5173
```

**Note**: Copy the actual values from the existing `.env` file - don't type them manually!

Start the backend server:
```bash
npm start
```

You should see: `Server running on port 5000`

**Keep this terminal window open!**

## Step 4: Setup Frontend

Open a **NEW** Command Prompt window (keep backend running).

Navigate to the frontend folder:
```bash
cd travel-booking/frontend
```

Install dependencies:
```bash
npm install
```

This will also take a few minutes.

Start the frontend:
```bash
npm run dev
```

You should see something like:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
```

## Step 5: Open the Application

Open your browser and go to:
```
http://localhost:5173
```

You should see the Travel Booking App!

## Default Admin Login

- Email: (check the ADMIN_EMAIL in backend/.env)
- Password: `admin123`

## Common Issues

### Issue: "npm is not recognized"
**Solution**: Restart your computer after installing Node.js

### Issue: "Port 5000 already in use"
**Solution**: 
1. Close any other programs using port 5000
2. Or change PORT in backend/.env to 5001
3. Restart backend

### Issue: "Cannot find module"
**Solution**: 
```bash
# In the folder showing the error
npm install
```

### Issue: Frontend can't connect to backend
**Solution**: 
- Make sure backend is running (check the first terminal)
- Backend should show "Server running on port 5000"

## Stopping the Application

To stop the servers:
1. Go to each terminal window
2. Press `Ctrl + C`
3. Type `Y` if asked to terminate

## Running Again Later

You need **TWO terminal windows**:

**Terminal 1 - Backend:**
```bash
cd travel-booking/backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd travel-booking/frontend
npm run dev
```

Then open `http://localhost:5173` in your browser.

## Project Structure

```
travel-booking/
├── backend/          # Node.js + Express API
│   ├── src/         # Source code
│   ├── .env         # Environment variables (IMPORTANT!)
│   └── package.json
└── frontend/        # React + Vite
    ├── src/         # Source code
    └── package.json
```

## Need Help?

If you see any errors, copy the error message and share it!
