import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store/Store'; // Update this to the correct path where your RootState is defined

interface ProtectedRouteProps {
  Component: React.ComponentType;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ Component }) => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.login.status === 'succeeded');

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  return isLoggedIn ? <Component /> : null;
};

export default ProtectedRoute;
