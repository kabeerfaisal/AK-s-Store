import React, { useContext, useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthHook';
import AuthComponent from '../Components/user/AuthComponent';

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const {handleLogin, loading, error, user} = useAuth();

  function handleSubmit(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    handleLogin({ email, password });
    localStorage.setItem('email', email);
    console.log('user login', user)
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
                  <Link to="/forgot-password" className="font-semibold text-[#D97706] hover:text-[#B45309] transition-colors">
                    Forgot password?
                  </Link>
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
          
            <AuthComponent/>

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