import React from 'react';
import { useLocation } from 'react-router';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
    const location = useLocation();
    return localStorage.getItem("token") ? ( <Outlet/> ) : ( <Navigate to="/login" replace state={{from: location}}/> );
}

export default ProtectedRoutes;

