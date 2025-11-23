import { z } from 'zod';


// Sign In Schema
export const SignInSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email format')
    .refine((email) => email.endsWith('@daystar.ac.ke'), {
      message: 'Must be a valid Daystar University email (@daystar.ac.ke)'
    }),
  password: z.string().min(1, 'Password is required'),
});

// Sign Up Schema
export const SignUpSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email format')
    .refine((email) => email.endsWith('@daystar.ac.ke'), {
      message: 'Must be a valid Daystar University email (@daystar.ac.ke)'
    }),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export type SignInInput = z.infer<typeof SignInSchema>;
export type SignUpInput = z.infer<typeof SignUpSchema>;

