import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

// Accept searchQuery and onSearchChange as props
export const Navigation = ({ searchQuery, onSearchChange }) => { 
  // Function to prevent form submission and page reload
  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div style={styles.navbar}>
      <h2
        className="heading"
        style={{
          color: "#ffffffff",
          textDecoration: "none",
          fontSize: "24px",
        }}
      >
        StorySphere
      </h2>

      {/* Functional Search Bar using props - adjusted to fit in navbar */}
      <form className="d-flex" onSubmit={handleSearchSubmit} style={styles.searchForm}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search..."
          aria-label="Search"
          value={searchQuery}
          onChange={onSearchChange}
          style={styles.searchInput}
        />
        <button
          className="btn btn-outline-success"
          type="submit"
          style={styles.searchButton}
        >
          Search
        </button>
      </form>

      

      <nav className="nav-links" style={styles.navLinks}>
        {/* Updated path for Home route as per App.js */}
        <Link to="/" style={styles.link}>
          Home
        </Link>
        <Link to="/Library" style={styles.link}>
          Library
        </Link>
        <Link to="/Bookmarks" style={styles.link}>
          Bookmarks
        </Link>
        <Link to="/Profile" style={styles.link}>
          Profile
        </Link>
      </nav>

      <Outlet></Outlet>
    </div>  
  );
};

const styles = {
  navLinks: {
    display: "flex",
    gap: "15px",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "18px",
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#1a237e",
    height: "40px",
  },
  // Added styles for the search bar to fit the navbar
  searchForm: {
    display: "flex",
    alignItems: "center",
    gap: "10px", 
  },
  searchInput: {
    width: "200px", // Reduced width
    height: "25px", // Reduced height
    padding: "0 10px",
    borderRadius: "5px",
    border: "1px solid #ced4da",
  },
  searchButton: {
    width: "80px", // Reduced width
    height: "25px", // Reduced height
    lineHeight: "15px",
    fontSize: "12px",
    padding: "0",
  },
};