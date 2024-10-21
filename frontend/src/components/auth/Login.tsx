import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../slice/loginSlice';
import epsl from '../../assets/epsl.png';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.login);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ username, password }));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/'); // Redirect to homepage if authenticated
    }
  }, [isAuthenticated, navigate]);

  return (
    <section className="bg-white">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-3xl font-semibold text-gray-900">
          <img className="w-auto h-20 mr-2" src={epsl} alt="logo" />
          E-pasaley
        </a>
        <div className="w-full bg-white rounded-lg shadow-md sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 sm:p-8">
            <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Sign in to your account
            </h1>
            {error && <p className="text-red-500">{error}</p>}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
              <p className="text-sm font-light text-gray-500">
                Don’t have an account yet?{' '}
                <a href="/register" className="font-medium text-primary-600 hover:underline">
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
