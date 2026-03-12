import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        if (!email) {
            setError('Please enter your email');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:5000/api/auth/forgot-password', {
                email
            });

            setSuccess(response.data.message || 'Password reset link sent to your email!');

            // In development, show the reset token
            if (response.data.resetToken) {
                console.log('Reset Token:', response.data.resetToken);
            }

            setTimeout(() => {
                navigate('/login');
            }, 3000);

        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.error || 'An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-zinc-100 rounded-3xl shadow-2xl overflow-hidden border border-zinc-800/50">
                <div className="p-8 md:p-10">
                    <h2 className="text-3xl font-bold text-center text-zinc-900 mb-2">Forgot Password</h2>
                    <p className="text-center text-zinc-500 mb-8 text-sm font-medium">
                        Enter your email and we'll send you a reset link
                    </p>

                    {error && <div className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm text-center font-medium">{error}</div>}
                    {success && <div className="bg-green-100 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-6 text-sm text-center font-medium">{success}</div>}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-5 py-3.5 bg-white border border-zinc-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 text-zinc-900 placeholder-zinc-400 transition-all shadow-sm"
                            placeholder="Enter your email address"
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white font-bold py-4.5 px-4 rounded-2xl hover:bg-blue-700 transition duration-300 shadow-xl shadow-blue-600/30 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Sending...' : 'Send Reset Link'}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-sm text-zinc-500 font-medium">
                        Remember your password?{' '}
                        <Link to="/login" className="text-blue-600 hover:underline font-bold">
                            Log In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
