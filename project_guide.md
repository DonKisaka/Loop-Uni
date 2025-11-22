# Daystar Student Marketplace - Project Documentation

## 📋 Project Overview

A student-exclusive marketplace platform for Daystar University students to exchange pre-loved goods within a trusted, user-verified community. This platform promotes sustainability and fosters a circular economy within the student community.

**Inspiration**: [Empor.ca](https://www.empor.ca/)

---

## 🛠 Tech Stack

- **Frontend**: Next.js and Shadcn
- **Backend**: Node.js + Express.js
- **Database**: MongoDB
- **Authentication**: Next.js Server Actions + JWT
- **Validation**: Zod (for form validation)

---

## 📁 Project Structure

```
daystar-marketplace/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Product.js
│   │   │   └── Transaction.js
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   ├── products.js
│   │   │   └── users.js
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   └── validation.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── productController.js
│   │   │   └── userController.js
│   │   └── server.js
│   ├── .env
│   ├── .gitignore
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── app/
    │   │   ├── (auth)/
    │   │   │   ├── login/
    │   │   │   └── register/
    │   │   ├── (dashboard)/
    │   │   │   ├── marketplace/
    │   │   │   ├── my-listings/
    │   │   │   └── profile/
    │   │   ├── api/
    │   │   ├── layout.js
    │   │   └── page.js
    │   ├── components/
    │   │   ├── auth/
    │   │   ├── products/
    │   │   └── ui/
    │   ├── lib/
    │   │   ├── actions/
    │   │   │   ├── auth.js
    │   │   │   └── products.js
    │   │   ├── validations/
    │   │   └── utils.js
    │   └── styles/
    ├── .env.local
    ├── .gitignore
    └── package.json
```

---

## 🚀 Getting Started

### 1. Initialize Git Repository

```bash
# Create main project directory
mkdir daystar-marketplace
cd daystar-marketplace

# Initialize git
git init

# Create .gitignore
cat > .gitignore << EOL
node_modules/
.env
.env.local
.next/
dist/
build/
*.log
.DS_Store
EOL

# Initial commit
git add .
git commit -m "Initial commit: Project structure"

# Link to GitHub
git remote add origin https://github.com/YOUR_USERNAME/daystar-marketplace.git
git branch -M main
git push -u origin main
```

### 2. Backend Setup

```bash
# Create backend directory
mkdir backend
cd backend

# Initialize Node.js project
npm init -y

# Install dependencies
npm install express mongoose dotenv cors bcryptjs jsonwebtoken
npm install --save-dev nodemon

# Create .env file
cat > .env << EOL
PORT=5000
MONGODB_URI=mongodb://localhost:27017/daystar-marketplace
JWT_SECRET=your_super_secret_jwt_key_change_in_production
NODE_ENV=development
EOL
```

### 3. Frontend Setup

```bash
# From project root
npx create-next-app@latest frontend

# Choose these options:
# ✔ TypeScript? No
# ✔ ESLint? Yes
# ✔ Tailwind CSS? Yes
# ✔ src/ directory? Yes
# ✔ App Router? Yes
# ✔ Import alias? Yes (@/*)

cd frontend

# Install additional dependencies
npm install zod react-hook-form @hookform/resolvers axios

# Create .env.local
cat > .env.local << EOL
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXTAUTH_SECRET=your_nextauth_secret_key
NEXTAUTH_URL=http://localhost:3000
EOL
```

---

## 🗄 Database Models

### User Model
```javascript
{
  email: String (unique, required, @daystar.ac.ke domain),
  password: String (hashed),
  firstName: String,
  lastName: String,
  studentId: String,
  phoneNumber: String,
  isVerified: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Product Model
```javascript
{
  title: String,
  description: String,
  category: String (enum),
  price: Number,
  condition: String (enum: 'New', 'Like New', 'Good', 'Fair'),
  images: [String],
  seller: ObjectId (ref: User),
  status: String (enum: 'available', 'sold', 'reserved'),
  location: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Transaction Model
```javascript
{
  product: ObjectId (ref: Product),
  buyer: ObjectId (ref: User),
  seller: ObjectId (ref: User),
  status: String (enum: 'pending', 'completed', 'cancelled'),
  createdAt: Date,
  completedAt: Date
}
```

---

## 🔌 REST API Endpoints

### Authentication Endpoints
```
POST   /api/auth/register          - Register new user
POST   /api/auth/login             - Login user
POST   /api/auth/logout            - Logout user
GET    /api/auth/me                - Get current user
POST   /api/auth/verify-email      - Verify student email
```

### Product Endpoints
```
GET    /api/products               - Get all products (with filters)
GET    /api/products/:id           - Get single product
POST   /api/products               - Create new product (auth required)
PUT    /api/products/:id           - Update product (auth required)
DELETE /api/products/:id           - Delete product (auth required)
GET    /api/products/user/:userId  - Get user's products
```

### User Endpoints
```
GET    /api/users/profile          - Get user profile (auth required)
PUT    /api/users/profile          - Update user profile (auth required)
GET    /api/users/:id/listings     - Get user's listings
```

### Transaction Endpoints
```
POST   /api/transactions           - Create transaction (auth required)
GET    /api/transactions/buyer     - Get buyer transactions (auth required)
GET    /api/transactions/seller    - Get seller transactions (auth required)
PATCH  /api/transactions/:id       - Update transaction status (auth required)
```

---

## 🔐 Authentication Flow

1. **Registration**:
   - Validate email format (must be @daystar.ac.ke)
   - Hash password with bcrypt
   - Create user in database
   - Send verification email (optional)

2. **Login**:
   - Validate credentials
   - Generate JWT token
   - Return token + user data

3. **Protected Routes**:
   - Verify JWT token in middleware
   - Attach user to request object

---

## 📝 Next.js Server Actions

### Auth Actions (`src/lib/actions/auth.js`)

```javascript
'use server'

import { z } from 'zod'

// Email validation schema
const emailSchema = z.string()
  .email()
  .refine((email) => email.endsWith('@daystar.ac.ke'), {
    message: 'Must be a valid Daystar University email'
  })

// Register action
export async function registerUser(formData) {
  // Validate and process registration
}

// Login action
export async function loginUser(formData) {
  // Validate and process login
}
```

### Product Actions (`src/lib/actions/products.js`)

```javascript
'use server'

// Create product
export async function createProduct(formData) {
  // Validate and create product
}

// Update product
export async function updateProduct(id, formData) {
  // Validate and update product
}
```

---

## ✅ Form Validation with Zod

### Registration Schema
```javascript
const registerSchema = z.object({
  email: z.string()
    .email()
    .refine((email) => email.endsWith('@daystar.ac.ke')),
  password: z.string().min(8),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  studentId: z.string().regex(/^\d{6}$/),
  phoneNumber: z.string().optional()
})
```

### Product Schema
```javascript
const productSchema = z.object({
  title: z.string().min(5).max(100),
  description: z.string().min(20).max(1000),
  category: z.enum(['Electronics', 'Books', 'Clothing', 'Furniture', 'Other']),
  price: z.number().positive(),
  condition: z.enum(['New', 'Like New', 'Good', 'Fair']),
  location: z.string()
})
```

---

## 🎨 Key Features to Implement

- [ ] User authentication with Daystar email verification
- [ ] Product listing creation with image upload
- [ ] Search and filter products by category, price, condition
- [ ] User profile with listings history
- [ ] Messaging system between buyers and sellers
- [ ] Transaction management
- [ ] Product reservation system
- [ ] Rating and review system
- [ ] Responsive design for mobile and desktop

---

## 🔒 Security Considerations

1. **Email Validation**: Only @daystar.ac.ke emails allowed
2. **Password Hashing**: Use bcrypt with salt rounds
3. **JWT Tokens**: Set appropriate expiration times
4. **Input Validation**: Validate all inputs on both client and server
5. **CORS**: Configure properly for production
6. **Rate Limiting**: Implement to prevent abuse
7. **Image Upload**: Validate file types and sizes

---

## 📦 Development Workflow

```bash
# Start backend (from backend directory)
npm run dev

# Start frontend (from frontend directory)
npm run dev

# Access application
Frontend: http://localhost:3000
Backend API: http://localhost:5000/api
```

---

## 🧪 Testing Checklist

- [ ] User registration with valid Daystar email
- [ ] User registration rejection with non-Daystar email
- [ ] User login and logout
- [ ] Create product listing
- [ ] Edit own product listing
- [ ] Delete own product listing
- [ ] View all products
- [ ] Search and filter products
- [ ] Protected routes redirect to login

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Zod Documentation](https://zod.dev/)
- [JWT Best Practices](https://jwt.io/introduction)

---

## 🤝 Contributing

This is a school project for Daystar University's Internet Applications Design and Development unit.

---

## 📄 License

Educational Project - Daystar University

---

## 📧 Contact

For questions about this project, contact your course instructor.

---

**Last Updated**: November 2025