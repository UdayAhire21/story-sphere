
import React from "react";
export default function Library() {
  return (
    <div className="library" style={{ backgroundColor: "#dcefffff" }}>
      <h1 style={{ textAlign: "center", padding: "20px" }}>Your Bookmarks</h1>
      <p style={{ textAlign: "center", color: "#555" }}>
        Here you can view all your bookmarked stories.
      </p>
      {/* Add your bookmarks content here */}
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <button
          style={{
            backgroundColor: "#1a237e",
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Back to Top
        </button>
      </div>
    </div>
  );
}
