'use client'

import { useActionState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormGroup,
  FormLabel,
  FormInput,
  FormError,
} from '@/components/ui/form'
import Link from 'next/link'
import toast from 'react-hot-toast'
import {signUp} from '@/app/actions/auth'
import {ActionResponse} from '@/lib/types/auth'
import { Mail, Lock, ArrowRight } from 'lucide-react'

const initialState: ActionResponse = {
  success: false,
  message: '',
  errors: undefined,
}

const SignUpPage = () => {
  const router = useRouter()
  const [state, formAction, isPending] = useActionState<ActionResponse, FormData>(async (prevState: ActionResponse, formData: FormData) => {
    try {
      const result = await signUp(formData)

      if (result.success) {
        toast.success('Signed up successfully')
        router.push('/dashboard')
        router.refresh()
      } else {
        toast.error(result.message)
      }

      return result

    } catch (err) {
      return {
        success: false,
        message: (err as Error).message || 'Something went wrong',
        errors: undefined,
      }
    }
  }, initialState)
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-50 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              LoopUni
            </h1>
          </Link>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Create your account
          </h2>
          <p className="text-gray-600">
            Start your journey with us today
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <Form action={formAction} className="space-y-5">
            {state?.message && !state.success && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                <FormError>{state.message}</FormError>
              </div>
            )}

            {/* Email Field */}
            <FormGroup>
              <FormLabel htmlFor="email" className="text-sm font-medium text-gray-700 mb-2 block">
                Email address
              </FormLabel>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <FormInput
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                    placeholder="your.name@daystar.ac.ke"
                  required
                  disabled={isPending}
                  aria-describedby="email-error"
                  className={`pl-10 h-12 block w-full rounded-lg border ${
                    state?.errors?.email 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500'
                  } shadow-sm transition-all duration-200 placeholder:text-gray-400`}
                />
              </div>
              {state?.errors?.email && (
                <p id="email-error" className="mt-1.5 text-sm text-red-600 animate-in fade-in slide-in-from-top-1 duration-200">
                  {state.errors.email[0]}
                </p>
              )}
            </FormGroup>

            {/* Password Field */}
            <FormGroup>
              <FormLabel htmlFor="password" className="text-sm font-medium text-gray-700 mb-2 block">
                Password
              </FormLabel>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <FormInput
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="••••••••"
                  required
                  disabled={isPending}
                  aria-describedby="password-error"
                  className={`pl-10 h-12 block w-full rounded-lg border ${
                    state?.errors?.password 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500'
                  } shadow-sm transition-all duration-200 placeholder:text-gray-400`}
                />
              </div>
              {state?.errors?.password && (
                <p id="password-error" className="mt-1.5 text-sm text-red-600 animate-in fade-in slide-in-from-top-1 duration-200">
                  {state.errors.password[0]}
                </p>
              )}
              {!state?.errors?.password && (
                <p className="mt-1.5 text-xs text-gray-500">
                  At least 6 characters
                </p>
              )}
            </FormGroup>

            {/* Confirm Password Field */}
            <FormGroup>
              <FormLabel htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 mb-2 block">
                Confirm password
              </FormLabel>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <FormInput
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  placeholder="••••••••"
                  required
                  disabled={isPending}
                  aria-describedby="confirmPassword-error"
                  className={`pl-10 h-12 block w-full rounded-lg border ${
                    state?.errors?.confirmPassword 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500'
                  } shadow-sm transition-all duration-200 placeholder:text-gray-400`}
                />
              </div>
              {state?.errors?.confirmPassword && (
                <p id="confirmPassword-error" className="mt-1.5 text-sm text-red-600 animate-in fade-in slide-in-from-top-1 duration-200">
                  {state.errors.confirmPassword[0]}
                </p>
              )}
            </FormGroup>

            {/* Submit Button */}
            <div className="pt-2">
              <Button 
                type="submit" 
                className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 transition-all duration-200 flex items-center justify-center gap-2" 
                isLoading={isPending}
              >
                {!isPending && (
                  <>
                    Create account
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </Button>
            </div>
          </Form>
        </div>

        {/* Sign in link */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link
            href="/signin"
            className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignUpPage
