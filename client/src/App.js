import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import { TeacherPage, StudentPage, HomePage } from './UI';

import AdminRoute from './utils/AdminRoute';
import UserRoute from './utils/UserRoute';

function App() {
  const [role, setRole] = useState(null);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentRole = decodedToken.role;
        setRole(currentRole);
      } catch (error) {
        console.error('Token decoding error:', error);
      }
    } else {
      console.error('Token not found in localStorage');
    }
  }, []);
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        
        {/* Protect the admin route */}
        <Route
          path="/admin"
          element={
            <AdminRoute role={role} expectedRole="admin">
              <TeacherPage />
            </AdminRoute>
          }
        />

        {/* Protect the user route */}
        <Route
          path="/user"
          element={
            <UserRoute role={role} expectedRole="user">
              <StudentPage />
            </UserRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
