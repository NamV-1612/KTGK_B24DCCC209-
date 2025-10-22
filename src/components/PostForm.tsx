import { useState } from 'react';
import type { Post, Category } from '../types';

interface Props {
  initialData?: Omit<Post, 'id' | 'date'>;
  onSubmit: (data: Omit<Post, 'id' | 'date'>) => void;
  onCancel: () => void;
  submitText?: string;
}

const categories: Category[] = ['Công nghệ', 'Du lịch', 'Ẩm thực', 'Đời sống', 'Khác'];

const PostForm: React.FC<Props> = ({ initialData, onSubmit, onCancel, submitText = 'Lưu' }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [author, setAuthor] = useState(initialData?.author || '');
  const [thumbnail, setThumbnail] = useState(initialData?.thumbnail || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [category, setCategory] = useState<Category>(initialData?.category || 'Công nghệ');

  const [errors, setErrors] = useState<{ [k: string]: string }>({});

  const validate = () => {
    const e: { [k: string]: string } = {};
    if (!title || title.trim().length < 10) e.title = 'Tiêu đề bắt buộc, ít nhất 10 ký tự.';
    if (!author || author.trim().length < 3) e.author = 'Tác giả bắt buộc, ít nhất 3 ký tự.';
    if (!content || content.trim().length < 50) e.content = 'Nội dung bắt buộc, ít nhất 50 ký tự.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      title: title.trim(),
      author: author.trim(),
      thumbnail: thumbnail.trim(),
      content: content.trim(),
      category,
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 800, margin: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div>
        <label>Tiêu đề</label><br />
        <input value={title} onChange={e => setTitle(e.target.value)} style={{ width: '100%', padding: 8 }} />
        {errors.title && <div style={{ color: 'red' }}>{errors.title}</div>}
      </div>

      <div>
        <label>Tác giả</label><br />
        <input value={author} onChange={e => setAuthor(e.target.value)} style={{ width: '100%', padding: 8 }} />
        {errors.author && <div style={{ color: 'red' }}>{errors.author}</div>}
      </div>

      <div>
        <label>URL ảnh thumbnail</label><br />
        <input value={thumbnail} onChange={e => setThumbnail(e.target.value)} style={{ width: '100%', padding: 8 }} />
      </div>

      <div>
        <label>Thể loại</label><br />
        <select value={category} onChange={e => setCategory(e.target.value as Category)} style={{ width: '100%', padding: 8 }}>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div>
        <label>Nội dung</label><br />
        <textarea rows={12} value={content} onChange={e => setContent(e.target.value)} style={{ width: '100%', padding: 8 }} />
        {errors.content && <div style={{ color: 'red' }}>{errors.content}</div>}
      </div>

      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
        <button type="button" onClick={onCancel}>Hủy</button>
        <button type="submit" style={{ background: '#0078d4', color: '#fff' }}>{submitText}</button>
      </div>
    </form>
  );
};

export default PostForm;
