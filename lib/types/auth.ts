export type ActionResponse =  {
    success: boolean;
    message: string;
    errors?: Record<string, string[]>;
    error?: string;
  };
  
  export interface AuthenticationResponse {
    token: string;
    email: string; 
  }
  
  export interface User {
    id: number;
    email: string;
  }
  
  export interface SignIn {
    email: string;
    password: string;
  }
  
  export interface Signup {
    email: string;
    password: string;
    confirmPassword: string;
  }
  
  