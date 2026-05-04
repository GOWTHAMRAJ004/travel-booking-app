import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import toast from 'react-hot-toast';
import { MapPin, Clock, Users, DollarSign, CheckCircle, Star, ArrowLeft } from 'lucide-react';

export default function Suggestions() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!state?.suggestions) { navigate('/search'); return null; }

  const { suggestions, searchParams } = state;

  const handleBook = async (pkg) => {
    setLoading(true);
    try {
      await api.post('/bookings', {
        destination: searchParams.destination,
        days: parseInt(searchParams.days),
        people: parseInt(searchParams.people),
        budget: parseFloat(searchParams.budget),
        travelType: searchParams.travelType,
        packageName: pkg.name,
        packageCost: pkg.totalCost,
        packageDuration: pkg.duration,
        packageHighlights: pkg.highlights,
      });
      setBooking(pkg.name);
      toast.success('Booking submitted! Awaiting admin approval.');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Booking failed');
    } finally {
      setLoading(false);
    }
  };

  if (booking) {
    return (
      <div className="booking-success">
        <div className="success-card">
          <CheckCircle size={60} className="success-icon" />
          <h2>Booking Submitted!</h2>
          <p>Your booking for <strong>{booking}</strong> is pending admin approval.</p>
          <p>You'll receive an email once it's confirmed.</p>
          <div className="success-actions">
            <button onClick={() => navigate('/my-bookings')} className="btn btn-primary">View My Bookings</button>
            <button onClick={() => navigate('/search')} className="btn btn-outline">Search Again</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <h1>Recommended Packages</h1>
        <p>{searchParams.destination} · {searchParams.days} days · {searchParams.people} people · ${Number(searchParams.budget).toLocaleString()} budget</p>
        <button onClick={() => navigate('/search')} className="btn btn-outline btn-sm" style={{ marginTop: 12 }}>
          <ArrowLeft size={14} /> Modify Search
        </button>
      </div>

      {suggestions.length === 0 ? (
        <div className="empty-state">
          <h3>No packages found</h3>
          <p>Try adjusting your destination or budget</p>
          <button onClick={() => navigate('/search')} className="btn btn-primary" style={{ marginTop: 8 }}>Search Again</button>
        </div>
      ) : (
        <div className="packages-grid">
          {suggestions.map((pkg) => (
            <div key={pkg.id} className="package-card">
              <div className="package-img-wrap">
                <img src={pkg.image} alt={pkg.name} loading="lazy" />
                <div className="package-badge">{pkg.travelTypes?.[0]}</div>
              </div>
              <div className="package-body">
                <h3>{pkg.name}</h3>
                <div className="package-meta">
                  <span><MapPin size={13} /> {pkg.destination}</span>
                  <span><Clock size={13} /> {pkg.duration}</span>
                  <span><Users size={13} /> {searchParams.people} people</span>
                </div>
                <div className="package-highlights">
                  <h4><Star size={13} /> Highlights</h4>
                  <ul>{pkg.highlights?.map((h) => <li key={h}>{h}</li>)}</ul>
                </div>
                <div className="package-footer">
                  <div className="package-price">
                    <span>Total Cost</span>
                    <strong><DollarSign size={15} />{pkg.totalCost?.toLocaleString()}</strong>
                    <small>${pkg.costPerPersonPerDay}/person/day</small>
                  </div>
                  <button className="btn btn-primary" onClick={() => handleBook(pkg)} disabled={loading}>
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
