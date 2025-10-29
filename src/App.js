import React, { useState } from 'react';
import { Home } from './components/Home/home';
import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Navigation } from './components/Home/Navigation';
import Library from './components/user/Library';
import Bookmarks from './components/user/Bookmarks';
import Profile from './components/user/profile';

export default function App() {
  // Lift search state to the common parent
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="App">
      <BrowserRouter>
        {/* Pass search state and handler to Navigation */}
        <Navigation searchQuery={searchQuery} onSearchChange={handleSearchChange} />
        <Routes>
          {/* Pass search query to Home to enable filtering in Card */}
          <Route path="/" element={<Home searchQuery={searchQuery} />} />
          <Route path="/library" element={<Library />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<h1 style={{ color: "red" }}>404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}