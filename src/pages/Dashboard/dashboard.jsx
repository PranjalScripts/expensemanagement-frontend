import React, { useState, useEffect } from "react";
import Sidebar from "../Layout/sidebar";

const Dashboard = () => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    // Fetch user details from local storage
    const storedUser = localStorage.getItem("userDetails");
    if (storedUser) {
      setUserDetails(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userDetails"); // Clear user details from storage
    setUserDetails(null);
    window.location.href = "/login"; // Redirect to login page
  };

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="p-4 flex-grow-1">
        <div className="d-flex justify-content-end">
          {userDetails ? (
            <div>
              <span className="me-3">Welcome, {userDetails.user.name}!</span>
              <button onClick={handleLogout} className="btn btn-danger">
                Logout
              </button>
            </div>
          ) : (
            <button
              className="btn btn-primary"
              onClick={() => (window.location.href = "/login")}
            >
              Login
            </button>
          )}
        </div>

     
        {userDetails && (
          <div>
            <p>Email: {userDetails.user.email}</p>
            <p>Username: {userDetails.user.name}</p>
            {/* Add more user details if needed */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
