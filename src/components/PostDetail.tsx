import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PostContext } from '../PostContext';

const PostDetail = () => {
  const { id } = useParams();
  const ctx = useContext(PostContext);
  const navigate = useNavigate();

  if (!ctx || !id) return null;
  const { posts, deletePost } = ctx;
  const post = posts.find(p => p.id === id);
  if (!post) return <div style={{ padding: 20 }}>Bài viết không tồn tại</div>;

  const handleDelete = () => {
    if (confirm('Bạn có chắc muốn xóa bài viết này?')) {
      deletePost(post.id);
      navigate('/');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>{post.title}</h1>
      <div style={{ color: '#666', marginBottom: 12 }}>{post.author} • {new Date(post.date).toLocaleString()} • {post.category}</div>
      <img src={post.thumbnail} alt={post.title} style={{ width: '100%', maxHeight: 400, objectFit: 'cover', borderRadius: 8 }} />
      <p style={{ whiteSpace: 'pre-wrap', marginTop: 12 }}>{post.content}</p>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 12 }}>
        <button onClick={() => navigate('/')}>Quay lại</button>
        <button onClick={() => navigate(`/posts/edit/${post.id}`)}>Chỉnh sửa</button>
        <button onClick={handleDelete} style={{ color: 'red' }}>Xóa bài viết</button>
      </div>
    </div>
  );
};

export default PostDetail;
