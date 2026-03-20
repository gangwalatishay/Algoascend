import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import loginIllustration from '../assets/LMS.png';
import TwilioOtp from '../components/TwilioOtp';

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    countryCode: '+91',
    mobileNumber: '',
    institution: '',
    batchYear: '',
    userType: 'student',
    companyName: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [showOtpVerification, setShowOtpVerification] = useState(false);

  const countryCodes = [
    { code: '+91', name: 'India' },
    { code: '+1', name: 'USA/Canada' },
    { code: '+44', name: 'UK' },
    { code: '+61', name: 'Australia' },
    { code: '+971', name: 'UAE' },
    { code: '+65', name: 'Singapore' },
  ];

  const batchYears = Array.from({ length: 16 }, (_, i) => 2020 + i);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getFullMobileNumber = () => `${formData.countryCode}${formData.mobileNumber}`;

  const validate = () => {
    const fullMobile = getFullMobileNumber();
    if (!formData.fullName || !formData.email || !formData.password || !formData.mobileNumber) {
      return 'Basic fields are required';
    }

    if (!isPhoneVerified) {
      return 'Please verify your mobile number via OTP';
    }

    if (formData.userType === 'student') {
      if (!formData.institution || !formData.batchYear) {
        return 'Institution and Batch Year are required for students';
      }
    } else if (formData.userType === 'professional') {
      if (!formData.companyName) {
        return 'Organization name is required for professionals';
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return 'Invalid email format';
    }

    const mobileRegex = /^\+\d{10,15}$/;
    if (!mobileRegex.test(fullMobile)) {
      return 'Invalid mobile number format';
    }
    if (formData.password.length < 6) {
      return 'Password must be at least 6 characters';
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    const fullMobile = getFullMobileNumber();
    setLoading(true);

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/auth/signup', {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        mobile: fullMobile,
        role: formData.userType,
        institution: formData.institution,
        batchYear: formData.batchYear,
        companyName: formData.userType === 'professional' ? formData.companyName : ''
      });

      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('currentUser', JSON.stringify(user));

      setSuccess('Account created successfully!');

      setTimeout(() => {
        navigate('/');
      }, 1500);

    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.error || 'An error occurred during signup. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = () => {
    window.location.href = 'http://127.0.0.1:5000/api/auth/google';
  };

  const handleAppleAuth = () => {
    window.location.href = 'http://127.0.0.1:5000/api/auth/apple';
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-2">
          <div className="text-white font-bold text-xl">
            <span className="text-blue-500">ALGO</span>ASCEND<span className="text-xs">.in</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/cart" className="text-white hover:text-gray-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </Link>
          <Link to="/login" className="px-6 py-2 border border-gray-600 text-white rounded-lg hover:bg-gray-800 transition">
            Login
          </Link>
          <Link to="/signup" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Side - Hero Section */}
        <div className="hidden lg:flex flex-1 flex-col justify-center px-16 py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Empowering minds to<br />
            learn, grow, and succeed.<br />
            <span className="text-blue-500">— AlgoAscend</span>
          </h1>

          {/* Illustration */}
          <div className="relative mt-8 flex items-center justify-center">
            <img 
              src={loginIllustration} 
              alt="Login Illustration" 
              className="max-w-full h-auto rounded-3xl"
            />
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="flex-1 flex items-center justify-center px-8 py-12 overflow-y-auto">
          <div className="w-full max-w-md bg-[#1a1a2e]/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-800">
            <h2 className="text-3xl font-bold text-center text-white mb-2">Create Your Account</h2>
            <p className="text-center text-gray-400 mb-6">Start your learning journey today.</p>

            {error && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-300 px-4 py-3 rounded-xl mb-4 text-sm text-center">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-green-500/20 border border-green-500/50 text-green-300 px-4 py-3 rounded-xl mb-4 text-sm text-center">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-white text-sm mb-1.5">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#0f0f1a] border border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 text-white placeholder-gray-500 transition-all text-sm"
                  placeholder="Full Name"
                />
              </div>

              <div>
                <label className="block text-white text-sm mb-1.5">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#0f0f1a] border border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 text-white placeholder-gray-500 transition-all text-sm"
                  placeholder="Email Address"
                />
              </div>

              <div>
                <label className="block text-white text-sm mb-1.5">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#0f0f1a] border border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 text-white placeholder-gray-500 transition-all text-sm"
                  placeholder="Password"
                />
              </div>

              <div>
                <label className="block text-white text-sm mb-1.5">Mobile Number</label>
                <div className="flex space-x-2">
                  <select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleChange}
                    disabled={isPhoneVerified}
                    className="w-1/3 px-3 py-3 bg-[#0f0f1a] border border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 text-white text-sm disabled:opacity-50"
                  >
                    {countryCodes.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.code} ({c.name})
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    disabled={isPhoneVerified}
                    className="w-2/3 px-4 py-3 bg-[#0f0f1a] border border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 text-white placeholder-gray-500 text-sm disabled:opacity-50"
                    placeholder="Mobile Number"
                  />
                </div>
              </div>

              {!isPhoneVerified && formData.mobileNumber.length >= 10 && (
                <div className="mt-2">
                  {!showOtpVerification ? (
                    <button
                      type="button"
                      onClick={() => setShowOtpVerification(true)}
                      className="text-xs text-blue-500 hover:text-blue-400 font-medium"
                    >
                      Verify Mobile Number with OTP
                    </button>
                  ) : (
                    <div className="bg-[#0f0f1a]/50 p-4 rounded-xl border border-gray-800">
                      <TwilioOtp 
                        phoneNumber={getFullMobileNumber()} 
                        onVerificationSuccess={() => {
                          setIsPhoneVerified(true);
                          setShowOtpVerification(false);
                          setSuccess('Mobile number verified successfully!');
                          setTimeout(() => setSuccess(''), 3000);
                        }} 
                      />
                    </div>
                  )}
                </div>
              )}

              {isPhoneVerified && (
                <div className="flex items-center gap-2 text-green-500 text-xs mt-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Verified
                </div>
              )}

              {/* User Type Toggle */}
              <div className="flex bg-[#0f0f1a] p-1 rounded-xl">
                <label className={`flex-1 cursor-pointer py-2.5 rounded-lg text-center text-sm font-medium transition-all ${formData.userType === 'student' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-gray-200'}`}>
                  <input type="radio" name="userType" value="student" checked={formData.userType === 'student'} onChange={handleChange} className="hidden" />
                  Student
                </label>
                <label className={`flex-1 cursor-pointer py-2.5 rounded-lg text-center text-sm font-medium transition-all ${formData.userType === 'professional' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-gray-200'}`}>
                  <input type="radio" name="userType" value="professional" checked={formData.userType === 'professional'} onChange={handleChange} className="hidden" />
                  Professional
                </label>
              </div>

              {formData.userType === 'student' ? (
                <>
                  <div>
                    <label className="block text-white text-sm mb-1.5">Institution Name</label>
                    <input
                      type="text"
                      name="institution"
                      value={formData.institution}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#0f0f1a] border border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 text-white placeholder-gray-500 text-sm"
                      placeholder="Institution Name"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm mb-1.5">Batch / Passing Year</label>
                    <select
                      name="batchYear"
                      value={formData.batchYear}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#0f0f1a] border border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 text-white text-sm"
                    >
                      <option value="">Select Year</option>
                      {batchYears.map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                </>
              ) : (
                <div>
                  <label className="block text-white text-sm mb-1.5">Organization / Company Name</label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#0f0f1a] border border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 text-white placeholder-gray-500 text-sm"
                    placeholder="Organization / Company Name"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white font-semibold py-3.5 rounded-xl hover:bg-blue-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              >
                {loading ? 'Creating account...' : 'Sign Up'}
              </button>
            </form>

            <div className="mt-4 text-center">
              <span className="text-gray-500 text-sm">Or signup with</span>
            </div>

            <div className="flex flex-col gap-3 mt-3">
              <button
                onClick={handleGoogleAuth}
                className="w-full flex items-center justify-center gap-3 py-3 bg-[#0f0f1a] border border-gray-700 rounded-xl hover:bg-gray-800 transition-all text-white text-sm"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Continue with Google
              </button>

              <button
                onClick={handleAppleAuth}
                className="w-full flex items-center justify-center gap-3 py-3 bg-[#0f0f1a] border border-gray-700 rounded-xl hover:bg-gray-800 transition-all text-white text-sm"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05 1.79-3.32 1.79-1.24 0-1.63-.78-3.13-.78-1.5 0-1.95.76-3.13.78-1.24.02-2.25-.8-3.32-1.79C1.96 18.25 1 14.8 1 12.06c0-4.32 2.83-6.61 5.58-6.61 1.45 0 2.65.92 3.53.92.85 0 2.2-.95 3.8-.95 1.1 0 2.3.43 3.05 1.1-3.13 1.83-2.6 6.38.75 8.16-.7 1.83-1.63 3.65-3.05 5.6M12.03 5.07c.83-1.04 1.39-2.48 1.39-3.92 0-.2-.02-.41-.05-.62-1.3.05-2.88.87-3.82 1.97-.84.97-1.58 2.44-1.58 3.86 0 .23.03.45.08.64 1.45-.11 2.9-.89 3.98-1.93z" />
                </svg>
                Continue with Apple
              </button>
            </div>

            <p className="mt-4 text-center text-gray-400 text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-400 hover:text-blue-300">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
