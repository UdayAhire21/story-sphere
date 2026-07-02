import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import Navbar from "../components/Navbar";

const BookDetails = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [book, setBook] = useState(null);

    const currentUser = JSON.parse(
        localStorage.getItem("user")
    );

    useEffect(() => {

        axios.get(
            `http://localhost:8080/books/${id}`
        )
        .then((response) => {

            setBook(response.data);

        })
        .catch((error) => {

            console.log(error);

        });

    }, [id]);

    if (!book) {

        return (

            <div>

                <Navbar />

                <h2>Loading...</h2>

            </div>
        );
    }

    const canManageBook =
    currentUser &&
    (
        currentUser.role === "ADMIN" ||
        currentUser.email === book.createdBy
    );

    return (

        <div>

            <Navbar />

            <div
                style={{
                    maxWidth: "900px",
                    margin: "30px auto",
                    padding: "20px",
                    border: "1px solid #ddd",
                    borderRadius: "10px"
                }}
            >

                <img
                    src={book.coverImage}
                    alt={book.title}
                    style={{
                        width: "300px",
                        height: "450px",
                        objectFit: "cover",
                        borderRadius: "10px",
                        display: "block",
                        margin: "0 auto"
                    }}
                />

                <h1
                    style={{
                        textAlign: "center",
                        marginTop: "20px"
                    }}
                >
                    {book.title}
                </h1>

                <h3
                    style={{
                        textAlign: "center",
                        color: "gray"
                    }}
                >
                    By {book.author}
                </h3>

                <hr />

                <h2>Category</h2>
                
                <p> {book.category} </p>

                <div
                    style={{
                        display: "flex",
                        gap: "10px",
                        flexWrap: "wrap",
                        marginTop: "20px"
                    }}
                >

                    <button
                        onClick={() =>
                            navigate(`/reader/${book.id}`)
                        }
                    >
                        Start Reading
                    </button>

                    <button
                        onClick={() =>
                            navigate(`/chapters/${book.id}`)
                        }
                    >
                        View Chapters
                    </button>

                    {canManageBook && (
    <>
        <button
            onClick={() =>
                navigate(`/edit/${book.id}`)
            }
        >
            Edit Book
        </button>

        <button
            onClick={() =>
                navigate(`/add-chapter/${book.id}`)
            }
        >
            Add Chapter
        </button>
    </>
)}

                </div>

            </div>

        </div>
    );
};

export default BookDetails;