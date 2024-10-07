import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../slice/loginSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Accessing the login state from Redux
  const loginState = useSelector((state) => state.login);
  
  // Log the entire state to check its structure
  console.log('Login state:', loginState);

  const { loading, error, isAuthenticated } = loginState;

  // Local state for form inputs
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Dispatch the login action with username and password
    dispatch(loginUser({ username, password }));
  };

  // Redirect if user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/'); // Redirect to the home page upon successful login
    }
  }, [isAuthenticated, navigate]);

  return (
    <div>
      <h2>Login</h2>
      {isAuthenticated && <p>Login successful! Redirecting...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
