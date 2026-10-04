import React, { useContext, useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { FaGithub, FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthHook';

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  let Navigate = useNavigate()
  const {handleLogin, loading, error} = useAuth();
  function guest() {
    Navigate('/')
    console.log("login as Guest Mode")
  }

  function handleSubmit(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    handleLogin({ email, password });
    localStorage.setItem('email', email);
  }
  

  return (
    <>
    <div className="flex min-h-screen bg-[#FAF8F5]">

      {/* Left Column - Form */}
      <div className="flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 lg:px-16 xl:px-24 bg-white shadow-xl border-r border-[#E8DFD1] z-10">
        <div className="mx-auto w-full max-w-sm">
          {/* Logo Placeholder */}
          <div className="h-10 w-fit p-2 bg-[#8C1515] rounded-lg flex items-center justify-center mb-8 shadow-sm">
            <span className="text-white font-bold text-xl">AK'S STORE</span>
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-[#8C1515]">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Please enter your details to sign in to your account.
          </p>
          {error && (
            <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs text-center font-medium">
              {error}
            </div>
          )}
          <div className="mt-8">
            <form className="space-y-5" onSubmit={handleSubmit}>

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="relative mt-2">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    // value={context.inputData}
                    // onChange={(e) => context.InputChange(e)}
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="block w-full rounded-lg border border-[#E8DFD1] py-2.5 pl-10 text-gray-900 placeholder-gray-400 focus:border-[#8C1515] focus:outline-none focus:ring-1 focus:ring-[#8C1515] sm:text-sm transition-shadow"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative mt-2">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-lg border border-[#E8DFD1] py-2.5 pl-10 pr-10 text-gray-900 placeholder-gray-400 focus:border-[#8C1515] focus:outline-none focus:ring-1 focus:ring-[#8C1515] sm:text-sm transition-shadow"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-[#8C1515] transition-colors" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-[#8C1515] transition-colors" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-[#E8DFD1] text-[#8C1515] focus:ring-[#8C1515]"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#forgot-password" className="font-semibold text-[#D97706] hover:text-[#B45309] transition-colors">
                    Forgot password?
                  </a>
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full justify-center rounded-lg bg-[#8C1515] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#701010] focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#8C1515] transition-all"
                >
                  {loading ? 'Signing in...' : 'Sign in'}
                </button>
              </div>

            </form>
            {/* Social Login Dividers */}
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-[#E8DFD1]" />
                </div>
                <div className="relative flex justify-center text-sm font-medium leading-6">
                  <span className="bg-white px-6 text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-4">
                <button type="button" className="flex w-full items-center justify-center gap-3 rounded-lg bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-[#E8DFD1] hover:bg-[#FAF8F5] transition-colors">
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  Google
                </button>
                <button type="button" className="flex w-full items-center justify-center gap-3 rounded-lg bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-[#E8DFD1] hover:bg-[#FAF8F5] transition-colors">
                  <FaGithub className="h-5 w-5" />
                  GitHub
                </button>
                <button onClick={(() => guest())} type="submit" className="flex w-full items-center justify-center gap-3 rounded-lg bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-[#E8DFD1] hover:bg-[#FAF8F5] transition-colors">
                  <FaUserCircle className="h-5 w-5" />
                  Guest
                </button>
              </div>
            </div>

            <p className="mt-10 text-center text-sm text-gray-500">
              Don't have an account?{' '}
              <Link to='/register' className="font-semibold leading-6 text-[#D97706] hover:text-[#B45309] transition-colors">
                Sign up for free
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Column - Branding */}
      <div className="relative hidden w-0 flex-1 lg:block bg-[#8C1515]">
        <div className="absolute inset-0 h-full w-full object-cover bg-linear-to-br from-[#8C1515] via-[#701010] to-[#4A0A0A]"></div>
        <div className="absolute inset-0 flex items-center justify-center px-16 xl:px-24">
          <div className="max-w-xl text-white">
            <h1 className="text-4xl font-bold tracking-tight mb-4 leading-tight text-[#FAF8F5]">
              Empower your workflow today.
            </h1>
            <p className="text-lg text-[#E8DFD1] mb-8">
              Join thousands of professionals who are transforming how they work. Access your dashboard to manage projects, track analytics, and collaborate seamlessly.
            </p>
            <div className="flex -space-x-4">
              <div className="w-10 h-10 rounded-full bg-[#E8DFD1] border-2 border-[#8C1515]"></div>
              <div className="w-10 h-10 rounded-full bg-[#D97706] border-2 border-[#8C1515]"></div>
              <div className="w-10 h-10 rounded-full bg-[#B45309] border-2 border-[#8C1515]"></div>
              <div className="w-10 h-10 rounded-full bg-[#FAF8F5] text-[#8C1515] flex items-center justify-center border-2 border-[#8C1515] text-xs font-bold shadow-sm">
                +2k
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
    </>
  );
}

export default LoginPage;