import { useEffect, useState } from "react";
import axios from "axios";
import ContinueReadingSidebar from "../components/ContinueReadingSidebar";
import Navbar from "../components/Navbar";
import BookCard from "../components/BookCard";
import "./Home.css";

const Home = () => {
    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {
        if (search === "") {
            axios
                .get("http://localhost:8080/books")
                .then((response) => {
                    setBooks(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            axios
                .get(`http://localhost:8080/books/search/${search}`)
                .then((response) => {
                    setBooks(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [search]);

    const deleteBook = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this book?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            await axios.delete(`http://localhost:8080/books/${id}`);
            alert("Book Deleted Successfully");
            setBooks(books.filter((book) => book.id !== id));
        } catch (error) {
            console.log(error);
            alert("Failed to delete book");
        }
    };

    const filteredBooks = books.filter((book) => {
        const matchesSearch =
            book.title?.toLowerCase().includes(search.toLowerCase()) ||
            book.author?.toLowerCase().includes(search.toLowerCase());

        const matchesCategory =
            selectedCategory === "" ||
            (book.category &&
                book.category.split(",").includes(selectedCategory));

        return matchesSearch && matchesCategory;
    });

    const categories = [
        "Fantasy",
        "Romance",
        "Horror",
        "Sci-Fi",
        "Thriller",
        "Adventure",
        "Mystery",
        "Biography",
        "History",
        "Self Help",
        "Technology",
        "Motivation"
    ];

    return (
        <div className="home-page-wrapper">
            <Navbar />
            
            {/* The Main Flex Container for Side-by-Side Layout */}
            <div
                style={{
                    display: "flex",
                    gap: "30px",
                    maxWidth: "1500px",
                    margin: "20px auto",
                    alignItems: "flex-start",
                    padding: "0 20px" // Added a slight padding so the sidebar doesn't touch the screen edge
                }}
            >
                {/* Sidebar on the Left */}
                <ContinueReadingSidebar />

                {/* Main Content Area taking up the remaining space (flex: 1) */}
                <div style={{ flex: 1 }}>
                    
                    {/* The home-container is now INSIDE the flex area! */}
                    <div className="home-container" style={{ padding: 0, margin: 0 }}>
                        <h1 className="home-title">Story Sphere</h1>

                        <div className="controls-container">
                            <input
                                type="text"
                                placeholder="🔍 Search by title or author..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="search-input"
                            />

                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="category-select"
                            >
                                <option value="">All Categories</option>
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {filteredBooks.length === 0 ? (
                            <h3 className="no-books-msg">No books found</h3>
                        ) : (
                            <div className="books-grid">
                                {filteredBooks.map((book) => (
                                    <BookCard
                                        key={book.id}
                                        book={book}
                                        deleteBook={deleteBook}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default Home;