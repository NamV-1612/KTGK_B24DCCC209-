import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import PostPage from './pages/PostPage';
import EditPost from './pages/EditPost';

import { PostProvider } from './PostContext';

const App: React.FC = () => {
  return (
    <PostProvider>
      <BrowserRouter>
        <Navbar />
        <main style={{ paddingTop: 12 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts" element={<Home />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/posts/create" element={<CreatePost />} />
            <Route path="/posts/:id" element={<PostPage />} />
            <Route path="/posts/edit/:id" element={<EditPost />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </BrowserRouter>
    </PostProvider>
  );
};

export default App;
