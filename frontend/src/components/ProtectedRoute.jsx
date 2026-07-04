import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../store/auth.store';

// TODO: Backend Authentication
export default function ProtectedRoute() {
  const {loading, isAuthenticated} = useAuthStore();

  if(loading){
    return <div>Loading...</div>
  }

  if(!isAuthenticated){
    return <Navigate to="/login" replace />
  }
  return <Outlet />;
}
