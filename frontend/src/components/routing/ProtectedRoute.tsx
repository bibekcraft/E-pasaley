// src/components/routing/ProtectedRoute.tsx
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store/Store'; // Import the correct RootState type

interface ProtectedRouteProps {
  Component: React.ComponentType;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ Component }) => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: RootState) => state.login.isAuthenticated); // Check login status

  useEffect(() => {
    // If the user is not authenticated, navigate to the login page
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? <Component /> : null; // Render component only if authenticated
};

export default ProtectedRoute;
