import { useEffect, useState } from "react";
import api from "../axiosConfig";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const PendingChapters = () => {

    const navigate = useNavigate();

    const [chapters, setChapters] = useState([]);

    useEffect(() => {

        loadPendingChapters();

    }, []);

    const loadPendingChapters = () => {

        api.get(
            "/chapters/pending"
        )
        .then((response) => {

            setChapters(response.data);

        })
        .catch((error) => {

            console.log(error);

        });
    };

    const approveChapter = async (id) => {

        try {

            await api.put(
                `/chapters/approve/${id}`
            );

            alert("Chapter Approved");

            loadPendingChapters();

        } catch (error) {

            console.log(error);

        }
    };

    const rejectChapter = async (id) => {

        try {

            await api.put(
                `/chapters/reject/${id}`
            );

            alert("Chapter Rejected");

            loadPendingChapters();

        } catch (error) {

            console.log(error);

        }
    };

    const deleteChapter = async (id) => {

    if (
        !window.confirm(
            "Are you sure?"
        )
    ) {
        return;
    }

    try {

        await api.delete(
            `/chapters/${id}`
        );

        alert(
            "Chapter Deleted Successfully"
        );

        loadPendingChapters();

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

                <h1>Pending Chapters</h1>

                {chapters.length === 0 && (

                    <h3>No Pending Chapters</h3>

                )}

                {chapters.map((chapter) => (

                    <div
                        key={chapter.id}
                        style={{
                            border: "1px solid #ddd",
                            padding: "20px",
                            marginBottom: "15px",
                            borderRadius: "10px"
                        }}
                    >

                        <h2>
                            Chapter {chapter.chapterNumber}
                        </h2>

                        <p>
                            {chapter.chapterTitle}
                        </p>

                        <p>
                            Book ID: {chapter.bookId}
                        </p>

                        <p>
                            Created By: {chapter.createdBy}
                        </p>

                        <button
    onClick={() =>
        navigate(
            `/admin/chapter/${chapter.id}`  
        ) 
    }  style={{ marginRight: "10px" }}
>
    View
</button>

<button
    onClick={() => approveChapter(chapter.id)}
    style={{ marginRight: "10px" }}
>
    Approve
</button>

<button
    onClick={() => rejectChapter(chapter.id)}style={{ marginRight: "10px" }}
>
    Reject
</button>

<button
    onClick={() =>
        deleteChapter(chapter.id)
    }style={{ marginRight: "10px" }}
>
    Delete
</button>

                    </div>

                ))}

            </div>

        </div>
    );
};

export default PendingChapters;