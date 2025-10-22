import React from 'react';
import { Post } from '../types';
import { useNavigate } from 'react-router-dom';

interface Props {
  post: Post;
  onDelete: (id: string) => void;
}

const PostCard: React.FC<Props> = ({ post, onDelete }) => {
  const navigate = useNavigate();

  const handleDelete = () => {
    if (window.confirm('Bạn có chắc muốn xóa bài viết này?')) {
      onDelete(post.id);
    }
  };

  return (
    <div style={{ border: '1px solid #ddd', borderRadius: 4, padding: 10 }}>
      <img src={post.thumbnail} alt={post.title} style={{ width: '100%', height: 150, objectFit: 'cover', borderRadius: 4 }} />
      <h3>{post.title}</h3>
      <p><i>Tác giả:</i> {post.author}</p>
      <p><i>Ngày đăng:</i> {new Date(post.date).toLocaleDateString()}</p>
      <p>{post.content.slice(0, 100)}{post.content.length > 100 ? '...' : ''}</p>
      <div style={{ marginTop: 8 }}>
        <button onClick={() => navigate(`/posts/${post.id}`)}>Đọc thêm</button>
        <button onClick={() => navigate(`/posts/edit/${post.id}`)} style={{ marginLeft: 8 }}>Chỉnh sửa</button>
        <button onClick={handleDelete} style={{ marginLeft: 8, color: 'red' }}>Xóa</button>
      </div>
    </div>
  );
};

export default PostCard;
