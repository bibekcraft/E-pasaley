import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchSignup } from '../slice/signupSlice';
import { RootState } from '../store/Store'; // Adjust import path to your store

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registerStatus = useSelector((state: RootState) => state.register.status);
  const registerError = useSelector((state: RootState) => state.register.error);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(fetchSignup(formData));
  };

  if (registerStatus === 'succeeded') {
    navigate('/login'); // Redirect to login after successful signup
  }

  return (
    <div>
      <div className="flex flex-col justify-center min-h-full px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Link to="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img className="h-20 mr-2 w-50" src={"logo"} alt="logo" />
          </Link>
          <h2 className="mt-10 text-2xl text-center text-gray-900">
            Create an account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Input fields for signup form */}
            <input name="username" value={formData.username} onChange={handleChange} required />
            <input name="email" value={formData.email} onChange={handleChange} required />
            <input name="first_name" value={formData.first_name} onChange={handleChange} required />
            <input name="last_name" value={formData.last_name} onChange={handleChange} required />
            <input name="password" type="password" value={formData.password} onChange={handleChange} required />

            {/* Submit button */}
            <button type="submit">Sign up</button>
          </form>

          {/* Error handling */}
          {registerStatus === 'failed' && <p className="text-red-600">{registerError}</p>}

          {/* Link to login */}
          <p>
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
