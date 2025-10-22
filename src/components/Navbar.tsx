
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const activeStyle = {
    fontWeight: 'bold',
    color: 'blue',
  };

  return (
    <nav style={{ padding: '10px', borderBottom: '1px solid #ccc', display: 'flex', alignItems: 'center', gap: '20px' }}>
      <div style={{ fontWeight: 'bold', fontSize: '20px', cursor: 'pointer' }} onClick={() => navigate('/')}>
        LOGO
      </div>
      <NavLink to="/" style={({ isActive }) => (isActive ? activeStyle : undefined)}>Trang chủ</NavLink>
      <button onClick={() => navigate('/create')} style={{ marginLeft: 'auto' }}>Viết bài</button>
    </nav>
  );
};

export default Navbar;
