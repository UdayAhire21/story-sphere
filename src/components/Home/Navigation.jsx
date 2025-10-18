import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

export const Navigation = () => {
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

      { <form className="d-flex">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          style={{ width: "400px", height: "30px" }}
        />
        <button
          className="btn btn-outline-success"
          type="submit"
          style={{ width: "100px", height: "30px" }}
        >
          Search
        </button>
      </form> }

      

      <nav className="nav-links" style={styles.navLinks}>
        <Link to="/home" style={styles.link}>
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
};
