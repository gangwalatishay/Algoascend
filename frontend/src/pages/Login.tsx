import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    countryCode: '+91',
    mobileNumber: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const countryCodes = [
    { code: '+91', name: 'India' },
    { code: '+1', name: 'USA/Canada' },
    { code: '+44', name: 'UK' },
    { code: '+61', name: 'Australia' },
    { code: '+971', name: 'UAE' },
    { code: '+65', name: 'Singapore' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getFullMobileNumber = () => `${formData.countryCode}${formData.mobileNumber}`;

  const isEmail = (val: string) => val.includes('@');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!formData.mobileNumber || !formData.password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    const identifier = isEmail(formData.mobileNumber)
      ? { email: formData.mobileNumber }
      : { mobile: getFullMobileNumber() };

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/auth/login', {
        ...identifier,
        password: formData.password
      });

      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('currentUser', JSON.stringify(user));

      alert('Login successful!');
      navigate('/');

    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.error || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialAuth = (provider: string) => {
    alert(`${provider} login/signup coming soon! Integration with OAuth required.`);
  };

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-zinc-100 rounded-3xl shadow-2xl overflow-hidden border border-zinc-800/50">
        <div className="p-8 md:p-10">
          <h2 className="text-3xl font-bold text-center text-zinc-900 mb-2">Welcome Back</h2>
          <p className="text-center text-zinc-500 mb-8 text-sm font-medium">Sign in to continue to your account</p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <button
              onClick={() => handleSocialAuth('Google')}
              className="flex items-center justify-center gap-2 py-3 px-4 bg-white border border-zinc-200 rounded-2xl hover:bg-zinc-50 transition-all shadow-sm font-bold text-zinc-700"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </button>
            <button
              onClick={() => handleSocialAuth('Apple')}
              className="flex items-center justify-center gap-2 py-3 px-4 bg-white border border-zinc-200 rounded-2xl hover:bg-zinc-50 transition-all shadow-sm font-bold text-zinc-700"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05 1.79-3.21 1.79-1.14 0-1.53-.71-2.84-.71-1.33 0-1.78.71-2.84.71-1.16 0-2.13-.76-3.21-1.79C2.73 18.15 1.5 14.53 1.5 11.23c0-3.32 2.15-5.07 4.2-5.07 1.1 0 2.11.41 2.82.41.68 0 1.91-.48 3.22-.48 1.38 0 2.62.53 3.4 1.55-2.85 1.71-2.39 5.56.51 6.84-1.01 2.45-2.48 4.71-3.6 5.8zM12.03 5.48c-.08-2.61 2.21-4.83 4.59-4.98.24 2.76-2.43 5.06-4.59 4.98z" /></svg>
              Apple
            </button>
          </div>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-zinc-100 text-zinc-400 font-bold">OR</span>
            </div>
          </div>

          {error && <div className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm text-center font-medium">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <div className="flex space-x-2">
                {!isEmail(formData.mobileNumber) && (
                  <select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleChange}
                    className="w-1/3 px-4 py-3.5 bg-white border border-zinc-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 text-zinc-900 appearance-none cursor-pointer transition-all shadow-sm font-medium"
                  >
                    {countryCodes.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.code} ({c.name})
                      </option>
                    ))}
                  </select>
                )}
                <input
                  type="text"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  className={`${isEmail(formData.mobileNumber) ? 'w-full' : 'w-2/3'} px-5 py-3.5 bg-white border border-zinc-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 text-zinc-900 placeholder-zinc-400 transition-all shadow-sm`}
                  placeholder="Email or Mobile"
                />
              </div>
            </div>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-5 py-3.5 bg-white border border-zinc-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 text-zinc-900 placeholder-zinc-400 transition-all shadow-sm"
              placeholder="Password"
            />

            <div className="flex justify-end">
              <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline font-medium">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white font-bold py-4.5 px-4 rounded-2xl hover:bg-blue-700 transition duration-300 shadow-xl shadow-blue-600/30 mt-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </form>

          <p className="mt-10 text-center text-sm text-zinc-500 font-medium">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-600 hover:underline font-bold">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
