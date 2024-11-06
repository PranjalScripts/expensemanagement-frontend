import React, { useState } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import {
  FaTachometerAlt,
  FaFileAlt,
  FaUsers,
  FaSignInAlt,
  FaSignOutAlt,
  FaChevronRight,
  FaChevronLeft,
  FaBook,
  FaIdCard,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ username, isLoggedIn, onLogout }) => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className={`d-flex ${isOpen ? "sidebar-open" : "sidebar-closed"}`}>
      <Navbar
        bg="dark"
        variant="dark"
        className="flex-column vh-100 p-3 sidebar"
      >
        <Button
          variant="outline-light"
          className="mb-4 toggle-button"
          onClick={toggleSidebar}
          aria-expanded={isOpen}
        >
          {isOpen ? <FaChevronLeft /> : <FaChevronRight />}
        </Button>

        <Nav className="flex-column">
          <Nav.Link href="/dashboard" className="sidebar-link">
            <FaTachometerAlt className="icon" /> {isOpen && "Dashboard"}
          </Nav.Link>
          <Nav.Link href="/selfrecord" className="sidebar-link">
            <FaFileAlt className="icon" /> {isOpen && "Self Record"}
          </Nav.Link>
          <Nav.Link href="/book" className="sidebar-link">
            <FaBook className="icon" /> {isOpen && "Book"}
          </Nav.Link>
          <Nav.Link href="/users" className="sidebar-link">
            <FaUsers className="icon" /> {isOpen && "Users"}
          </Nav.Link>
          <Nav.Link href="/profile" className="sidebar-link">
            <FaIdCard className="icon" /> {isOpen && "Your Profile"}
          </Nav.Link>
        </Nav>

         
      </Navbar>
    </div>
  );
};

export default Sidebar;
