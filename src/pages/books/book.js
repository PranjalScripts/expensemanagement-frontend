import React from "react";
import Sidebar from "../Layout/sidebar";
const book = () => {
  return (
    <div className="d-flex">
      {/* Sidebar is added here */}
      <Sidebar />

      <div>
        <h1>this is book page</h1>
      </div>
    </div>
  );
};

export default book;
