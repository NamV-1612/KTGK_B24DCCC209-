import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PostForm from '../components/PostForm';
import { PostContext } from '../PostContext';
import { Post } from '../types';

const CreatePost = () => {
  const postContext = useContext(PostContext);
  const navigate = useNavigate();

  if (!postContext) return null;

  const { createPost } = postContext;

  const handleSubmit = (data: Omit<Post, 'id' | 'date'>) => {
    if (!data.thumbnail) data.thumbnail = 'https://via.placeholder.com/800x400?text=No+Image';
    createPost(data);
    alert('Đăng bài thành công!');
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Viết bài mới</h2>
      <PostForm onSubmit={handleSubmit} onCancel={handleCancel} submitText="Đăng bài" />
    </div>
  );
};

export default CreatePost;
