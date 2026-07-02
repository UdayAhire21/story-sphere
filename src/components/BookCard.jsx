import { useNavigate } from "react-router-dom";
import "./BookCard.css"; // Import the CSS file here

const BookCard = ({ book, deleteBook }) => {
    const navigate = useNavigate();

    const currentUser = JSON.parse(
        localStorage.getItem("user")
    );

    const canManageBook =
        currentUser && (
            currentUser.role === "ADMIN" ||
            currentUser.email === book.createdBy
        );

    return (
        <div className="book-card">
            <img
                src={
                    book.coverImage ||
                    "https://via.placeholder.com/250x300?text=No+Cover"
                }
                alt={book.title}
                className="book-cover"
            />

            <h2 className="book-title">
                {book.title}
            </h2>

            <p className="book-detail">
                <strong>Author:</strong> {book.author}
            </p>

            <p className="book-detail">
                <strong>Category:</strong> {book.category}
            </p>

            <div className="book-actions">
                <button
                    className="card-btn read-btn"
                    onClick={() => navigate(`/book/${book.id}`)}
                >
                    Read
                </button>

                {canManageBook && (
                    <>
                        <button
                            className="card-btn edit-btn"
                            onClick={() => navigate(`/edit/${book.id}`)}
                        >
                            Edit
                        </button>

                        <button
                            className="card-btn delete-btn"
                            onClick={() => deleteBook(book.id)}
                        >
                            Delete
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default BookCard;