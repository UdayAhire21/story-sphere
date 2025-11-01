import React, { Component } from 'react';
// Import the local JSON data directly
import db from '../Database/db.Json';

// Safely access data, defaulting to an empty array [] if db or db.novelsData is falsy
const novelsData = db && Array.isArray(db.novelsData) ? db.novelsData : [];

export default class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Initialize post and filteredPost safely to prevent undefined access errors
      post: novelsData,
      filteredPost: novelsData, 
      title: '',
      author: '',
      genres: '',
      description: [],
      rating: 0,
      status: '',
      thumbnail: "",
      chapters: []
    };
  }

  componentDidMount() {
    // Data is loaded instantly from the import, so we apply the initial filter.
    this.filterPosts(this.props.searchQuery || "");
  }

  // Lifecycle method to run filtering when searchQuery prop changes (live search)
  componentDidUpdate(prevProps) {
    // Check if the search query prop has actually changed
    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.filterPosts(this.props.searchQuery);
    }
  }

  filterPosts = (query) => {
    // Use this.state.post, which is guaranteed to be an array from the constructor
    const postsToFilter = this.state.post || []; 
    const lowerCaseQuery = query.toLowerCase();

    const filtered = postsToFilter.filter((item) => {
      const title = item.title ? item.title.toLowerCase() : "";
      const author = item.author ? item.author.toLowerCase() : "";
      const genres = item.genres
        ? Array.isArray(item.genres)
          ? item.genres.join(", ").toLowerCase()
          : String(item.genres).toLowerCase()
        : "";

      return (
        title.includes(lowerCaseQuery) ||
        author.includes(lowerCaseQuery) ||
        genres.includes(lowerCaseQuery)
      );
    });

    this.setState({ filteredPost: filtered });
  };

  render() {
    // Access filteredPost safely in render, defaulting to an empty array
    const posts = this.state.filteredPost || [];
    
    return (
      <div className="container">
        {/* 雫 Cards */}
        <div className="card-container d-flex flex-wrap">
          {posts.length > 0 ? (
            posts.map((item) => (
              <div
                className="card custom-card"
                key={item.id}
                id={`card-${item.id}`}
                style={{
                  color: "#0d47a1",
                  width: "18rem",
                  margin: "20px",
                  padding: "5px",
                  backgroundColor: "#ffffffff",
                  border: "2px solid #0d47a1",
                  borderRadius: "15px",
                  overflow: "hidden",
                  boxShadow: "0 6px 15px rgba(0,0,0,0.3)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow =
                    "0 12px 25px rgba(0,0,0,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 15px rgba(0,0,0,0.3)";
                }}
              >
                <img
                  src={item.thumbnail}
                  className="card-img-top"
                  alt={item.title}
                  style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "cover",
                    borderTopLeftRadius: "15px",
                    borderTopRightRadius: "15px",
                  }}
                />
                <div className="card-body" style={{ padding: "15px" }}>
                  <h5
                    className="card-title"
                    style={{ fontWeight: "bold", fontSize: "1.2rem" }}
                  >
                    {item.title}
                  </h5>
                  <p className="card-text">側 Author: {item.author}</p>
                  <p className="card-text">
                    鹿 Genres:{" "}
                    {Array.isArray(item.genres)
                      ? item.genres.join(", ")
                      : item.genres}
                  </p>
                  <p className="card-text">箝Rating: {item.rating}</p>

                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{
                      borderRadius: "25px",
                      padding: "8px 16px",
                      background:
                        "linear-gradient(135deg, #42a5f5, #1e88e5)",
                      border: "none",
                      fontWeight: "bold",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        "linear-gradient(135deg, #64b5f6, #1976d2)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        "linear-gradient(135deg, #42a5f5, #1e88e5)";
                    }}
                  >
                    当 Start Reading
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No results found...</p >
          )}
        </div>
      </div>
    );
  }
}