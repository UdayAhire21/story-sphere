import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../axiosConfig";

import Navbar from "../components/Navbar";

const EditBook = () => {

    const { id } = useParams();

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

    const [selectedCategories, setSelectedCategories] =
    useState([]);

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

    useEffect(() => {

        api.get(
            `http://localhost:8080/books/${id}`
        )
        .then((response) => {

            const currentUser = JSON.parse(
                localStorage.getItem("user")
            );

            if (
    !currentUser ||
    (
        currentUser.role !== "ADMIN" &&
        response.data.createdBy !== currentUser.email
    )
)
{
    alert(
        "You are not allowed to edit this book"
    );

    navigate("/");

    return;
}

            setBook(response.data);

            setSelectedCategories(

    response.data.category
        ? response.data.category.split(",")
        : []

);

        })
        .catch((error) => {

            console.log(error);

        });

    }, [id, navigate]);

    const handleChange = (e) => {

        setBook({
            ...book,
            [e.target.name]: e.target.value
        });
    };

    const handleCategoryChange = (e) => {

    const value = e.target.value;

    if (e.target.checked) {

        setSelectedCategories([
            ...selectedCategories,
            value
        ]);

    } else {

        setSelectedCategories(

            selectedCategories.filter(
                category =>
                    category !== value
            )

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

        const response = await api.post(

            "/images/upload",

            formData,

            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }

        );

        setBook((prev) => ({

            ...prev,

            coverImage: response.data.imageUrl,

            cloudinaryPublicId: response.data.publicId

        }));

        setUploadMessage(
            "Image uploaded successfully ✅"
        );

    } catch (error) {

        console.log(error);

        setUploadMessage(
            "Image upload failed ❌"
        );

    } finally {

        setUploading(false);

    }

};

if (uploading) {

    alert(
        "Please wait until image upload finishes."
    );

    return;
}
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const updatedBook = {

    ...book,

    category:
        selectedCategories.join(",")

};

await api.put(
    `http://localhost:8080/books/${id}`,
    updatedBook
);

            alert(
                "Book Updated Successfully!"
            );

            navigate("/");

        } catch (error) {

            console.log(error);

            alert(
                "Failed to update book"
            );
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

                <h1>Edit Book</h1>

                

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

                    <label>Book Cover</label>

<br />

<input
    type="file"
    accept="image/*"
    onChange={handleImageUpload}
/>

<p
    style={{
        color: "#666",
        marginTop: "10px"
    }}
>
    {uploadMessage}
</p>

                    <h3>Categories</h3>

<div
    style={{
        marginBottom: "20px"
    }}
>

    {categories.map((category) => (

        <div key={category}>

            <input
                type="checkbox"
                value={category}
                checked={
                    selectedCategories.includes(
                        category
                    )
                }
                onChange={
                    handleCategoryChange
                }
            />

            {" "}

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
        cursor: uploading
            ? "not-allowed"
            : "pointer",
        opacity: uploading
            ? 0.6
            : 1
    }}
>
    {
        uploading
            ? "Uploading..."
            : "Update Book"
    }
</button>

                </form>

                {book.coverImage && (

                    <div
                        style={{
                            marginTop: "20px"
                        }}
                    >

                        <h3>
                            Cover Preview
                        </h3>

                        <img
    src={book.coverImage}
    alt="Cover Preview"
    style={{
        width: "250px",
        height: "350px",
        objectFit: "cover",
        borderRadius: "10px",
        border: "2px solid #ddd"
    }}
/>

                    </div>

                )}

            </div>

        </div>
    );
};

export default EditBook;