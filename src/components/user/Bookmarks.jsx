import React from 'react';
export default function Bookmarks() {
  return (
    <div className="Bookmarks" style={{ backgroundColor: "#dcefffff" }}>
      <h1 style={{ textAlign: "center", padding: "20px" }}>Your Bookmarks</h1>
      <p style={{ textAlign: "center", color: "#555" }}>
        Here you can view all your bookmarked stories.
      </p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Back to Top
        </button>
    </div>
  );
}