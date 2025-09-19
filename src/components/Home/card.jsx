import axios from 'axios';
import React, { Component } from 'react';

export default class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: [],
      filteredPost: [], // search RS
      searchQuery: "",
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
    axios.get('http://localhost:4500/novelsData')
      .then((res) => {
        this.setState({ post: res.data, filteredPost: res.data });
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }

  handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    this.setState({ searchQuery: query });

    const filtered = this.state.post.filter((item) => {
      const title = item.title ? item.title.toLowerCase() : "";
      const author = item.author ? item.author.toLowerCase() : "";
      const genres = item.genres
        ? Array.isArray(item.genres)
          ? item.genres.join(", ").toLowerCase()
          : String(item.genres).toLowerCase()
        : "";

      return (
        title.includes(query) ||
        author.includes(query) ||
        genres.includes(query)
      );
    });

    this.setState({ filteredPost: filtered });
  };

  render() {
    return (
      <div className="container">
        {/* 🔎 Search Bar */}
        <form className="d-flex mb-3" onSubmit={(e) => e.preventDefault()}>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search by title, author, or genre"
            value={this.state.searchQuery}
            onChange={this.handleSearch}
            style={{ width: "400px", height: "35px" }}
          />
          <button
            className="btn btn-outline-success"
            type="submit"
            style={{ width: "100px", height: "35px" }}
          >
            Search
          </button>
        </form>

        {/* 🎴 Cards */}
        <div className="card-container d-flex flex-wrap">
          {this.state.filteredPost.length > 0 ? (
            this.state.filteredPost.map((item) => (
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
                  <p className="card-text">👤 Author: {item.author}</p>
                  <p className="card-text">
                    🎭 Genres:{" "}
                    {Array.isArray(item.genres)
                      ? item.genres.join(", ")
                      : item.genres}
                  </p>
                  <p className="card-text">⭐ Rating: {item.rating}</p>

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
                    📖 Start Reading
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

