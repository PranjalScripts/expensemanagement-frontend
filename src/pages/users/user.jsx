import React from "react";
import Sidebar from "../Layout/sidebar";
const user = () => {
  return (
    <div className="d-flex">
      {/* Sidebar is added here */}
      <Sidebar />

      <div>
        <h1>this is user page</h1>
      </div>
    </div>
  );
};

export default user;
