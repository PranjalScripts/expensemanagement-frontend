import React from 'react';
import './App.css';
 
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Router and Routes
import Login from './components/auth/login/login';
import Signup from './components/auth/login/signup';
import Dashboard from './pages/Dashboard/dashboard';
import SelfRecord from './pages/selfRecord/selfrecord';
import Book from './pages/books/book';
import Users from './pages/users/user';
import Profile from "./components/auth/ProfileUpdate/prorfileupdate"
function App() {
  return (

    
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/selfrecord" element={<SelfRecord />} />
        <Route path="/book" element={<Book />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </Router>
  );
}

export default App;
