import React from "react";
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  isAuthenticated: boolean;
}


const ProtectedRoute: React.FC<ProtectedRouteProps> = (isAuthenticated) => {
    console.log('test ==', isAuthenticated)
  return isAuthenticated.isAuthenticated ? <Outlet></Outlet> : <Navigate to="/login" />
}

export default ProtectedRoute