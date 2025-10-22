import React, { useContext, useState } from 'react';
import { PostContext } from '../PostContext';
import PostCard from './PostCard';

const PostList = () => {
  const postContext = useContext(PostContext);
  const [filter, setFilter] = useState('');

  if (!postContext) return null;

  const { posts, deletePost } = postContext;

  const filteredPosts = posts.filter(post => post.title.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div style={{ padding: '20px' }}>
      <h2>Danh sách bài viết ({filteredPosts.length})</h2>
      <input
        type="text"
        placeholder="Tìm kiếm theo tiêu đề..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{ marginBottom: 20, width: '100%', padding: '8px' }}
      />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
        }}
      >
        {filteredPosts.map(post => (
          <PostCard key={post.id} post={post} onDelete={() => deletePost(post.id)} />
        ))}
      </div>
    </div>
  );
};

export default PostList;
