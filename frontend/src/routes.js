// routes.js
import React from 'react';
import { Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import AdminDashboard from './admin/Dashboard.js';
import CreateOption from './admin/optionDetails.js';

const routes = [
  <Route key="login" path="/" element={<Login />} />,
  <Route key="login-alias" path="/login" element={<Login />} />,
  <Route key="home" path="/home" element={<Home />} />,
  <Route key="admin" path="/admin/deshboard" element={<AdminDashboard />} />,
  <Route key="create-option" path="/admin/create/new" element={<CreateOption />} />,
  <Route key="404" path="*" element={<NotFound />} />,
];

export default routes; 
