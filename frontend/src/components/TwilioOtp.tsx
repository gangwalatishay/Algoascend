import React, { useState, useEffect } from 'react';
import axios from 'axios';

type Props = {
  phoneNumber: string;
  onVerificationSuccess: () => void;
};

const TwilioOtp: React.FC<Props> = ({ phoneNumber, onVerificationSuccess }) => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer]);

  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/otp/send', {
        mobile: phoneNumber
      });
      setSuccess(response.data.message);
      setStep('otp');
      setTimer(60);
    } catch (err: any) {
      setError(err.response?.data?.error || err.response?.data?.errors?.[0]?.msg || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/otp/verify', {
        mobile: phoneNumber,
        otp
      });
      if (response.data.success) {
        setSuccess('OTP verified successfully!');
        setTimeout(() => onVerificationSuccess(), 1000);
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-4">
      {error && (
        <div className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm text-center font-medium">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-100 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm text-center font-medium">
          {success}
        </div>
      )}

      {step === 'phone' ? (
        <button
          onClick={handleSendOtp}
          disabled={loading || !phoneNumber}
          className={`w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-blue-700 transition duration-300 shadow-lg shadow-blue-600/20 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Sending...' : 'Send OTP via Phone'}
        </button>
      ) : (
        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-5 py-3.5 bg-white border border-zinc-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 text-zinc-900 placeholder-zinc-400 transition-all shadow-sm text-center tracking-[1em] text-xl font-bold"
              placeholder="000000"
              maxLength={6}
            />
          </div>
          <button
            onClick={handleVerifyOtp}
            disabled={loading || otp.length < 4}
            className={`w-full bg-blue-600 text-white font-bold py-3.5 px-4 rounded-2xl hover:bg-blue-700 transition duration-300 shadow-xl shadow-blue-600/30 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
          <div className="text-center">
            {timer > 0 ? (
              <p className="text-zinc-500 text-sm">Resend OTP in {timer}s</p>
            ) : (
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={loading}
                className="text-blue-600 text-sm font-bold hover:underline"
              >
                Resend OTP
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TwilioOtp;
