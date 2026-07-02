import { useState } from "react";
import api from "../axiosConfig";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

const AddChapter = () => {

    const { bookId } = useParams();

    const navigate = useNavigate();

    const [chapter, setChapter] = useState({
        chapterTitle: "",
        chapterNumber: "",
        content: "",
        bookId: bookId
    });

    const handleChange = (e) => {

        setChapter({
            ...chapter,
            [e.target.name]: e.target.value
        });
    };

   const handleSubmit = async (e) => {

    e.preventDefault();

    try {

        const currentUser =
            JSON.parse(localStorage.getItem("user"));

        const chapterData = {
            ...chapter,
            createdBy: currentUser.email
        };

        await api.post(
            "/chapters",
            chapterData
        );

        alert("Chapter Added Successfully!");

        navigate(`/book/${bookId}`);

    } catch (error) {

        console.log(error);

    }
};

    return (

        <div>

            <Navbar />

            <div style={{
                maxWidth: "800px",
                margin: "20px auto"
            }}>

                <h1>Add Chapter</h1>

                <form onSubmit={handleSubmit}>

                    <input
                        type="number"
                        name="chapterNumber"
                        placeholder="Chapter Number"
                        value={chapter.chapterNumber}
                        onChange={handleChange}
                    />

                    <br /><br />

                    <input
                        type="text"
                        name="chapterTitle"
                        placeholder="Chapter Title"
                        value={chapter.chapterTitle}
                        onChange={handleChange}
                    />

                    <br /><br />

                    <textarea
                        name="content"
                        rows="15"
                        placeholder="Chapter Content"
                        value={chapter.content}
                        onChange={handleChange}
                    />

                    <br /><br />

                    <button type="submit">
                        Add Chapter
                    </button>

                </form>

            </div>

        </div>
    );
};

export default AddChapter;