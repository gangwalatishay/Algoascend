import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import TwilioOtp from '@/components/TwilioOtp';

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
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);

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
    if (e.target.name === 'mobileNumber' || e.target.name === 'countryCode') {
      setIsPhoneVerified(false);
    }
  };

  const getFullMobileNumber = () => `${formData.countryCode}${formData.mobileNumber}`;

  const validate = () => {
    const fullMobile = getFullMobileNumber();
    if (!formData.fullName || !formData.email || !formData.password || !formData.mobileNumber) {
      return 'Basic fields are required';
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
    if (!isPhoneVerified) {
      return 'Please verify your phone number with OTP first';
    }
    return null;
  };

  const handleVerificationSuccess = () => {
    setIsPhoneVerified(true);
    setSuccess('Phone number verified successfully!');
    setError('');
  };

  const checkUserExists = () => {
    const fullMobile = getFullMobileNumber();
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    if (existingUsers.find((u: any) => u.email === formData.email)) {
      return 'User with this email already exists';
    }
    if (existingUsers.find((u: any) => u.mobile === fullMobile)) {
      return 'User with this mobile number already exists';
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

      setFormData({
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

      setTimeout(() => {
        navigate('/');
      }, 1500);

    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.error || 'An error occurred during signup. Please try again.');
    }
  };

  const handleSocialAuth = (provider: string) => {
    alert(`${provider} signup coming soon! Integration with OAuth required.`);
  };

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-zinc-100 rounded-3xl shadow-2xl overflow-hidden border border-zinc-800/50">
        <div className="p-8 md:p-10">
          <h2 className="text-3xl font-bold text-center text-zinc-900 mb-2">Sign Up</h2>
          <p className="text-center text-zinc-500 mb-8 text-sm font-medium">Create your account with Twilio Verify</p>

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
          {success && <div className="bg-green-100 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-6 text-sm text-center font-medium">{success}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-5 py-3.5 bg-white border border-zinc-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 text-zinc-900 placeholder-zinc-400 transition-all shadow-sm"
              placeholder="Full Name"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-5 py-3.5 bg-white border border-zinc-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 text-zinc-900 placeholder-zinc-400 transition-all shadow-sm"
              placeholder="Email Address"
            />

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-5 py-3.5 bg-white border border-zinc-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 text-zinc-900 placeholder-zinc-400 transition-all shadow-sm"
              placeholder="Password"
            />

            <div className="space-y-2">
              <div className="flex space-x-2">
                <select
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleChange}
                  className="w-1/3 px-4 py-3.5 bg-white border border-zinc-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 text-zinc-900 appearance-none cursor-pointer transition-all shadow-sm font-medium"
                  disabled={isPhoneVerified}
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
                  className="w-2/3 px-5 py-3.5 bg-white border border-zinc-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 text-zinc-900 placeholder-zinc-400 transition-all shadow-sm"
                  placeholder="Mobile Number"
                  disabled={isPhoneVerified}
                />
              </div>
              {!isPhoneVerified && formData.mobileNumber.length >= 8 && (
                <div className="mt-2">
                  {(() => {
                    const userExistsError = checkUserExists();
                    if (userExistsError) {
                      return (
                        <div className="text-red-500 text-xs font-bold px-2">
                          {userExistsError}
                        </div>
                      );
                    }
                    return (
                      <TwilioOtp
                        phoneNumber={getFullMobileNumber()}
                        onVerificationSuccess={handleVerificationSuccess}
                      />
                    );
                  })()}
                </div>
              )}
              {isPhoneVerified && (
                <div className="text-green-600 text-xs font-bold px-2 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                  Phone Verified
                </div>
              )}
            </div>

            {formData.userType === 'student' ? (
              <>
                <input
                  type="text"
                  name="institution"
                  value={formData.institution}
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 bg-white border border-zinc-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 text-zinc-900 placeholder-zinc-400 transition-all shadow-sm"
                  placeholder="Institution Name"
                />

                <div className="relative">
                  <select
                    name="batchYear"
                    value={formData.batchYear}
                    onChange={handleChange}
                    className="w-full px-5 py-3.5 bg-white border border-zinc-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 text-zinc-900 placeholder-zinc-400 transition-all shadow-sm appearance-none cursor-pointer"
                  >
                    <option value="">Batch / Passing Year</option>
                    {batchYears.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </>
            ) : (
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full px-5 py-3.5 bg-white border border-zinc-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 text-zinc-900 placeholder-zinc-400 transition-all shadow-sm"
                placeholder="Organization / Company Name"
              />
            )}

            <div className="flex bg-zinc-200/50 p-1.5 rounded-2xl mt-6">
              <label className={`flex-1 cursor-pointer py-3 rounded-xl text-center text-sm font-bold transition-all ${formData.userType === 'student' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-zinc-500 hover:text-zinc-700'}`}>
                <input type="radio" name="userType" value="student" checked={formData.userType === 'student'} onChange={handleChange} className="hidden" />
                Student
              </label>
              <label className={`flex-1 cursor-pointer py-3 rounded-xl text-center text-sm font-bold transition-all ${formData.userType === 'professional' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-zinc-500 hover:text-zinc-700'}`}>
                <input type="radio" name="userType" value="professional" checked={formData.userType === 'professional'} onChange={handleChange} className="hidden" />
                Professional
              </label>
            </div>

            <button
              type="submit"
              className={`w-full bg-blue-600 text-white font-bold py-4.5 px-4 rounded-2xl hover:bg-blue-700 transition duration-300 shadow-xl shadow-blue-600/30 mt-8 text-lg ${!isPhoneVerified ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={!isPhoneVerified}
            >
              Sign Up
            </button>
          </form>
          <p className="mt-10 text-center text-sm text-zinc-500 font-medium">
            Already have an account? <Link to="/login" className="text-blue-600 hover:underline font-bold">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
