// src/components/Register.tsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../slice/registerSlice'; // Adjust path as necessary
import { RootState } from '../store/Store';
import { resetState } from '../slice/registerSlice';

function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector((state: RootState) => state.register.loading);
  const registerError = useSelector((state: RootState) => state.register.error);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'confirmPassword') {
      setPasswordsMatch(value === formData.password);
    } else if (name === 'password') {
      setPasswordsMatch(value === formData.confirmPassword);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordsMatch) {
      const resultAction = await dispatch(registerUser({
        email: formData.email,
        password: formData.password,
      }));

      if (registerUser.fulfilled.match(resultAction)) {
        navigate('/login');
      } else {
        alert(resultAction.payload);
      }
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <Link to="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
          Flowbite
        </Link>
        <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">Create an Account</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirm-password"
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          {!passwordsMatch && <p className="text-red-600">Passwords do not match.</p>}
          <button
            type="submit"
            className={`w-full px-4 py-2 text-white rounded-md bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-500 ${loading || !passwordsMatch ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading || !passwordsMatch}
          >
            {loading ? 'Creating Account...' : 'Create an Account'}
          </button>
          {registerError && (
            <p className="mt-2 text-center text-red-600">{registerError}</p>
          )}
          <p className="text-sm text-center text-gray-500 dark:text-gray-400">
            Already have an account? <Link to="/login" className="text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Register;
