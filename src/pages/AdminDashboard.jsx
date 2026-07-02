import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Navbar from "../components/Navbar";

const AdminDashboard = () => {

    const navigate = useNavigate();

    const [pendingBooks, setPendingBooks] = useState([]);
    const [pendingChapters, setPendingChapters] = useState([]);

    useEffect(() => {

        const currentUser = JSON.parse(
            localStorage.getItem("user")
        );

        if (
            !currentUser ||
            currentUser.role !== "ADMIN"
        ) {

            alert(
                "Access Denied. Admin Only."
            );

            navigate("/");

            return;
        }

        loadPendingBooks();
        loadPendingChapters();

    }, [navigate]);

    const loadPendingBooks = () => {

        axios.get(
            "http://localhost:8080/books/pending"
        )
        .then((response) => {

            setPendingBooks(
                response.data
            );

        })
        .catch((error) => {

            console.log(error);

        });
    };

    const loadPendingChapters = () => {

        axios.get(
            "http://localhost:8080/chapters/pending"
        )
        .then((response) => {

            setPendingChapters(
                response.data
            );

        })
        .catch((error) => {

            console.log(error);

        });
    };

    return (

        <div>

            <Navbar />

            <div
                style={{
                    maxWidth: "900px",
                    margin: "40px auto",
                    padding: "20px"
                }}
            >

                <h1
                    style={{
                        textAlign: "center",
                        marginBottom: "30px"
                    }}
                >
                    Admin Dashboard
                </h1>

                <div
                    style={{
                        display: "flex",
                        gap: "20px",
                        justifyContent: "center",
                        flexWrap: "wrap"
                    }}
                >

                    {/* Pending Books */}

                    <div
                        style={{
                            width: "300px",
                            padding: "25px",
                            border: "1px solid #ddd",
                            borderRadius: "10px",
                            textAlign: "center",
                            boxShadow:
                                "0px 2px 10px rgba(0,0,0,0.2)"
                        }}
                    >

                        <h2>
                            Pending Books
                        </h2>

                        <h1>
                            {pendingBooks.length}
                        </h1>

                        <button
                            onClick={() =>
                                navigate(
                                    "/admin/pending-books"
                                )
                            }
                            style={{
                                padding:
                                    "10px 20px",
                                cursor:
                                    "pointer"
                            }}
                        >
                            View Books
                        </button>

                    </div>

                    {/* Pending Chapters */}

                    <div
                        style={{
                            width: "300px",
                            padding: "25px",
                            border: "1px solid #ddd",
                            borderRadius: "10px",
                            textAlign: "center",
                            boxShadow:
                                "0px 2px 10px rgba(0,0,0,0.2)"
                        }}
                    >

                        <h2>
                            Pending Chapters
                        </h2>

                        <h1>
                            {pendingChapters.length}
                        </h1>

                        <button
                            onClick={() =>
                                navigate(
                                    "/admin/pending-chapters"
                                )
                            }
                            style={{
                                padding:
                                    "10px 20px",
                                cursor:
                                    "pointer"
                            }}
                        >
                            View Chapters
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default AdminDashboard;