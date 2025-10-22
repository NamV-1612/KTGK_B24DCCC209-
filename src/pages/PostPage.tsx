import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PostContext } from '../PostContext';

const PostPage = () => {
  const { id } = useParams();
  const postContext = useContext(PostContext);
  const navigate = useNavigate();

  if (!postContext || !id) return null;

  const { posts, deletePost } = postContext;
  const post = posts.find(p => p.id === id);

  if (!post) return <div style={{ padding: 20 }}>Bài viết không tồn tại</div>;

  const handleDelete = () => {
    if (window.confirm('Bạn có chắc muốn xóa bài viết này?')) {
      deletePost(post.id);
      navigate('/');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>{post.title}</h2>
      <p><b>Tác giả:</b> {post.author}</p>
      <p><b>Ngày đăng:</b> {new Date(post.date).toLocaleDateString('vi-VN')}</p>
      <p><b>Thể loại:</b> {post.category}</p>
      <img src={post.thumbnail} alt={post.title} style={{ maxWidth: '100%', maxHeight: 300, objectFit: 'cover' }} />
      <p style={{ whiteSpace: 'pre-wrap', marginTop: 20 }}>{post.content}</p>

      <div style={{ marginTop: 12 }}>
        <button onClick={() => navigate('/')}>Quay lại</button>
        <button onClick={() => navigate(`/posts/edit/${post.id}`)} style={{ marginLeft: 10 }}>Chỉnh sửa</button>
        <button onClick={handleDelete} style={{ marginLeft: 10, color: 'red' }}>Xóa bài viết</button>
      </div>
    </div>
  );
};

export default PostPage;
