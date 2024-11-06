import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Sidebar from "../../../pages/Layout/sidebar"; // Import the Sidebar component

const Login = () => {
  const [identifier, setIdentifier] = useState(""); // This can be email or phone
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const [username, setUsername] = useState(""); // Track the username
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10}$/; // Assumes a 10-digit phone number

  useEffect(() => {
    // Redirect to dashboard if already logged in
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!emailRegex.test(identifier) && !phoneRegex.test(identifier)) {
      toast.warn("Please enter a valid email or 10-digit phone number.");
      return;
    }

    const loginPayload = emailRegex.test(identifier)
      ? { email: identifier, password }
      : { phone: identifier, password };

    try {
      const response = await axios.post(
        "http://localhost:5100/api/v1/auth/login",
        loginPayload
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.user.id); //
      // Assume response.data contains user data with a 'username' field
      const userData = response.data;
      setUsername(response.data.username); // Set username from response
      setIsLoggedIn(true); // Set logged-in state to true
      localStorage.setItem("userDetails", JSON.stringify(userData)); // Save user details in local storage
      toast.success("Login successful");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      console.error(error.response?.data);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    toast.success("Logged out successfully");
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <div className="d-flex">
      {/* Sidebar with isLoggedIn, username, and handleLogout */}
      <Sidebar
        username={username}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
      />

      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ height: "100vh", width: "100%" }}
      >
        {/* Conditionally render login form if not logged in */}
        {!isLoggedIn ? (
          <div
            className="card p-4"
            style={{ maxWidth: "400px", width: "100%" }}
          >
            <h2 className="text-center mb-4">Login</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="form-label">Email or Phone</label>
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  required
                  className="form-control"
                  placeholder="Enter email or phone"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="form-control"
                  placeholder="Enter password"
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>
              <p className="text-center mt-3">
                Don’t have an account? <Link to="/signup">Signup here</Link>
              </p>
            </form>
          </div>
        ) : (
          <div className="text-center">
            <h2>Welcome, {username}!</h2>
            <p>You are already logged in.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
