import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { MapPin, Clock, Users, DollarSign, CheckCircle, XCircle, Clock3 } from 'lucide-react';

const statusConfig = {
  pending: { icon: <Clock3 size={15} />, label: 'Pending Approval', cls: 'status-pending' },
  approved: { icon: <CheckCircle size={15} />, label: 'Approved', cls: 'status-approved' },
  rejected: { icon: <XCircle size={15} />, label: 'Rejected', cls: 'status-rejected' },
};

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/bookings/my')
      .then(({ data }) => setBookings(data.bookings))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading-screen"><div className="spinner" /></div>;

  return (
    <div>
      <div className="page-header">
        <h1>My Bookings</h1>
        <p>Track all your travel booking requests</p>
      </div>

      {bookings.length === 0 ? (
        <div className="empty-state">
          <h3>No bookings yet</h3>
          <p>Start by searching for your dream destination</p>
          <Link to="/search" className="btn btn-primary" style={{ marginTop: 8 }}>Search Packages</Link>
        </div>
      ) : (
        <div className="bookings-list">
          {bookings.map((b) => {
            const s = statusConfig[b.status];
            return (
              <div key={b.id} className={`booking-card ${b.status}`}>
                <div className="booking-card-header">
                  <div>
                    <h3>{b.packageName}</h3>
                    <p className="booking-date">Booked on {new Date(b.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                  <span className={`status-badge ${s.cls}`}>{s.icon} {s.label}</span>
                </div>
                <div className="booking-details">
                  <span><MapPin size={14} /> {b.destination}</span>
                  <span><Clock size={14} /> {b.packageDuration}</span>
                  <span><Users size={14} /> {b.people} people</span>
                  <span><DollarSign size={14} /> ${b.packageCost?.toLocaleString()}</span>
                </div>
                {b.packageHighlights && (
                  <p className="booking-highlights"><strong>Highlights:</strong> {b.packageHighlights}</p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
