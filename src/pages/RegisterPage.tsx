import React from 'react';
import RegisterForm from '../components/auth/RegisterForm';
import { Link } from 'react-router-dom';

const RegisterPage: React.FC = () => {
  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Join SmartSpace</h1>
        <p className="text-slate-600 mt-2">Create your account to get started</p>
        <div className="mt-4 w-16 h-1 bg-gray-900 mx-auto rounded-full"></div>
      </div>
      
      <RegisterForm />
      
      <div className="text-center mt-8">
        <p className="text-slate-600">
          Already have an account? <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium transition">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
