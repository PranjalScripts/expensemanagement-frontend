import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../pages/Layout/sidebar"; // Assuming Sidebar is correct path

const ProfileUpdate = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

useEffect(() => {
  const checkAuthentication = () => {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage
    if (!token) {
      toast.warn("Please log in to access the profile page.");
      navigate("/login"); // Redirect to login page if not logged in
      return;
    }

    const userIdFromStorage = localStorage.getItem("userId"); // Retrieve user ID if token exists
    if (userIdFromStorage) {
      setUserId(userIdFromStorage);
    }
  };

  checkAuthentication();

  // Set up an event listener to watch for changes in localStorage
  window.addEventListener("storage", checkAuthentication);

  // Clean up the event listener when component unmounts
  return () => {
    window.removeEventListener("storage", checkAuthentication);
  };
}, [navigate]);

//
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      toast.error("User is not authenticated.");
      return;
    }

    setIsSubmitting(true);

    const updatedData = {
      name,
      email,
      phone,
      password,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:5100/api/v1/auth/update-profile/${userId}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Profile updated successfully");
      navigate("/dashboard"); // Redirect to dashboard after successful update
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating profile");
        console.error(error.response?.data);
        console.log("your error is here", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="d-flex">
      {/* Sidebar is added here */}
      <Sidebar />
      <div className="container mt-5">
        <h1>Update Profile</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input
              type="text"
              className="form-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              placeholder="Enter your phone number"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password (leave empty if not changing)"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>

      {/* ToastContainer to display the toast notifications */}
      <ToastContainer />
    </div>
  );
};

export default ProfileUpdate;
