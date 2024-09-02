import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ role, expectedRole, children }) => {
  if (role === expectedRole) {
    return children; 
  } else {
    return (
      <>
        <div>You are not authorized to view this page</div>
        <Navigate to="/home" />
      </>
    );
  }
};

export default AdminRoute;
