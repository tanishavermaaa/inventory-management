# Inventory Management System - MERN Stack

A full-stack inventory management application built with MongoDB, Express.js, React.js, and Node.js (MERN).

## Features

- **User Authentication**: JWT-based login with role-based access (Admin/Staff)
- **Dashboard**: Overview of products, stock levels, recent orders, and statistics
- **Product Management**: CRUD operations for products with categories and suppliers
- **Category Management**: Organize products into categories
- **Supplier Management**: Manage supplier information
- **Order Management**: Track customer orders and order status
- **User Management**: Admin can manage users (Admin only)
- **Responsive UI**: Tailwind CSS for modern, responsive design
- **Soft Delete**: Safe deletion with recovery capability

## Tech Stack

- **Frontend**: React.js, React Router, Axios, Tailwind CSS, React Toastify
- **Backend**: Node.js, Express.js, MongoDB/Mongoose, JWT, bcrypt
- **Database**: MongoDB Atlas (cloud) or local MongoDB
- **Authentication**: JWT tokens with role-based middleware

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
├── .gitignore              # Git ignore file
└── README.md               # This file
```

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas account)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-github-repo-url>
   cd INVENTORY-MANAGEMENT
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   npm install
   ```

3. **Frontend Setup:**
   ```bash
   cd ../frontend
   npm install
   ```

### Environment Configuration

1. **Backend Environment (.env):**
   Create `backend/.env` file:
   ```
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/inventory_management?retryWrites=true&w=majority
   JWT_SECRET=your_super_secure_jwt_secret_key_here_change_in_production
   PORT=5000
   NODE_ENV=development
   CORS_ORIGIN=http://localhost:3000
   ```

   - Get MongoDB URI from [MongoDB Atlas](https://cloud.mongodb.com/)
   - Generate a strong JWT secret (use online generators or `openssl rand -base64 32`)

2. **Frontend Environment (optional):**
   Create `frontend/.env` file:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```
   (Defaults to localhost:5000 if not set)

### Running the Application

1. **Start Backend:**
   ```bash
   cd backend
   npm start
   ```
   Server runs on `http://localhost:5000`

2. **Start Frontend:**
   ```bash
   cd frontend
   npm start
   ```
   App opens at `http://localhost:3000`

### Sample Data

The application automatically seeds sample data on first startup:
- **Admin User**: `admin@example.com` / `password123`
- **Staff User**: `staff@example.com` / `password123`
- Sample categories, suppliers, products, and orders

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Dashboard (Authenticated)
- `GET /api/dashboard/stats` - Dashboard statistics
- `GET /api/dashboard/recent-orders` - Recent orders
- `GET /api/dashboard/recent-products` - Recent products

### Products (Admin: Full CRUD, Staff: Read)
- `GET /api/products` - List products
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Categories (Admin: Full CRUD, Staff: Read)
- `GET /api/categories` - List categories
- `POST /api/categories` - Create category (Admin)
- `PUT /api/categories/:id` - Update category (Admin)
- `DELETE /api/categories/:id` - Delete category (Admin)

### Suppliers (Admin: Full CRUD, Staff: Read)
- `GET /api/suppliers` - List suppliers
- `POST /api/suppliers` - Create supplier (Admin)
- `PUT /api/suppliers/:id` - Update supplier (Admin)
- `DELETE /api/suppliers/:id` - Delete supplier (Admin)

### Orders (Admin: Full CRUD, Staff: Read)
- `GET /api/orders` - List orders
- `POST /api/orders` - Create order (Admin)
- `PUT /api/orders/:id` - Update order status (Admin)
- `DELETE /api/orders/:id` - Delete order (Admin)

### Users (Admin Only)
- `GET /api/users` - List users
- `POST /api/users` - Create user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## Testing the Setup

1. **Health Check:**
   ```bash
   curl http://localhost:5000/api/health
   ```

2. **Login Test:**
   ```bash
   curl -X POST http://localhost:5000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"admin@example.com","password":"password123"}'
   ```

3. **Protected Route Test:**
   ```bash
   TOKEN=$(curl -s -X POST http://localhost:5000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"admin@example.com","password":"password123"}' | jq -r .token)
   
   curl -H "Authorization: Bearer $TOKEN" http://localhost:5000/api/dashboard/stats
   ```

## Deployment

### Backend Deployment
1. Set `NODE_ENV=production` in environment
2. Use a process manager like PM2: `npm install -g pm2 && pm2 start server.js`
3. Configure reverse proxy (nginx) for production

### Frontend Deployment
1. Build for production: `npm run build`
2. Serve static files from `build/` directory
3. Set `REACT_APP_API_URL` to production backend URL

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -am 'Add your feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Create a Pull Request

## License

This project is licensed under the MIT License.

## Support

For issues or questions, please open an issue on GitHub.

## Pushing to GitHub

1. **Initialize Git Repository:**
   ```bash
   git init
   ```

2. **Add all files:**
   ```bash
   git add .
   ```

3. **Commit changes:**
   ```bash
   git commit -m "Initial commit: MERN Inventory Management System"
   ```

4. **Create GitHub Repository:**
   - Go to [GitHub.com](https://github.com) and create a new repository
   - Don't initialize with README, .gitignore, or license (already have them)

5. **Add remote origin:**
   ```bash
   git remote add origin https://github.com/yourusername/your-repo-name.git
   ```

6. **Push to GitHub:**
   ```bash
   git branch -M main
   git push -u origin main
   ```

7. **Verify:**
   - Check your GitHub repository to ensure all files are uploaded
   - The `.env` files are ignored by `.gitignore`, so sensitive data won't be exposed

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
