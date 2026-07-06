import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../axiosConfig";
import Navbar from "../components/Navbar";

const ChapterReader = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [chapter, setChapter] = useState(null);

    const [chapters, setChapters] = useState([]);

    useEffect(() => {

        loadChapter();

    }, [id]);

    const loadChapter = async () => {

        try {

            // Load current chapter
            const chapterResponse = await api.get(
                `/chapters/${id}`
            );

            const currentChapter = chapterResponse.data;

            console.log("Current Chapter :", currentChapter);

            setChapter(currentChapter);

            // Load all chapters of this book
            const chaptersResponse = await api.get(
                `/chapters/book/${currentChapter.bookId}`
            );

            setChapters(chaptersResponse.data);

            // Save reading history only if user is logged in
            const currentUser = JSON.parse(
                localStorage.getItem("user")
            );

            if (currentUser) {

                const historyData = {

                    userEmail: currentUser.email,

                    bookId: currentChapter.bookId,

                    chapterId: currentChapter.id,

                    chapterNumber: currentChapter.chapterNumber

                };

                console.log(
                    "Saving History:",
                    historyData
                );

                try {

                    const response = await api.post(
                        "/history/save",
                        historyData
                    );

                    console.log(
                        "History Saved:",
                        response.data
                    );

                } catch (error) {

                    console.error(
                        "History Save Failed",
                        error.response?.data || error
                    );

                }

            }

        } catch (error) {

            console.error(error);

        }

    };

    if (!chapter) {

        return (

            <div>

                <Navbar />

                <h2
                    style={{
                        textAlign: "center",
                        marginTop: "60px"
                    }}
                >
                    Loading...
                </h2>

            </div>

        );

    }

    const currentIndex = chapters.findIndex(
        c => c.id === chapter.id
    );

    const previousChapter =
        currentIndex > 0
            ? chapters[currentIndex - 1]
            : null;

    const nextChapter =
        currentIndex < chapters.length - 1
            ? chapters[currentIndex + 1]
            : null;

    return (

        <div>

            <Navbar />

            <div
                style={{
                    maxWidth: "900px",
                    margin: "20px auto",
                    padding: "20px"
                }}
            >

                <h1>
                    Chapter {chapter.chapterNumber}
                </h1>

                <h2>
                    {chapter.chapterTitle}
                </h2>

                <hr />

                <div
                    style={{
                        whiteSpace: "pre-wrap",
                        lineHeight: "1.8",
                        fontSize: "18px"
                    }}
                >
                    {chapter.content}
                </div>

                <br />

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between"
                    }}
                >

                    <button
                        disabled={!previousChapter}
                        onClick={() =>
                            navigate(
                                `/chapter/${previousChapter.id}`
                            )
                        }
                    >
                        ← Previous Chapter
                    </button>

                    <button
                        disabled={!nextChapter}
                        onClick={() =>
                            navigate(
                                `/chapter/${nextChapter.id}`
                            )
                        }
                    >
                        Next Chapter →
                    </button>

                </div>

            </div>

        </div>

    );

};

export default ChapterReader;