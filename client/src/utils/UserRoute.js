import React from 'react';
import { Outlet, Navigate } from 'react-router-dom'

const UserRoute = ({ role, expectedRole, children }) => {
    if (role === expectedRole) {
        return <Outlet />;
    } else {
        return <Navigate to="/home" />;
    }
}

export default UserRoute
