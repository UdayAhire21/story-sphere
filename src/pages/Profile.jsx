import { useEffect, useState } from "react";
import api from "../axiosConfig";

import Navbar from "../components/Navbar";

const Profile = () => {

    const currentUser = JSON.parse(
        localStorage.getItem("user")
    );

    const [books, setBooks] = useState([]);

    const [chapters, setChapters] = useState([]);

    const [categories, setCategories] =
        useState([]);

    useEffect(() => {

        if (!currentUser) {
            return;
        }

        api
            .get(
                `/books/my-books/${currentUser.email}`
            )
            .then((response) => {

                setBooks(response.data);

                const allCategories = [];

                response.data.forEach((book) => {

                    if (book.category) {

                        const splitCategories =
                            book.category.split(",");

                        splitCategories.forEach(
                            (category) => {

                                if (
                                    !allCategories.includes(
                                        category
                                    )
                                ) {

                                    allCategories.push(
                                        category
                                    );
                                }
                            }
                        );
                    }
                });

                setCategories(allCategories);

            })
            .catch((error) => {

                console.log(error);

            });

        api
            .get(
                `/chapters/author/${currentUser.email}`
            )
            .then((response) => {

                setChapters(response.data);

            })
            .catch((error) => {

                console.log(error);

            });

    }, [currentUser]);

    return (

        <div>

            <Navbar />

            <div
                style={{
                    maxWidth: "800px",
                    margin: "30px auto",
                    padding: "25px",
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    backgroundColor: "#fff"
                }}
            >

                <h1>
                    👤 My Profile
                </h1>

                <hr />

                <h3>
                    Email
                </h3>

                <p>
                    {currentUser?.email}
                </p>

                <h3>
                    📚 Books Published
                </h3>

                <p>
                    {books.length}
                </p>

                <h3>
                    📖 Chapters Published
                </h3>

                <p>
                    {chapters.length}
                </p>

                <h3>
                    🏷 Categories Used
                </h3>

                {categories.length === 0 ? (

                    <p>
                        No categories found
                    </p>

                ) : (

                    <ul>

                        {categories.map(
                            (category, index) => (

                                <li key={index}>
                                    {category}
                                </li>

                            )
                        )}

                    </ul>

                )}

            </div>

        </div>
    );
};

export default Profile;