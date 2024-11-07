import React, { useState, useEffect } from "react";
import Sidebar from "../Layout/sidebar";
import axios from "axios";
import { Button, Modal, Form } from "react-bootstrap"; // Bootstrap components

const Book = () => {
  const [books, setBooks] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [bookDetails, setBookDetails] = useState({ bookname: "" });
  const [currentBookId, setCurrentBookId] = useState(null);

  // Fetch all books on page load
  useEffect(() => {
    axios
      .get("http://localhost:5100/api/v2/transactionBooks/getAll-books") // Replace with your API endpoint
      .then((response) => {
        setBooks(response.data.transactionBooks);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
  }, []);

  // Handle form submission for creating a book
 const handleCreateBook = () => {
   // Get the userId from localStorage
   const userId = localStorage.getItem("userId"); // Ensure this matches your localStorage key

   // Combine userId with the rest of the book details
   const newBookDetails = { ...bookDetails, userId };

   axios
     .post(
       "http://localhost:5100/api/v2/transactionBooks/create-book",
       newBookDetails
     )
     .then((response) => {
       setBooks([...books, response.data.transactionBook]);
       setShowCreateModal(false);
     })
     .catch((error) => {
       console.error("Error creating book:", error);
     });
 };


  // Handle form submission for editing a book
  const handleEditBook = () => {
    axios
      .put(
        `http://localhost:5100/api/v2/transactionBooks/update-book/${currentBookId}`,
        bookDetails
      )
      .then((response) => {
        const updatedBooks = books.map((book) =>
          book._id === currentBookId ? response.data.updatedBook : book
        );
        setBooks(updatedBooks);
        setShowEditModal(false);
      })
      .catch((error) => {
        console.error("Error editing book:", error);
      });
  };

  // Handle deletion of a book
  const handleDeleteBook = (id) => {
    axios
      .delete(`http://localhost:5100/api/v2/transactionBooks/delete-book/${id}`)
      .then(() => {
        const updatedBooks = books.filter((book) => book._id !== id);
        setBooks(updatedBooks);
      })
      .catch((error) => {
        console.error("Error deleting book:", error);
      });
  };

  // Open Edit Modal with book details pre-filled
  const openEditModal = (book) => {
    setBookDetails({ bookname: book.bookname });
    setCurrentBookId(book._id);
    setShowEditModal(true);
  };

  return (
    <div className="d-flex">
      {/* Sidebar is added here */}
      <Sidebar />

      <div className="container mt-4">
        <h1>Transaction Books</h1>

        {/* Add Book Button */}
        <Button variant="primary" onClick={() => setShowCreateModal(true)}>
          Add Book
        </Button>

        {/* Table to display all books */}
        <table className="table mt-4">
          <thead>
            <tr>
              <th>#</th>
              <th>Book Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={book._id}>
                <td>{index + 1}</td>
                <td>{book.bookname}</td>
                <td>
                  <Button
                    variant="warning"
                    onClick={() => openEditModal(book)}
                    className="mr-2"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteBook(book._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Create Book Modal */}
        <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Create Transaction Book</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="bookname">
                <Form.Label>Book Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter book name"
                  value={bookDetails.bookname}
                  onChange={(e) =>
                    setBookDetails({ ...bookDetails, bookname: e.target.value })
                  }
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowCreateModal(false)}
            >
              Close
            </Button>
            <Button variant="primary" onClick={handleCreateBook}>
              Save Book
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Edit Book Modal */}
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Transaction Book</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="bookname">
                <Form.Label>Book Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter book name"
                  value={bookDetails.bookname}
                  onChange={(e) =>
                    setBookDetails({ ...bookDetails, bookname: e.target.value })
                  }
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleEditBook}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Book;
