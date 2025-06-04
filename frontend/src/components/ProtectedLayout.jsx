// components/ProtectedLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Chatbot from './Chatbot';

const ProtectedLayout = () => {
  return (
    <div className="relative min-h-screen">
      <Outlet />
      <Chatbot />
    </div>
  );
};

export default ProtectedLayout;
