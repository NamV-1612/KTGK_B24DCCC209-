import { createContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { Post } from './types';

type NewPost = Omit<Post, 'id' | 'date'>;

interface PostContextType {
  posts: Post[];
  createPost: (p: NewPost) => void;
  updatePost: (id: string, data: Partial<Post>) => void;
  deletePost: (id: string) => void;
}

export const PostContext = createContext<PostContextType | undefined>(undefined);

// sample posts to show on first run
const samplePosts: Post[] = [
  {
    id: '1',
    title: 'Hướng dẫn React cơ bản cho người mới',
    author: 'Nguyễn A',
    thumbnail: 'https://via.placeholder.com/800x400?text=React',
    content: 'React là thư viện xây dựng giao diện người dùng... '.repeat(20),
    category: 'Công nghệ',
    date: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Kinh nghiệm du lịch Đà Lạt',
    author: 'Trần B',
    thumbnail: 'https://via.placeholder.com/800x400?text=Đà+Lạt',
    content: 'Đà Lạt có khí hậu mát mẻ... '.repeat(20),
    category: 'Du lịch',
    date: new Date(Date.now() - 5 * 86400000).toISOString(),
  },
  {
    id: '3',
    title: 'Món phở Hà Nội truyền thống',
    author: 'Lê C',
    thumbnail: 'https://via.placeholder.com/800x400?text=Phở',
    content: 'Phở là món ăn truyền thống... '.repeat(20),
    category: 'Ẩm thực',
    date: new Date(Date.now() - 10 * 86400000).toISOString(),
  },
  {
    id: '4',
    title: 'Sống tối giản: bắt đầu từ đâu?',
    author: 'Phạm D',
    thumbnail: 'https://via.placeholder.com/800x400?text=Tối+giản',
    content: 'Tối giản là lối sống... '.repeat(20),
    category: 'Đời sống',
    date: new Date(Date.now() - 20 * 86400000).toISOString(),
  },
  {
    id: '5',
    title: 'Công nghệ AI sẽ thay đổi thế giới',
    author: 'Hoàng E',
    thumbnail: 'https://via.placeholder.com/800x400?text=AI',
    content: 'AI đang phát triển nhanh... '.repeat(20),
    category: 'Công nghệ',
    date: new Date(Date.now() - 30 * 86400000).toISOString(),
  },
];

export const PostProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<Post[]>(() => {
    const raw = localStorage.getItem('posts_v1');
    return raw ? (JSON.parse(raw) as Post[]) : samplePosts;
  });

  useEffect(() => {
    localStorage.setItem('posts_v1', JSON.stringify(posts));
  }, [posts]);

  const createPost = (p: NewPost) => {
    const newPost: Post = {
      ...p,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };
    setPosts(prev => [newPost, ...prev]);
  };

  const updatePost = (id: string, data: Partial<Post>) => {
    setPosts(prev => prev.map(x => (x.id === id ? { ...x, ...data } : x)));
  };

  const deletePost = (id: string) => {
    setPosts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <PostContext.Provider value={{ posts, createPost, updatePost, deletePost }}>
      {children}
    </PostContext.Provider>
  );
};
