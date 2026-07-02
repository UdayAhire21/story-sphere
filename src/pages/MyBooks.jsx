import { useEffect, useState } from "react";
import api from "../axiosConfig";

import Navbar from "../components/Navbar";
import BookCard from "../components/BookCard";
import "./MyBooks.css"; // Import the CSS file here

const MyBooks = () => {
    const [books, setBooks] = useState([]);

    const currentUser = JSON.parse(
        localStorage.getItem("user")
    );

    useEffect(() => {
        if (!currentUser) {
            return;
        }

        console.log("Token:", localStorage.getItem("token"));

        api.get(`/books/my-books/${currentUser.email}`)
            .then((response) => {
                console.log(response.data);
                setBooks(response.data);
            })
            .catch((error) => {
                console.log(error);
                if (error.response) {
                    console.log("Status:", error.response.status);
                    console.log(error.response.data);
                }
            });
    }, [currentUser]);

    const deleteBook = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this book?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            await api.delete(`/books/${id}`);
            alert("Book Deleted Successfully");
            setBooks(books.filter((book) => book.id !== id));
        } catch (error) {
            console.log(error);
            alert("Failed to delete book");
        }
    };

    return (
        <div className="mybooks-page-wrapper">
            <Navbar />

            <div className="mybooks-container">
                <h1 className="mybooks-title">My Books</h1>

                {books.length === 0 ? (
                    <h3 className="empty-state-msg">
                        You haven't published any books yet.
                    </h3>
                ) : (
                    <div className="books-grid">
                        {books.map((book) => (
                            <BookCard
                                key={book.id}
                                book={book}
                                deleteBook={deleteBook}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyBooks;