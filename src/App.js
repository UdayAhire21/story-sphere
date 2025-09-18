import React from 'react';
import { Home } from './components/Home/home';
import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Navigation } from './components/Home/Navigation';
import Library from './components/user/Library';
import Bookmarks from './components/user/Bookmarks';
import Profile from './components/user/profile';

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/library" element={<Library />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<h1 style={{ color: "red" }}>404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
