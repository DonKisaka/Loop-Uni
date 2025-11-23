import { z } from 'zod';

// Schemas
export const registerSchema = z.object({
  email: z.string().email('Invalid email address').refine(email => email.endsWith('@daystar.ac.ke'), {
    message: 'Email must be a valid Daystar University email (@daystar.ac.ke)',
  }),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  studentId: z.string().optional(),
  phoneNumber: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address').refine(email => email.endsWith('@daystar.ac.ke'), {
    message: 'Email must be a valid Daystar University email (@daystar.ac.ke)',
  }),
  password: z.string().min(1, 'Password is required'),
});

export const productSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(100, 'Title cannot exceed 100 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters').max(1000, 'Description cannot exceed 1000 characters'),
  category: z.enum(['Electronics', 'Books', 'Clothing', 'Furniture', 'Sports', 'Other'], { message: 'Invalid category' }),
  price: z.number().positive('Price must be a positive number'),
  condition: z.enum(['New', 'Like New', 'Good', 'Fair'], { message: 'Invalid condition' }),
  location: z.string().min(1, 'Location is required'),
  images: z.array(z.string()).optional(),
});

// Validation middleware factory
export const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({ error: error.errors });
  }
};
