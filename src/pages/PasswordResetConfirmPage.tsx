import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { confirmPasswordReset, setNewPassword } from '../services/auth';

const PasswordResetConfirmPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [tokenValid, setTokenValid] = useState<boolean | null>(null);
  const navigate = useNavigate();
  const { uidb64, token } = useParams<{ uidb64: string; token: string }>();

  // Verify token on component mount
  useEffect(() => {
    const verifyToken = async () => {
      if (!uidb64 || !token) {
        setError('Invalid reset link');
        setTokenValid(false);
        return;
      }

      try {
        await confirmPasswordReset(uidb64, token);
        setTokenValid(true);
      } catch (err: any) {
        setError('This password reset link is invalid or has expired');
        setTokenValid(false);
      }
    };

    verifyToken();
  }, [uidb64, token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!password.trim() || !confirmPassword.trim()) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (!uidb64 || !token) {
      setError('Invalid reset link');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await setNewPassword({
        password: password.trim(),
        password_confirm: confirmPassword.trim(),
        uidb64,
        token
      });
      setSuccess(true);
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/login', { 
          state: { message: 'Password reset successfully! Please login with your new password.' }
        });
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (tokenValid === null) {
    return (
      <div className="max-w-md w-full mx-auto">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-sm text-slate-600">Verifying reset link...</p>
        </div>
      </div>
    );
  }

  if (tokenValid === false) {
    return (
      <div className="max-w-md w-full mx-auto">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100">
            <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </div>
          <h2 className="mt-4 text-2xl font-bold text-slate-800">
            Invalid Reset Link
          </h2>
          <p className="mt-2 text-slate-600">
            {error || 'This password reset link is invalid or has expired.'}
          </p>
          <div className="mt-6">
            <button
              onClick={() => navigate('/password-reset')}
              className="w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-black transition duration-200 font-medium"
            >
              Request New Reset Link
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="max-w-md w-full mx-auto">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
            <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="mt-4 text-2xl font-bold text-slate-800">
            Password Reset Successful!
          </h2>
          <p className="mt-2 text-slate-600">
            Your password has been successfully reset. Redirecting to login...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md w-full mx-auto">
      <div className="text-center mb-8">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gray-100">
          <svg className="h-8 w-8 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
          </svg>
        </div>
        <h2 className="mt-4 text-2xl font-bold text-slate-800">
          Create New Password
        </h2>
        <p className="mt-2 text-slate-600">
          Set a new password for your account
        </p>
      </div>
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-6 text-sm flex items-start">
          <svg className="h-5 w-5 mr-2 mt-0.5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
            New Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="Enter new password"
              className="w-full pl-10 px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p className="mt-1 text-xs text-slate-500">Must be at least 6 characters</p>
        </div>

        <div>
          <label htmlFor="confirm_password" className="block text-sm font-medium text-slate-700 mb-1">
            Confirm Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              id="confirm_password"
              name="confirm_password"
              type="password"
              required
              placeholder="Confirm new password"
              className="w-full pl-10 px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-black transition duration-200 font-medium flex justify-center items-center"
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Setting Password...
            </>
          ) : 'Reset Password'}
        </button>

        <div className="text-center">
          <button
            type="button"
            className="text-sm text-gray-800 hover:text-blue-800 font-medium transition"
            onClick={() => navigate('/login')}
          >
            Back to login
          </button>
        </div>
      </form>
    </div>
  );
};

export default PasswordResetConfirmPage;
