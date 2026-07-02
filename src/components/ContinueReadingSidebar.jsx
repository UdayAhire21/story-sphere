import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axiosConfig";

const ContinueReadingSidebar = () => {

    const navigate = useNavigate();

    const [history, setHistory] = useState([]);

    useEffect(() => {

        const currentUser = JSON.parse(
            localStorage.getItem("user")
        );

        if (!currentUser) {
            return;
        }

        loadHistory(currentUser.email);

    }, []);

    const loadHistory = async (email) => {

        try {

            const response = await api.get(
                `/history/user/${email}`
            );

            setHistory(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div
            style={{
                width: "320px",
                background: "#ffffff",
                borderRadius: "12px",
                padding: "20px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                position: "sticky",
                top: "20px",
                height: "fit-content"
            }}
        >

            <h2
                style={{
                    marginBottom: "20px",
                    color: "#ff6600"
                }}
            >
                📚 Continue Reading
            </h2>

            {

                history.length === 0 ?

                (

                    <p>No reading history.</p>

                )

                :

                history.map((book) => (

                    <div
                        key={book.bookId}
                        style={{
                            marginBottom: "20px",
                            borderBottom: "1px solid #ddd",
                            paddingBottom: "20px"
                        }}
                    >

                        <img
                            src={book.coverImage}
                            alt={book.title}
                            style={{
                                width: "100%",
                                height: "180px",
                                objectFit: "cover",
                                borderRadius: "10px"
                            }}
                        />

                        <h3
                            style={{
                                marginTop: "10px"
                            }}
                        >
                            {book.title}
                        </h3>

                        <p>

                            Continue from Chapter {book.chapterNumber}

                        </p>

                        <button

                            onClick={() =>
                                navigate(
                                    `/chapter/${book.chapterId}`
                                )
                            }

                            style={{
                                width: "100%",
                                padding: "10px",
                                background: "#ff6600",
                                color: "white",
                                border: "none",
                                borderRadius: "8px",
                                cursor: "pointer"
                            }}
                        >

                            Continue Reading

                        </button>

                    </div>

                ))

            }

        </div>

    );

};

export default ContinueReadingSidebar;