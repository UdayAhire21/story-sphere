import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import BookDetails from "./pages/BookDetails";
import Reader from "./pages/Reader";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import AddChapter from "./pages/AddChapter";
import ChapterList from "./pages/ChapterList";
import ChapterReader from "./pages/ChapterReader";
import EditChapter from "./pages/EditChapter";
import MyBooks from "./pages/MyBooks";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import PendingBooks from "./pages/PendingBooks";
import PendingChapters from "./pages/PendingChapters";
import AdminBookReview from "./pages/AdminBookReview";
import AdminChapterReview from "./pages/AdminChapterReview";
function App() {
  return (
    <BrowserRouter>
      <Routes>
    <Route path="/" element={<Home />} />

    <Route path="/login" element={<Login />} />

    <Route path="/register" element={<Register />} />
    
    <Route path="/book/:id" element={<BookDetails />} />

    <Route path="/reader/:id" element={<Reader />} />

    <Route path="/add-book" element={<ProtectedRoute><AddBook /></ProtectedRoute>} />

    <Route path="/edit/:id" element={<ProtectedRoute><EditBook /></ProtectedRoute>} />

    <Route path="/add-chapter/:bookId" element={<ProtectedRoute><AddChapter /></ProtectedRoute>} />

    <Route path="/chapters/:bookId" element={<ChapterList />} />

    <Route path="/chapter/:id" element={<ProtectedRoute> <ChapterReader /> </ProtectedRoute> } />

    <Route path="/edit-chapter/:id" element={ <ProtectedRoute> <EditChapter /> </ProtectedRoute> } />

    <Route path="/my-books" element={ <ProtectedRoute> <MyBooks /> </ProtectedRoute> } />

    <Route path="/profile" element={ <ProtectedRoute> <Profile /> </ProtectedRoute> } />

    <Route path="/admin" element={<AdminDashboard />}/>

    <Route path="/admin/pending-books"element={<PendingBooks />}/>

<Route path="/admin/pending-chapters"element={<PendingChapters />}/>

<Route
    path="/admin/book/:id"
    element={<AdminBookReview />}
/>

<Route
    path="/admin/chapter/:id"
    element={<AdminChapterReview />}
/>

</Routes>             
    </BrowserRouter>
  );
}

export default App;