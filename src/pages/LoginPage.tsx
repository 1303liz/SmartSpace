import React from 'react';
import LoginForm from '../components/auth/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome back</h1>
        <p className="text-slate-600">Sign in to your SmartSpace account</p>
        <div className="mt-4 w-16 h-1 bg-blue-600 mx-auto rounded-full"></div>
      </div>
      
      <LoginForm />
    </div>
  );
};

export default LoginPage;
