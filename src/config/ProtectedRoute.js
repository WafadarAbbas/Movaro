import React, { useState, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { getToken } from '../Compo/utilis/getToken'; 

const ProtectedRoute = () => {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const t = getToken();
    setToken(t);
    setLoading(false);
  }, []);

  if (loading) return null;  

  return token ? <Outlet /> : <Navigate to='/user/login-v3' />;
};

export default ProtectedRoute;
