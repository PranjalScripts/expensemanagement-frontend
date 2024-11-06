import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Sidebar from "../../.././pages/Layout/sidebar"; // Import Sidebar component

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10}$/; // Assumes a 10-digit phone number

  const handleSignup = async (e) => {
    e.preventDefault();

    // Validate email and phone
    if (!emailRegex.test(email)) {
      toast.warn("Please enter a valid email address.");
      return;
    }
    if (!phoneRegex.test(phone)) {
      toast.warn("Please enter a valid 10-digit phone number.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5100/api/v1/auth/signup",
        {
          name,
          email,
          phone,
          password,
        }
      );
      toast.success("Signup successful! You can now log in.");
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="d-flex">
      {/* Sidebar is added here */}
      <Sidebar />

      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ height: "100vh", width: "100%" }}
      >
        <div className="card p-4" style={{ maxWidth: "400px", width: "100%" }}>
          <h2 className="text-center mb-4">Signup</h2>
          <form onSubmit={handleSignup}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="form-control"
                placeholder="Enter your name"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-control"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="form-control"
                placeholder="Enter your phone number"
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
                placeholder="Enter your password"
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Signup
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;