import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { SocialLoginButton } from './SocialLoginButton';

interface LoginFormData {
  email: string;
  password: string;
}

export const LoginForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<LoginFormData>({
    mode: 'onChange'
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Login attempt:', data);
      // Handle successful login here
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: 'google' | 'facebook') => {
    console.log(`Social login with ${provider}`);
    // Implement social login logic here
  };

  const handleSignUpClick = () => {
    console.log('Navigate to sign up');
    // Implement navigation to sign up page
  };

  return (
    <section className="relative bg-[rgba(45,45,45,1)] flex w-full max-w-[365px] flex-col items-stretch text-sm text-[rgba(203,203,203,1)] font-medium mt-[115px] px-[47px] py-[38px] rounded-[20px]">
      <header className="text-center">
        <h1 className="text-[rgba(94,173,237,1)] text-[34px] leading-none ml-[53px]">
          <span style={{fontWeight: 600, color: 'rgba(235,235,235,1)'}}>Wav</span>
          <span style={{fontWeight: 600, color: 'rgba(94,173,237,1)'}}>e</span>
        </h1>
        <h2 className="text-[rgba(235,235,235,1)] text-[34px] leading-none self-center ml-[21px] mt-1.5">
          <span style={{fontWeight: 600}}>S</span>
          <span style={{fontWeight: 600, color: 'rgba(94,173,237,1)'}}>e</span>
          <span style={{fontWeight: 600}}>arch</span>
        </h2>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col" noValidate>
        <div className="mt-[43px]">
          <label htmlFor="email" className="sr-only">Email address</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            autoComplete="email"
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className="bg-[rgba(65,65,65,1)] flex w-full flex-col whitespace-nowrap justify-center px-[18px] py-3.5 rounded-[15px] text-[rgba(203,203,203,1)] placeholder-[rgba(203,203,203,1)] border-none outline-none focus:ring-2 focus:ring-[rgba(94,173,237,1)] transition-all duration-200"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
          />
          {errors.email && (
            <p id="email-error" className="text-red-400 text-xs mt-1 px-[18px]" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="mt-2">
          <label htmlFor="password" className="sr-only">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            aria-invalid={errors.password ? 'true' : 'false'}
            aria-describedby={errors.password ? 'password-error' : undefined}
            className="bg-[rgba(65,65,65,1)] flex w-full flex-col whitespace-nowrap justify-center px-[18px] py-3.5 rounded-[15px] text-[rgba(203,203,203,1)] placeholder-[rgba(203,203,203,1)] border-none outline-none focus:ring-2 focus:ring-[rgba(94,173,237,1)] transition-all duration-200"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters'
              }
            })}
          />
          {errors.password && (
            <p id="password-error" className="text-red-400 text-xs mt-1 px-[18px]" role="alert">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={!isValid || isLoading}
          className="bg-[rgba(94,173,237,1)] self-center flex flex-col items-center font-semibold justify-center mt-[27px] px-[70px] py-3.5 rounded-[15px] text-white hover:bg-[rgba(84,163,227,1)] active:bg-[rgba(74,153,217,1)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {isLoading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>

      <div className="flex flex-col items-center">
        <SocialLoginButton 
          provider="google" 
          onClick={() => handleSocialLogin('google')}
          disabled={isLoading}
        />
        <SocialLoginButton 
          provider="facebook" 
          onClick={() => handleSocialLogin('facebook')}
          disabled={isLoading}
        />
      </div>

      <footer className="mt-[27px] text-center">
        <p>
          Don't have an account?{" "}
          <button
            type="button"
            onClick={handleSignUpClick}
            className="font-semibold text-[rgba(94,173,237,1)] hover:text-[rgba(84,163,227,1)] underline focus:outline-none focus:ring-2 focus:ring-[rgba(94,173,237,1)] rounded"
          >
            Sign up, it's free!
          </button>
        </p>
      </footer>
    </section>
  );
};
