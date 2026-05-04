import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Plane, LogOut, User, LayoutDashboard } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          <Plane size={28} />
          <span>TravelEase</span>
        </Link>
        <div className="navbar-links">
          {!user ? (
            <>
              <Link to="/login" className="btn btn-ghost">Login</Link>
              <Link to="/signup" className="btn btn-primary">Sign Up</Link>
            </>
          ) : (
            <>
              <Link to="/search" className="nav-link">Search</Link>
              <Link to="/my-bookings" className="nav-link">My Bookings</Link>
              {user.role === 'admin' && (
                <Link to="/admin" className="nav-link admin-link">
                  <LayoutDashboard size={16} /> Admin
                </Link>
              )}
              <div className="nav-user">
                <User size={16} />
                <span>{user.name}</span>
              </div>
              <button onClick={handleLogout} className="btn btn-ghost btn-sm">
                <LogOut size={16} /> Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
