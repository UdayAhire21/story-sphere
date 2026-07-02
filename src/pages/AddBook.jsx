import { useState } from "react";
import api from "../axiosConfig";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const AddBook = () => {
    const navigate = useNavigate();

    const [book, setBook] = useState({
        title: "",
        author: "",
        content: "",
        coverImage: "",
        cloudinaryPublicId: ""
    });

    const [uploading, setUploading] = useState(false);
    const [uploadMessage, setUploadMessage] = useState("");
    const [selectedCategories, setSelectedCategories] = useState([]);

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

    const handleChange = (e) => {
        setBook({
            ...book,
            [e.target.name]: e.target.value
        });
    };

    const handleCategoryChange = (e) => {
        const value = e.target.value;
        if (e.target.checked) {
            setSelectedCategories([...selectedCategories, value]);
        } else {
            setSelectedCategories(
                selectedCategories.filter(category => category !== value)
            );
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        setUploadMessage("Uploading image...");

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await api.post("/images/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            setBook((prev) => ({
                ...prev,
                coverImage: response.data.imageUrl,
                cloudinaryPublicId: response.data.publicId
            }));

            setUploadMessage("Image uploaded successfully ✅");
        } catch (error) {
            console.log(error);
            setUploadMessage("Upload Failed ❌");
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // MOVED THE CHECK HERE:
        if (uploading) {
            alert("Please wait until the image upload is complete.");
            return;
        }

        try {
            const currentUser = JSON.parse(localStorage.getItem("user"));

            if (!currentUser) {
                alert("Please login first");
                return;
            }

            const bookData = {
                ...book,
                category: selectedCategories.join(","),
                createdBy: currentUser.email
            };

            console.log(bookData);

            await api.post("/books", bookData);

            alert("Book Added Successfully!");
            navigate("/");
        } catch (error) {
            console.error(error);
            alert("Failed to add book");
        }
    };

    return (
        <div>
            <Navbar />
            <div
                style={{
                    maxWidth: "700px",
                    margin: "30px auto",
                    padding: "20px",
                    border: "1px solid #ddd",
                    borderRadius: "10px"
                }}
            >
                <h1>Add New Book</h1>
                <form onSubmit={handleSubmit}>
                    <label>Book Title</label>
                    <br />
                    <input
                        type="text"
                        name="title"
                        value={book.title}
                        onChange={handleChange}
                        required
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginBottom: "15px"
                        }}
                    />

                    <label>Author</label>
                    <br />
                    <input
                        type="text"
                        name="author"
                        value={book.author}
                        onChange={handleChange}
                        required
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginBottom: "15px"
                        }}
                    />

                    <label>Cover Image</label>
                    <br />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                    />
                    <p style={{ color: "#666", marginTop: "10px" }}>
                        {uploadMessage}
                    </p>
                    
                    {book.coverImage && (
                        <div style={{ marginTop: "20px" }}>
                            <img
                                src={book.coverImage}
                                alt="Preview"
                                style={{
                                    width: "220px",
                                    height: "320px",
                                    objectFit: "cover",
                                    borderRadius: "10px",
                                    border: "2px solid #ddd"
                                }}
                            />
                        </div>
                    )}

                    <h3>Categories</h3>
                    <div style={{ marginBottom: "20px" }}>
                        {categories.map((category) => (
                            <div key={category}>
                                <input
                                    type="checkbox"
                                    value={category}
                                    onChange={handleCategoryChange}
                                />{" "}
                                {category}
                            </div>
                        ))}
                    </div>

                    <label>Book Content</label>
                    <br />
                    <textarea
                        name="content"
                        value={book.content}
                        onChange={handleChange}
                        rows="10"
                        required
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginBottom: "15px"
                        }}
                    />

                    <button
                        type="submit"
                        disabled={uploading}
                        style={{
                            padding: "10px 20px",
                            cursor: uploading ? "not-allowed" : "pointer",
                            opacity: uploading ? 0.6 : 1
                        }}
                    >
                        {uploading ? "Uploading..." : "Add Book"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddBook;