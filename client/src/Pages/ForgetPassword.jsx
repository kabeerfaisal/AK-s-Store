import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/AuthHook';
import { useState } from 'react';

function ForgotPasswordPage() {
    
    const [email, setEmail] = useState('');

    const { handleForgetPassword, loading, error, message, setMessage} = useAuth();

   const handleSubmit = async (e) => {
        e.preventDefault();

         if (!email) {
            // alert("Please enter your email");
            setMessage("Please enter your email");
            return;
        }

        await handleForgetPassword(email);
        
    }

    return (
        <div className="flex min-h-screen bg-[#FAF8F5] items-center justify-center px-4 py-12">
            <div className="w-full max-w-md bg-white p-8 rounded-xl border border-[#E8DFD1] shadow-xl">

                {/* Logo */}
                <div className="h-10 w-fit p-2 bg-[#8C1515] rounded-lg flex items-center justify-center mb-6 mx-auto shadow-sm">
                    <span className="text-white font-bold text-lg">AK'S STORE</span>
                </div>

                <h2 className="text-2xl font-bold text-[#8C1515] text-center">Forgot Password?</h2>
                <p className="text-sm text-gray-500 text-center mt-1 mb-6">
                    Enter your registered email address and we'll send you a link to reset your password.
                </p>

                {error && (
                    <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs text-center font-medium">
                        {error}
                    </div>
                )}

                {message ? (
                    <div className="text-center space-y-4 py-4">
                        <CheckCircle className="h-12 w-12 text-emerald-600 mx-auto" />
                        <p className="text-sm text-gray-700 font-medium">{message}</p>
                        <p className="text-xs text-gray-400">Please check your email inbox and spam folder.</p>

                        <Link
                            to="/login"
                            className="inline-flex items-center gap-2 mt-4 text-xs font-semibold text-[#8C1515] hover:underline"
                        >
                            <ArrowLeft className="h-4 w-4" /> Back to Login
                        </Link>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label htmlFor="email" className="block text-xs font-semibold text-gray-700 mb-1">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <Mail className="h-4 w-4 text-gray-400" />
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    className="w-full rounded-lg border border-[#E8DFD1] py-2.5 pl-9 pr-3 text-sm text-gray-900 focus:border-[#8C1515] focus:outline-none focus:ring-1 focus:ring-[#8C1515]"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-lg bg-[#8C1515] py-2.5 text-sm font-semibold text-white hover:bg-[#701010] transition-colors disabled:opacity-50"
                        >
                            {loading ? 'Sending Reset Link...' : 'Send Reset Link'}
                        </button>

                        <div className="text-center pt-2">
                            <Link
                                to="/login"
                                className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-[#8C1515] transition-colors"
                            >
                                <ArrowLeft className="h-3.5 w-3.5" /> Back to Login
                            </Link>
                        </div>
                    </form>
                )}

            </div>
        </div>
    );
}

export default ForgotPasswordPage;