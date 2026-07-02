import { useEffect, useState } from "react";
import api from "../axiosConfig";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const PendingBooks = () => {

    const navigate = useNavigate();
    const [books, setBooks] = useState([]);

    useEffect(() => {

        loadPendingBooks();

    }, []);

    const loadPendingBooks = () => {

        api.get(
            "/books/pending"
        )
        .then((response) => {

            setBooks(response.data);

        })
        .catch((error) => {

            console.log(error);

        });
    };

    const approveBook = async (id) => {

    const token =
        localStorage.getItem("token");

    try {

        await api.put(
    `/books/approve/${id}`
);

        alert("Book Approved");

        loadPendingBooks();

    } catch (error) {

        console.log(error);
    }
};

    const rejectBook = async (id) => {

        try {

            await api.put(
                `/books/reject/${id}`
            );

            alert("Book Rejected");

            loadPendingBooks();

        } catch (error) {

            console.log(error);

        }
    };

    const deleteBook = async (id) => {

    if (
        !window.confirm(
            "Are you sure?"
        )
    ) {
        return;
    }

    try {

        await api.delete(
            `/books/${id}`
        );

        alert(
            "Book Deleted Successfully"
        );

        loadPendingBooks();

    } catch (error) {

        console.log(error);

    }
};

    return (

        <div>

            <Navbar />

            <div
                style={{
                    maxWidth: "1000px",
                    margin: "30px auto"
                }}
            >

                <h1>Pending Books</h1>

                {books.length === 0 && (

                    <h3>No Pending Books</h3>

                )}

                {books.map((book) => (

                    <div
                        key={book.id}
                        style={{
                            border: "1px solid #ddd",
                            padding: "20px",
                            marginBottom: "15px",
                            borderRadius: "10px"
                        }}
                    >

                        <h2>
                            {book.title}
                        </h2>

                        <p>
                            Author: {book.author}
                        </p>

                        <p>
                            Category: {book.category}
                        </p>

                        <p>
                            Created By: {book.createdBy}
                        </p>

                        <button
                            onClick={() =>
                            navigate(`/admin/book/${book.id}`)
                            } style={{
                                marginRight: "10px"
                            }}
                            >
                            View
                        </button>

                        <button
                            onClick={() =>
                                approveBook(book.id)
                            }
                            style={{
                                marginRight: "10px"
                            }}
                        >
                            Approve
                        </button>

                        <button
                            onClick={() =>
                                rejectBook(book.id)
                            } style={{ marginRight: "10px" }}
                        >
                            Reject
                        </button>

                        <button
    onClick={() =>
        deleteBook(book.id)
    }
    style={{ marginRight: "10px" }}
>
    Delete
</button>

                    </div>

                ))}

            </div>

        </div>
    );
};

export default PendingBooks;