import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import Navbar from "../components/Navbar";

const EditChapter = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [chapter, setChapter] = useState({
        chapterTitle: "",
        chapterNumber: "",
        content: ""
    });

    useEffect(() => {

        axios
            .get(`http://localhost:8080/chapters/${id}`)
            .then((response) => {

                const currentUser = JSON.parse(
                    localStorage.getItem("user")
                );

                if (
                    !currentUser ||
                    response.data.createdBy !==
                    currentUser.email
                ) {

                    alert(
                        "You are not allowed to edit this chapter"
                    );

                    navigate("/");

                    return;
                }

                setChapter(response.data);

            })
            .catch((error) => {

                console.log(error);

            });

    }, [id, navigate]);

    const handleChange = (e) => {

        setChapter({
            ...chapter,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await axios.put(
                `http://localhost:8080/chapters/${id}`,
                chapter
            );

            alert(
                "Chapter Updated Successfully!"
            );

            navigate(`/chapter/${id}`);

        } catch (error) {

            console.log(error);

            alert(
                "Failed to update chapter"
            );
        }
    };

    return (

        <div>

            <Navbar />

            <div
                style={{
                    maxWidth: "800px",
                    margin: "30px auto",
                    padding: "20px",
                    border: "1px solid #ddd",
                    borderRadius: "10px"
                }}
            >

                <h1>Edit Chapter</h1>

                <form onSubmit={handleSubmit}>

                    <label>
                        Chapter Number
                    </label>

                    <br />

                    <input
                        type="number"
                        name="chapterNumber"
                        value={chapter.chapterNumber}
                        onChange={handleChange}
                        required
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginBottom: "15px"
                        }}
                    />

                    <label>
                        Chapter Title
                    </label>

                    <br />

                    <input
                        type="text"
                        name="chapterTitle"
                        value={chapter.chapterTitle}
                        onChange={handleChange}
                        required
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginBottom: "15px"
                        }}
                    />

                    <label>
                        Chapter Content
                    </label>

                    <br />

                    <textarea
                        name="content"
                        value={chapter.content}
                        onChange={handleChange}
                        rows="15"
                        required
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginBottom: "15px"
                        }}
                    />

                    <button
                        type="submit"
                    >
                        Update Chapter
                    </button>

                </form>

            </div>

        </div>
    );
};

export default EditChapter;