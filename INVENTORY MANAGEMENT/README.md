# Inventory Management System - MERN Stack

A full-stack inventory management application built with MongoDB, Express.js, React.js, and Node.js (MERN).

## Project Structure

```
INVENTORY MANAGEMENT/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API service (Axios)
│   │   ├── context/         # Auth context
│   │   ├── hooks/           # Custom React hooks
│   │   └── routes/          # Route definitions
│   └── package.json
│
├── backend/                  # Node.js/Express server
│   ├── config/              # Database configuration
│   ├── models/              # Mongoose models
│   ├── routes/              # API routes
│   ├── controllers/         # Route handlers
│   ├── middleware/          # Custom middleware (auth)
│   ├── utils/               # Utility functions
│   ├── uploads/             # File upload directory
│   ├── server.js            # Main server file
│   ├── .env                 # Environment variables
│   └── package.json
│
└── .gitignore              # Git ignore file
```

## Setup Instructions

### Prerequisites
- Node.js (v14+)
- npm or yarn
- MongoDB (local or MongoDB Atlas cloud)

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables in `.env`:
   ```
   MONGODB_URI=mongodb://localhost:27017/inventory_management
   JWT_SECRET=your_jwt_secret_key_change_this_in_production
   PORT=5000
   NODE_ENV=development
   ```

4. Start the server:
   ```bash
   npm start
   ```
   
   For development with auto-reload:
   ```bash
   npm run dev
   ```
   (Note: Install nodemon: `npm install --save-dev nodemon`)

The server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies (already done):
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

The app will open at `http://localhost:3000`

### Verify Setup

1. **Check Backend Health:**
   ```bash
   curl http://localhost:5000/api/health
   ```
   Expected response: `{"status":"ok","message":"Server is running"}`

2. **Check Frontend:**
   - Navigate to `http://localhost:3000`
   - You should see placeholder pages

## Project Phases

### Phase 1: Setup ✅ COMPLETE
- [x] Project directory structure
- [x] React frontend initialization
- [x] Express backend initialization
- [x] Basic middleware setup
- [x] Route placeholders
- [x] Auth context & API service

### Phase 2: Authentication (Next)
- [ ] User model
- [ ] Login & Register endpoints
- [ ] JWT token generation
- [ ] Login & Register pages
- [ ] Protected routes

### Phase 3: CRUD Operations
- [ ] Category management
- [ ] Supplier management
- [ ] Product management
- [ ] Order management

### Phase 4: Dashboard & Reporting
- [ ] Dashboard stats
- [ ] Charts
- [ ] Reports

### Phase 5: User Management
- [ ] User management routes
- [ ] User management page

### Phase 6: Profile Management
- [ ] Profile page
- [ ] Update profile endpoints

### Phase 7: Deployment
- [ ] Backend deployment (Render/Railway)
- [ ] Frontend deployment (Vercel/Netlify)

## Technologies Used

### Frontend
- React.js
- React Router DOM
- Axios
- React Hook Form
- React Toastify
- Recharts (for charts)

### Backend
- Express.js
- Mongoose
- JWT (JSON Web Tokens)
- bcryptjs
- Multer (file uploads)
- Helmet (security)
- CORS

### Database
- MongoDB

## API Routes (Placeholder)

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/forgot-password` - Forgot password
- `POST /api/auth/reset-password` - Reset password

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category (admin)
- `PUT /api/categories/:id` - Update category (admin)
- `DELETE /api/categories/:id` - Delete category (admin)

### Suppliers
- `GET /api/suppliers` - Get all suppliers
- `POST /api/suppliers` - Create supplier (admin)
- `PUT /api/suppliers/:id` - Update supplier (admin)
- `DELETE /api/suppliers/:id` - Delete supplier (admin)

### Orders
- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create order
- `PUT /api/orders/:id` - Update order (admin)
- `DELETE /api/orders/:id` - Delete order (admin)

### Users
- `GET /api/users` - Get all users (admin)
- `POST /api/users` - Create user (admin)
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `PUT /api/users/:id` - Update user (admin)
- `DELETE /api/users/:id` - Delete user (admin)

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics
- `GET /api/dashboard/low-stock` - Get low stock items
- `GET /api/dashboard/recent-orders` - Get recent orders
- `GET /api/dashboard/recent-products` - Get recent products

## Next Steps

1. Test backend server startup ✅
2. Test frontend startup ✅
3. Implement Phase 2: Authentication system
4. Create User model
5. Implement login/register endpoints
6. Build login/register pages

## Notes

- All routes are currently placeholders returning "to be implemented" messages
- MongoDB connection will fail until MongoDB is running
- JWT tokens expire after 7 days (configurable)
- File uploads stored in `/backend/uploads` directory
