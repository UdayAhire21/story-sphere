import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css"; // Import the new CSS file here

const Navbar = () => {
    const navigate = useNavigate();

    const currentUser = JSON.parse(
        localStorage.getItem("user")
    );

    const handleLogout = () => {
        localStorage.removeItem("user");
        alert("Logged out successfully");
        navigate("/");
    };

    return (
        <nav className="navbar-container">
            <h2 
                className="navbar-brand"
                onClick={() => navigate("/")}
            >
                📚 StorySphere
            </h2>

            <div className="navbar-links">
                <Link to="/" className="nav-link">
                    Home
                </Link>

                {currentUser ? (
                    <>
                        <Link to="/my-books" className="nav-link">
                            My Books
                        </Link>

                        <Link to="/profile" className="nav-link">
                            Profile
                        </Link>

                        <Link to="/add-book" className="nav-link">
                            Add Book
                        </Link>

                        {currentUser.role === "ADMIN" && (
                            <button
                                onClick={() => navigate("/admin")}
                                className="nav-btn admin-btn"
                            >
                                Admin Dashboard
                            </button>
                        )}

                        <span className="nav-username">
                            {currentUser.username}
                        </span>

                        <button
                            onClick={handleLogout}
                            className="nav-btn logout-btn"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="nav-link">
                            Login
                        </Link>

                        <Link to="/register" className="nav-link register-link">
                            Register
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;