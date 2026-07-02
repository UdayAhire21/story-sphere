import { useEffect, useState } from "react";

import {
    useParams,
    useNavigate
} from "react-router-dom";

import axios from "axios";

import Navbar from "../components/Navbar";

const Reader = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [book, setBook] = useState(null);

    const [chapters, setChapters] = useState([]);

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

        axios.get(
            `http://localhost:8080/chapters/book/${id}`
        )
        .then((response) => {

            setChapters(response.data);

        })
        .catch((error) => {

            console.log(error);

        });

    }, [id]);

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
                    padding: "30px",
                    backgroundColor: "#ffffff",
                    borderRadius: "10px",
                    boxShadow:
                        "0px 2px 10px rgba(0,0,0,0.2)"
                }}
            >

                <img
                    src={book.coverImage}
                    alt={book.title}
                    style={{
                        width: "250px",
                        height: "350px",
                        objectFit: "cover",
                        display: "block",
                        margin: "0 auto",
                        borderRadius: "10px"
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

                <hr
                    style={{
                        margin: "25px 0"
                    }}
                />

                <p
                    style={{
                        fontSize: "18px",
                        lineHeight: "1.8",
                        whiteSpace: "pre-wrap"
                    }}
                >
                    {book.content}
                </p>

                <hr
                    style={{
                        margin: "25px 0"
                    }}
                />

                <h2>Chapters</h2>

                {chapters.length === 0 ? (

                    <p>
                        No chapters available.
                    </p>

                ) : (

                    chapters.map((chapter) => (

                        <div
                            key={chapter.id}
                            style={{
                                marginBottom: "10px"
                            }}
                        >

                            <button
                                onClick={() =>
                                    navigate(
                                        `/chapter/${chapter.id}`
                                    )
                                }
                            >
                                Chapter {chapter.chapterNumber}
                                {" - "}
                                {chapter.chapterTitle}
                            </button>

                        </div>

                    ))

                )}

            </div>

        </div>
    );
};

export default Reader;