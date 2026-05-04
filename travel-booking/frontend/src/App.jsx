import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Search from './pages/Search';
import Suggestions from './pages/Suggestions';
import MyBookings from './pages/MyBookings';
import AdminPanel from './pages/AdminPanel';

function SidebarLayout({ children }) {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <div className="page-wrapper">{children}</div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
        <Routes>
          {/* Public — top navbar */}
          <Route path="/" element={<><Navbar /><Home /></>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Authenticated — sidebar layout */}
          <Route path="/search" element={
            <ProtectedRoute><SidebarLayout><Search /></SidebarLayout></ProtectedRoute>
          } />
          <Route path="/suggestions" element={
            <ProtectedRoute><SidebarLayout><Suggestions /></SidebarLayout></ProtectedRoute>
          } />
          <Route path="/my-bookings" element={
            <ProtectedRoute><SidebarLayout><MyBookings /></SidebarLayout></ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute adminOnly><SidebarLayout><AdminPanel /></SidebarLayout></ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
