import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import Navbar from "../components/Navbar";

const ChapterList = () => {

    const { bookId } = useParams();

    const navigate = useNavigate();

    const [chapters, setChapters] = useState([]);

    const currentUser = JSON.parse(
        localStorage.getItem("user")
    );

    useEffect(() => {

        axios
            .get(`http://localhost:8080/chapters/book/${bookId}`)
            .then((response) => {

                setChapters(response.data);

            })
            .catch((error) => {

                console.log(error);

            });

    }, [bookId]);

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Delete this chapter?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await axios.delete(
                `http://localhost:8080/chapters/${id}`
            );

            setChapters(
                chapters.filter(
                    chapter => chapter.id !== id
                )
            );

            alert("Chapter Deleted Successfully");

        } catch (error) {

            console.log(error);

            alert("Failed to delete chapter");
        }
    };

    return (

        <div>

            <Navbar />

            <div
                style={{
                    maxWidth: "800px",
                    margin: "20px auto"
                }}
            >

                <h1>Chapters</h1>

                {chapters.length === 0 ? (

                    <p>No chapters added yet.</p>

                ) : (

                    chapters.map((chapter) => {

                        const isOwner =
                            currentUser &&
                            currentUser.email ===
                            chapter.createdBy;

                        return (

                            <div
                                key={chapter.id}
                                style={{
                                    border: "1px solid #ddd",
                                    padding: "15px",
                                    marginBottom: "10px",
                                    borderRadius: "10px"
                                }}
                            >

                                <h3>
                                    Chapter {chapter.chapterNumber}
                                </h3>

                                <p>
                                    {chapter.chapterTitle}
                                </p>

                                <button
                                    onClick={() =>
                                        navigate(
                                            `/chapter/${chapter.id}`
                                        )
                                    }
                                >
                                    Read
                                </button>

                                {" "}

                                {isOwner && (

                                    <>
                                        <button
                                            onClick={() =>
                                                navigate(
                                                    `/edit-chapter/${chapter.id}`
                                                )
                                            }
                                        >
                                            Edit
                                        </button>

                                        {" "}

                                        <button
                                            onClick={() =>
                                                handleDelete(
                                                    chapter.id
                                                )
                                            }
                                        >
                                            Delete
                                        </button>
                                    </>

                                )}

                            </div>

                        );

                    })

                )}

            </div>

        </div>
    );
};

export default ChapterList;