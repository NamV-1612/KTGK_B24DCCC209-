import { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PostContext } from '../PostContext';
import PostForm from '../components/PostForm';
import type { Post } from '../types';

const EditPost = () => {
  const { id } = useParams();
  const postContext = useContext(PostContext);
  const navigate = useNavigate();

  if (!postContext || !id) return null;

  const { posts, updatePost } = postContext;
  const post = posts.find(p => p.id === id);

  if (!post) return <div style={{ padding: 20 }}>Bài viết không tồn tại</div>;

  const handleSubmit = (data: Omit<Post, 'id' | 'date'>) => {
    updatePost(post.id, data);
    alert('Cập nhật thành công!');
    navigate(`/posts/${post.id}`);
  };

  const handleCancel = () => {
    navigate(`/posts/${post.id}`);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Chỉnh sửa bài viết</h2>
      <PostForm
        initialData={{
          title: post.title,
          author: post.author,
          thumbnail: post.thumbnail,
          content: post.content,
          category: post.category,
        }}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        submitText="Cập nhật"
      />
    </div>
  );
};

export default EditPost;
