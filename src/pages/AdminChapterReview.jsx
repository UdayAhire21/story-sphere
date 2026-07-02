import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../axiosConfig";

import Navbar from "../components/Navbar";

const AdminChapterReview = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [chapter, setChapter] = useState(null);

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
            `/chapters/${id}`
        )
        .then((response) => {

            setChapter(response.data);

        })
        .catch((error) => {

            console.log(error);

        });

    }, [id, navigate]);

    const approveChapter = async () => {

        try {

            await api.put(
                `/chapters/approve/${id}`
            );

            alert("Chapter Approved");

            navigate(
                "/admin/pending-chapters"
            );

        } catch (error) {

            console.log(error);

        }
    };

    const rejectChapter = async () => {

        try {

            await api.put(
                `/chapters/reject/${id}`
            );

            alert("Chapter Rejected");

            navigate(
                "/admin/pending-chapters"
            );

        } catch (error) {

            console.log(error);

        }
    };

    if (!chapter) {

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

                <h1>
                    Chapter {chapter.chapterNumber}
                </h1>

                <h2>
                    {chapter.chapterTitle}
                </h2>

                <p>
                    Book ID: {chapter.bookId}
                </p>

                <p>
                    Created By:
                    {" "}
                    {chapter.createdBy}
                </p>

                <hr />

                <h2>Chapter Content</h2>

                <p
                    style={{
                        whiteSpace: "pre-wrap",
                        lineHeight: "1.8"
                    }}
                >
                    {chapter.content}
                </p>

                <br />

                <button
                    onClick={approveChapter}
                    style={{
                        marginRight: "10px"
                    }}
                >
                    Approve
                </button>

                <button
                    onClick={rejectChapter}
                >
                    Reject
                </button>

            </div>

        </div>
    );
};

export default AdminChapterReview;