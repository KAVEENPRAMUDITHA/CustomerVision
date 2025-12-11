# CustomerVision.lk - Consumer Complaint Management System

A full-stack web application for managing consumer complaints with location-based tracking and admin dashboard capabilities. Users can submit complaints about shops/businesses, and administrators can review and manage them through an interactive map interface.


## ✨ Features

- **User Authentication**: Secure login/registration with JWT tokens
- **Complaint Management**: Submit complaints with location details
- **Role-Based Access**: User and Admin roles with different permissions
- **Location Mapping**: Interactive map for complaint locations using Leaflet
- **Admin Dashboard**: View and manage all complaints
- **Password Security**: Hashed passwords using bcryptjs
- **CORS Support**: Configured for cross-origin requests
- **Database Seeding**: Automatic database initialization with sample data

## 🛠 Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT (jsonwebtoken)** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin support
- **dotenv** - Environment variables

### Frontend
- **React 19** - UI library
- **Vite** - Build tool
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **Leaflet** - Map library
- **React Leaflet** - React wrapper for Leaflet
- **ESLint** - Code linting

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB** - Either local installation or MongoDB Atlas account
- **Git** - For version control

### Checking Prerequisites

```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Check Git version
git --version
```

## 📂 Project Structure

```
CustomCare.lk/
├── backend/
│   ├── middleware/
│   │   └── auth.js              # JWT authentication middleware
│   ├── models/
│   │   ├── Complaint.js         # Complaint schema
│   │   └── User.js              # User schema
│   ├── routes/
│   │   ├── authRoutes.js        # Authentication endpoints
│   │   └── complaintRoutes.js   # Complaint endpoints
│   ├── package.json             # Backend dependencies
│   ├── server.js                # Express server setup
│   ├── seed.js                  # Database seeding script
│   ├── test-db.js               # Database connection test
│   └── .env                     # Environment variables
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AdminDashboard.jsx    # Admin dashboard
│   │   │   ├── ComplaintForm.jsx     # Complaint submission form
│   │   │   ├── CreateAdminForm.jsx   # Admin creation form
│   │   │   ├── Login.jsx             # Login component
│   │   │   ├── MapSelector.jsx       # Map location selector
│   │   │   └── UserProfile.jsx       # User profile page
│   │   ├── context/
│   │   │   └── AuthContext.jsx       # Authentication context
│   │   ├── App.jsx              # Main App component
│   │   ├── main.jsx             # React entry point
│   │   ├── index.css            # Global styles
│   │   └── App.css              # App-specific styles
│   ├── public/                  # Static assets
│   ├── package.json             # Frontend dependencies
│   ├── vite.config.js           # Vite configuration
│   ├── tailwind.config.js       # Tailwind CSS config
│   ├── postcss.config.js        # PostCSS configuration
│   └── eslint.config.js         # ESLint configuration
│
└── README.md                    # This file
```

## 🚀 Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/CustomCare.lk.git
cd CustomCare.lk
```

### Step 2: Install Backend Dependencies

```bash
cd backend
npm install
```

Expected output:
```
added X packages in Xm
```

### Step 3: Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

## ⚙️ Environment Setup

### Backend Environment Variables

Create a `.env` file in the `backend/` directory with the following variables:

```env
# MongoDB Connection String
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/?appName=Cluster0

# Server Port
PORT=5000

# JWT Secret Key (use a strong random string in production)
JWT_SECRET=supersecretkey123
```

#### Setting up MongoDB Atlas (Recommended)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster
4. In Network Access, add your IP address
5. Create a database user
6. Click "Connect" and select "Connect your application"
7. Copy the connection string and update `MONGO_URI` in `.env`

**Note:** Replace `<username>`, `<password>`, and the cluster details with your actual MongoDB credentials.

#### Local MongoDB (Alternative)

If using a local MongoDB installation:

```env
MONGO_URI=mongodb://127.0.0.1:27017/consumer_complaints
PORT=5000
JWT_SECRET=supersecretkey123
```

### Frontend Environment (Vite)

The frontend is pre-configured. If you need to change the API endpoint, check `frontend/src/` components for axios configuration. By default, it connects to `http://localhost:5000`.

## ▶️ Running the Application

### Option 1: Run Backend and Frontend Separately (Recommended for Development)

#### Terminal 1 - Backend Server

```bash
cd backend
npm start
```

Expected output:
```
Server running on port 5000
MongoDB Connected
```

#### Terminal 2 - Frontend Development Server

```bash
cd frontend
npm run dev
```

Expected output:
```
  VITE v7.x.x  ready in XXX ms

  ➜  Local:   http://localhost:5173/
```

#### Access the Application

- **Frontend**: Open your browser and go to `http://localhost:5173`
- **Backend API**: Available at `http://localhost:5000`

### Option 2: Build Frontend for Production

```bash
cd frontend
npm run build
```

This creates an optimized production build in `frontend/dist/`.

### Option 3: Preview Production Build

```bash
cd frontend
npm run preview
```

## 📡 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (201):**
```json
{
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id",
    "email": "user@example.com",
    "role": "user"
  }
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id",
    "email": "user@example.com",
    "role": "user"
  }
}
```

#### Create Admin (Admin Only)
```http
POST /api/auth/create-admin
Authorization: Bearer jwt_token_here
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "adminpass123"
}
```

### Complaint Endpoints

#### Create Complaint
```http
POST /api/complaints
Authorization: Bearer jwt_token_here
Content-Type: application/json

{
  "shopName": "ABC Shop",
  "category": "Product Quality",
  "description": "Defective product purchased",
  "location": {
    "lat": 6.9271,
    "lng": 80.7789
  }
}
```

#### Get All Complaints (Admin)
```http
GET /api/complaints
Authorization: Bearer jwt_token_here
```

**Response (200):**
```json
[
  {
    "_id": "complaint_id",
    "shopName": "ABC Shop",
    "user": "user_id",
    "category": "Product Quality",
    "description": "Defective product purchased",
    "location": {
      "lat": 6.9271,
      "lng": 80.7789
    },
    "status": "open",
    "createdAt": "2024-01-15T10:30:00Z"
  }
]
```

#### Get User's Complaints
```http
GET /api/complaints/my-complaints
Authorization: Bearer jwt_token_here
```

#### Update Complaint Status (Admin)
```http
PUT /api/complaints/:id
Authorization: Bearer jwt_token_here
Content-Type: application/json

{
  "status": "resolved"
}
```

**Valid status values:** `open`, `in-progress`, `resolved`, `closed`

## 💾 Database Schema

### User Model

```javascript
{
  email: String (required, unique),
  password: String (required, hashed),
  role: String (enum: ['user', 'admin'], default: 'user')
}
```

### Complaint Model

```javascript
{
  shopName: String (required),
  user: ObjectId (reference to User, required),
  category: String (required),
  description: String,
  location: {
    lat: Number (required),
    lng: Number (required)
  },
  status: String (enum: ['open', 'in-progress', 'resolved', 'closed']),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

## 🔍 Testing

### Test Database Connection

```bash
cd backend
node test-db.js
```

This will verify your MongoDB connection is working.

### Lint Frontend Code

```bash
cd frontend
npm run lint
```

## 🐛 Troubleshooting

### Backend Issues

#### "Port 5000 already in use"
```bash
# Change PORT in .env file
PORT=5001

# Or kill the process using port 5000
# On Windows (PowerShell as Admin):
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# On macOS/Linux:
lsof -ti:5000 | xargs kill -9
```

#### "MongoDB connection failed"
- Verify `MONGO_URI` in `.env` is correct
- Check if MongoDB Atlas cluster is active
- Ensure your IP is whitelisted in MongoDB Atlas
- For local MongoDB: ensure MongoDB service is running
  ```bash
  # Windows:
  mongod
  
  # macOS:
  brew services start mongodb-community
  
  # Linux:
  sudo systemctl start mongod
  ```

#### "Cannot find module" errors
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
```

### Frontend Issues

#### "Module not found" errors
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

#### API requests failing (CORS errors)
- Ensure backend is running on `http://localhost:5000`
- Check that CORS is enabled in `backend/server.js`
- Verify the API endpoint in frontend components matches your backend URL

#### Port 5173 already in use
```bash
# Change the Vite port in package.json or use:
npm run dev -- --port 3000
```

### Common Issues

| Issue | Solution |
|-------|----------|
| Blank page on frontend | Check browser console for errors, ensure backend is running |
| Login not working | Verify JWT_SECRET in .env, check database has users |
| Map not displaying | Ensure Leaflet library is loaded, check browser console |
| Complaints not showing | Verify user is authenticated, check database has complaints |

## 📝 Default Credentials

After seeding (runs automatically), you can use:

- **User Account**: `user@example.com` / `password123`
- **Admin Account**: `admin@example.com` / `admin123`

**⚠️ Change these credentials in production!**

## 🔒 Security Notes

- Never commit `.env` files to version control
- Use strong JWT secrets in production
- Implement rate limiting for API endpoints in production
- Use HTTPS in production
- Keep dependencies updated: `npm audit` and `npm update`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Submit a Pull Request

## 📄 License

ISC License - See LICENSE file for details

## 📧 Support

For issues and questions:
- Create an issue on GitHub
- Contact: pramudithakaveen51@gmail.com

---

**Last Updated**: December 2024
