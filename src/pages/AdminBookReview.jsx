import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../axiosConfig";

import Navbar from "../components/Navbar";

const AdminBookReview = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [book, setBook] = useState(null);

    useEffect(() => {

        const currentUser = JSON.parse(
            localStorage.getItem("user")
        );

        if (
            !currentUser ||
            currentUser.role !== "ADMIN"
        ) {

            alert("Access Denied");

            navigate("/");

            return;
        }

        api.get(
            `/books/${id}`
        )
        .then((response) => {

            setBook(response.data);

        })
        .catch((error) => {

            console.log(error);

        });

    }, [id, navigate]);

   const approveBook = async () => {

    try {

        const token =
            localStorage.getItem("token");

        await api.put(
            `/books/approve/${id}`
        );

        alert("Book Approved");

        navigate("/admin/pending-books");

    } catch (error) {

        console.log(error);

    }
};

    const rejectBook = async () => {

    try {

        const token =
            localStorage.getItem("token");

        await api.put(
            `/books/reject/${id}`
        );

        alert("Book Rejected");

        navigate("/admin/pending-books");

    } catch (error) {

        console.log(error);

    }
};

    if (!book) {

        return (
            <div>
                <Navbar />
                <h2
                    style={{
                        textAlign: "center",
                        marginTop: "50px"
                    }}
                >
                    Loading...
                </h2>
            </div>
        );
    }

    return (

        <div>

            <Navbar />

            <div
                style={{
                    maxWidth: "900px",
                    margin: "30px auto",
                    padding: "25px",
                    border: "1px solid #ddd",
                    borderRadius: "10px"
                }}
            >

                <img
                    src={book.coverImage}
                    alt={book.title}
                    style={{
                        width: "250px",
                        display: "block",
                        margin: "0 auto",
                        borderRadius: "10px"
                    }}
                />

                <h1>{book.title}</h1>

                <h3>
                    Author: {book.author}
                </h3>

                <p>
                    Category: {book.category}
                </p>

                <p>
                    Created By: {book.createdBy}
                </p>

                <hr />

                <h2>Book Content</h2>

                <p
                    style={{
                        whiteSpace: "pre-wrap",
                        lineHeight: "1.8"
                    }}
                >
                    {book.content}
                </p>

                <br />

                <button
                    onClick={approveBook}
                    style={{
                        marginRight: "10px"
                    }}
                >
                    Approve
                </button>

                <button
                    onClick={rejectBook}
                >
                    Reject
                </button>

            </div>

        </div>
    );
};

export default AdminBookReview;