import React, { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Lock, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { useAuth } from '../hooks/AuthHook';
// import { useResetPassword } from '../hooks/useResetPassword'; // <--- Custom Hook Import

function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Hook Consumption
  const { loading, error, handleResetPassword, message } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Token ki type aur value:", typeof token, token);

    console.log('New Password:', newPassword);
    console.log('Confirm Password:', confirmPassword);
    const success = await handleResetPassword({ token, newPassword, confirmPassword });
    
    if (success) {
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white p-8 rounded-xl border border-[#E8DFD1] shadow-xl">
        
        {/* Logo */}
        <div className="h-10 w-fit p-2 bg-[#8C1515] rounded-lg flex items-center justify-center mb-6 mx-auto shadow-sm">
          <span className="text-white font-bold text-lg">AK'S STORE</span>
        </div>

        {message ? (
          <div className="text-center space-y-4 py-4">
            <CheckCircle className="h-12 w-12 text-emerald-600 mx-auto animate-bounce" />
            <h2 className="text-2xl font-bold text-[#8C1515]">Password Updated!</h2>
            <p className="text-sm text-gray-600">
              Your password has been reset successfully. Redirecting to login page...
            </p>
            <Link 
              to="/login"
              className="inline-block mt-2 text-xs font-semibold text-[#8C1515] underline"
            >
              Click here if you are not redirected automatically
            </Link>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-[#8C1515] text-center">Set New Password</h2>
            <p className="text-sm text-gray-500 text-center mt-1 mb-6">
              Enter your new password below to update your credentials.
            </p>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs text-center font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* New Password */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">New Password</label>
                <div className="relative">
                  <Lock className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-lg border border-[#E8DFD1] py-2.5 pl-9 pr-9 text-sm text-gray-900 focus:border-[#8C1515] focus:outline-none focus:ring-1 focus:ring-[#8C1515]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Confirm Password</label>
                <div className="relative">
                  <Lock className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-lg border border-[#E8DFD1] py-2.5 pl-9 pr-9 text-sm text-gray-900 focus:border-[#8C1515] focus:outline-none focus:ring-1 focus:ring-[#8C1515]"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 rounded-lg bg-[#8C1515] py-2.5 text-sm font-semibold text-white hover:bg-[#701010] transition-colors disabled:opacity-50"
              >
                {loading ? 'Updating Password...' : 'Reset Password'}
              </button>
            </form>
          </>
        )}

      </div>
    </div>
  );
}

export default ResetPasswordPage;