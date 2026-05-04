import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import toast from 'react-hot-toast';
import { Search, MapPin, Calendar, Users, DollarSign, Tag } from 'lucide-react';

const travelTypes = ['Adventure', 'Relaxing', 'Family', 'Romantic', 'Luxury'];

export default function SearchPage() {
  const [form, setForm] = useState({ destination: '', days: '', people: '', budget: '', travelType: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (parseInt(form.days) < 1 || parseInt(form.people) < 1 || parseFloat(form.budget) < 1)
      return toast.error('Please enter valid numbers');
    setLoading(true);
    try {
      const { data } = await api.post('/suggestions', {
        ...form,
        days: parseInt(form.days),
        people: parseInt(form.people),
        budget: parseFloat(form.budget),
      });
      navigate('/suggestions', { state: { suggestions: data.suggestions, searchParams: form } });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to get suggestions');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1>Search Packages</h1>
        <p>Tell us your preferences and we'll find the perfect trip for you</p>
      </div>

      <div className="search-form-card">
        <div className="search-form-header">
          <Search size={22} />
          <h2>Trip Details</h2>
        </div>
        <form onSubmit={handleSubmit} className="search-form">
          <div className="search-form-grid">
            <div className="form-group">
              <label><MapPin size={14} /> Destination</label>
              <input type="text" placeholder="e.g. Bali, Paris, Thailand..."
                value={form.destination} required
                onChange={(e) => setForm({ ...form, destination: e.target.value })} />
            </div>
            <div className="form-group">
              <label><Calendar size={14} /> Number of Days</label>
              <input type="number" placeholder="e.g. 7" min="1" max="30" required
                value={form.days} onChange={(e) => setForm({ ...form, days: e.target.value })} />
            </div>
            <div className="form-group">
              <label><Users size={14} /> Number of People</label>
              <input type="number" placeholder="e.g. 2" min="1" max="20" required
                value={form.people} onChange={(e) => setForm({ ...form, people: e.target.value })} />
            </div>
            <div className="form-group">
              <label><DollarSign size={14} /> Total Budget (USD)</label>
              <input type="number" placeholder="e.g. 3000" min="100" required
                value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} />
            </div>
            <div className="form-group form-group-full">
              <label><Tag size={14} /> Travel Type (Optional)</label>
              <div className="travel-type-grid">
                {travelTypes.map((t) => (
                  <button key={t} type="button"
                    className={`type-chip ${form.travelType === t.toLowerCase() ? 'active' : ''}`}
                    onClick={() => setForm({ ...form, travelType: form.travelType === t.toLowerCase() ? '' : t.toLowerCase() })}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-full btn-lg" disabled={loading}>
            {loading ? 'Finding packages...' : 'Search Packages'}
          </button>
        </form>
      </div>
    </div>
  );
}
