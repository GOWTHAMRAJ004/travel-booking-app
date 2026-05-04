import { useState, useEffect } from 'react';
import api from '../api/axios';
import toast from 'react-hot-toast';
import { CheckCircle, XCircle, Clock3, MapPin, Clock, Users, DollarSign, Mail } from 'lucide-react';

const statusConfig = {
  pending: { icon: <Clock3 size={14} />, label: 'Pending', cls: 'status-pending' },
  approved: { icon: <CheckCircle size={14} />, label: 'Approved', cls: 'status-approved' },
  rejected: { icon: <XCircle size={14} />, label: 'Rejected', cls: 'status-rejected' },
};

export default function AdminPanel() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [updating, setUpdating] = useState(null);

  useEffect(() => { fetchBookings(); }, []);

  const fetchBookings = async () => {
    try {
      const { data } = await api.get('/bookings/admin/all');
      setBookings(data.bookings);
    } catch { toast.error('Failed to load bookings'); }
    finally { setLoading(false); }
  };

  const updateStatus = async (id, status) => {
    setUpdating(id);
    try {
      const { data } = await api.patch(`/bookings/admin/${id}`, { status });
      setBookings((prev) => prev.map((b) => (b.id === id ? data.booking : b)));
      toast.success(`Booking ${status}`);
    } catch { toast.error('Failed to update booking'); }
    finally { setUpdating(null); }
  };

  const filtered = filter === 'all' ? bookings : bookings.filter((b) => b.status === filter);
  const counts = {
    all: bookings.length,
    pending: bookings.filter((b) => b.status === 'pending').length,
    approved: bookings.filter((b) => b.status === 'approved').length,
    rejected: bookings.filter((b) => b.status === 'rejected').length,
  };

  if (loading) return <div className="loading-screen"><div className="spinner" /></div>;

  return (
    <div>
      <div className="page-header">
        <h1>Admin Panel</h1>
        <p>Manage all travel booking requests</p>
      </div>

      <div className="admin-stats">
        {[
          { key: 'all', label: 'Total Bookings', color: '#6366f1' },
          { key: 'pending', label: 'Pending', color: '#f59e0b' },
          { key: 'approved', label: 'Approved', color: '#10b981' },
          { key: 'rejected', label: 'Rejected', color: '#ef4444' },
        ].map((s) => (
          <div key={s.key} className="admin-stat-card" style={{ borderTopColor: s.color }}>
            <strong style={{ color: s.color }}>{counts[s.key]}</strong>
            <span>{s.label}</span>
          </div>
        ))}
      </div>

      <div className="filter-tabs">
        {['all', 'pending', 'approved', 'rejected'].map((f) => (
          <button key={f} className={`filter-tab ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
            {f.charAt(0).toUpperCase() + f.slice(1)} ({counts[f]})
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state"><h3>No bookings found</h3></div>
      ) : (
        <div className="admin-bookings-list">
          {filtered.map((b) => {
            const s = statusConfig[b.status];
            return (
              <div key={b.id} className="admin-booking-card">
                <div className="admin-booking-header">
                  <div>
                    <h3>{b.packageName}</h3>
                    <div className="user-info"><Mail size={13} /><span>{b.user?.name} — {b.user?.email}</span></div>
                  </div>
                  <span className={`status-badge ${s.cls}`}>{s.icon} {s.label}</span>
                </div>
                <div className="booking-details">
                  <span><MapPin size={14} /> {b.destination}</span>
                  <span><Clock size={14} /> {b.packageDuration}</span>
                  <span><Users size={14} /> {b.people} people</span>
                  <span><DollarSign size={14} /> ${b.packageCost?.toLocaleString()}</span>
                </div>
                <div className="booking-meta">
                  <span>Budget: ${b.budget?.toLocaleString()}</span>
                  <span>Type: {b.travelType || 'Not specified'}</span>
                  <span>Submitted: {new Date(b.createdAt).toLocaleDateString()}</span>
                </div>
                {b.status === 'pending' && (
                  <div className="admin-actions">
                    <button className="btn btn-success btn-sm" onClick={() => updateStatus(b.id, 'approved')} disabled={updating === b.id}>
                      <CheckCircle size={15} /> Approve
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => updateStatus(b.id, 'rejected')} disabled={updating === b.id}>
                      <XCircle size={15} /> Reject
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
