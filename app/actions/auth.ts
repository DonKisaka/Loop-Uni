'use server';

import { redirect } from 'next/navigation';
import axios from 'axios';
import { SignInSchema, SignUpSchema } from '@/lib/validations/auth';
import { createSession, deleteSession } from '@/lib/session';
import { ActionResponse, AuthenticationResponse } from '@/lib/types/auth';
import { API_BASE_URL, API_ENDPOINTS } from '@/lib/utils/constants';
import { getSession } from '@/lib/session';

export const signIn = async (formData: FormData): Promise<ActionResponse> => {
  try {
    const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    const validationResult = SignInSchema.safeParse(data);

    if (!validationResult.success) {
      return {
        success: false,
        message: 'Validation failed',
        errors: validationResult.error.flatten().fieldErrors,
      };
    }

    const response = await axios.post<AuthenticationResponse>(
      `${API_BASE_URL}${API_ENDPOINTS.AUTH.SIGNIN}`,
      {
        email: data.email,
        password: data.password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.data.token) {
      await deleteSession();
      await createSession(response.data.token, 86400);
    }

    return {
      success: true,
      message: 'Signed in successfully',
    };

  } catch (e) {
    console.error(e);
    const error = e as { response?: { data?: { error?: string } } };
    const errorMessage = error.response?.data?.error || 'Authentication failed';
    return {
      success: false,
      message: errorMessage,
      error: 'Something bad happened',
    };
  }
}


export const signUp = async (formData: FormData): Promise<ActionResponse> => {
  try {
    const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string,
    };

    const validationResult = SignUpSchema.safeParse(data);
    if (!validationResult.success) {
      return {
        success: false,
        message: 'Validation failed',
        errors: validationResult.error.flatten().fieldErrors,
      };
    }

    const response = await axios.post<AuthenticationResponse>(
      `${API_BASE_URL}${API_ENDPOINTS.AUTH.SIGNUP}`,
      {
        email: data.email,
        password: data.password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.data.token) {
      await deleteSession();
      await createSession(response.data.token, 86400);
    }

    return {
      success: true,
      message: 'Account created successfully',
    };
  } catch (e) {
    console.error(e);
    const error = e as { response?: { data?: { error?: string } } };
    const errorMessage = error.response?.data?.error || 'Registration failed';
    return { success: false, message: errorMessage, error: 'Something bad happened' };
  }
}

export const signOut = async (): Promise<void> => {
  try {
    await deleteSession();
  } catch (error) {
    console.error('Sign out error:', error);
    throw new Error('Failed to sign out');
  } finally {
    redirect('/signin');
  } 
}


export async function checkAuth(): Promise<boolean> {
  try {
    const token = await getSession();
    return token !== null;
  } catch (error) {
    console.error('Check auth error:', error);
    return false;
  }
}

export async function getCurrentUser() {
  const { getCurrentUser: getUser } = await import('@/lib/session');
  return await getUser();
}

