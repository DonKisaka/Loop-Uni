export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const TOKEN_KEY = 'session';
export const TOKEN_EXPIRY_KEY = 'session_expiry';

export const API_ENDPOINTS = {
  AUTH: {
    SIGNIN: '/auth/login',
    SIGNUP: '/auth/register',
    ME: '/auth/me',
  },
  PRODUCTS: {
    LIST: '/products',
    CREATE: '/products',
    GET: (id: string) => `/products/${id}`,
    UPDATE: (id: string) => `/products/${id}`,
    DELETE: (id: string) => `/products/${id}`,
  },
};

