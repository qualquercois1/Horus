import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { hasSession } from '../utils/auth';

export default function ProtectedRoute() {
  const location = useLocation();

  if (!hasSession()) {
    return <Navigate to="/login" replace state={{ from: `${location.pathname}${location.search}` }} />;
  }

  return <Outlet />;
}
