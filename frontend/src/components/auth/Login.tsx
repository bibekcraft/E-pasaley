import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchLogin } from '../slice/loginSlice';
// Remove or include Footer import as per need
// import Footer from '../components/Footer';
// import clearCart action if it's relevant
// import { clearCart } from '../slice/cartSlice';
import First from '../firstpage/First';

function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginStatus = useSelector((state: any) => state.login.status);  // Replace `any` with your state type

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const action = await dispatch(fetchLogin(formData) as any);  // You can refine the typing here
      if (fetchLogin.fulfilled.match(action)) {
        // Handle success actions here, like clearing cart or user-related changes
        // dispatch(clearCart());
        setFormData({ username: '', password: '' });
        navigate('/');  // Redirect to home or another page after login success
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div>
      <First />
      <div className="flex flex-col justify-center min-h-full px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Link to="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img className="h-20 mr-2 w-50" src={logo} alt="logo" />
          </Link>
          <h2 className="mt-10 text-2xl text-center text-gray-900">Sign in to your account</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>

          {loginStatus === 'failed' && (
            <p className="mt-2 text-sm text-center text-red-600">Please Enter Correct Values</p>
          )}

          <p className="mt-8 text-sm text-center text-gray-500">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign up
            </Link>
          </p>
        </div>
      </div>
      {/* Uncomment Footer if needed */}
      {/* <Footer /> */}
    </div>
  );
}

export default Login;
