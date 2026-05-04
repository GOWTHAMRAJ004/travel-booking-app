import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Plane, Shield, Star, MapPin, Clock, Users } from 'lucide-react';

const destinations = [
  { name: 'Bali', country: 'Indonesia', img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=85', price: '$599' },
  { name: 'Paris', country: 'France', img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=85', price: '$1,299' },
  { name: 'Maldives', country: 'Maldives', img: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=85', price: '$2,199' },
  { name: 'Switzerland', country: 'Europe', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=85', price: '$1,799' },
  { name: 'Thailand', country: 'Asia', img: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=85', price: '$499' },
  { name: 'Dubai', country: 'UAE', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=85', price: '$1,499' },
];

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1>Discover Your Perfect Journey</h1>
          <p>Smart travel planning tailored to your budget, style, and dreams</p>
          <div className="hero-actions">
            {user ? (
              <Link to="/search" className="btn-hero">Plan My Trip</Link>
            ) : (
              <>
                <Link to="/signup" className="btn-hero">Get Started Free</Link>
                <Link to="/login" className="btn-hero-outline">Sign In</Link>
              </>
            )}
          </div>
          <div className="hero-stats">
            <div className="stat"><strong>50+</strong><span>Destinations</span></div>
            <div className="stat"><strong>10K+</strong><span>Happy Travelers</span></div>
            <div className="stat"><strong>4.9★</strong><span>Rating</span></div>
          </div>
        </div>
      </section>

      <section className="section features-section">
        <div className="container">
          <h2 className="section-title">Why Choose TravelEase?</h2>
          <div className="features-grid">
            {[
              { icon: <Plane size={26} />, title: 'Smart Suggestions', desc: 'AI-powered recommendations based on your preferences and budget' },
              { icon: <Shield size={26} />, title: 'Secure Booking', desc: 'Your data and payments are protected with enterprise-grade security' },
              { icon: <Star size={26} />, title: 'Best Packages', desc: 'Curated travel packages with the best value for your money' },
            ].map((f) => (
              <div key={f.title} className="feature-card">
                <div className="feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section destinations-section">
        <div className="container">
          <h2 className="section-title">Popular Destinations</h2>
          <p className="section-subtitle">Explore our most loved travel destinations</p>
          <div className="destinations-grid">
            {destinations.map((d) => (
              <div key={d.name} className="dest-card">
                <div className="dest-img-wrap">
                  <img src={d.img} alt={d.name} loading="lazy" />
                  <div className="dest-overlay">
                    <Link to={user ? '/search' : '/signup'} className="btn btn-white btn-sm">Explore</Link>
                  </div>
                </div>
                <div className="dest-info">
                  <div>
                    <h3>{d.name}</h3>
                    <p><MapPin size={12} /> {d.country}</p>
                  </div>
                  <div className="dest-price">
                    <span>From</span>
                    <strong>{d.price}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section how-section">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <div className="steps-grid">
            {[
              { icon: <Users size={24} />, step: '01', title: 'Create Account', desc: 'Sign up in seconds and tell us about your travel style' },
              { icon: <MapPin size={24} />, step: '02', title: 'Enter Preferences', desc: 'Share your destination, budget, and travel dates' },
              { icon: <Star size={24} />, step: '03', title: 'Get Suggestions', desc: 'Receive personalized package recommendations instantly' },
              { icon: <Clock size={24} />, step: '04', title: 'Confirm & Go', desc: 'Book your package and wait for admin approval' },
            ].map((s) => (
              <div key={s.step} className="step-card">
                <div className="step-number">{s.step}</div>
                <div className="step-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container cta-inner">
          <h2>Ready to Start Your Adventure?</h2>
          <p>Join thousands of travelers who trust TravelEase for their dream vacations</p>
          <Link to={user ? '/search' : '/signup'} className="btn-hero">
            {user ? 'Plan My Trip' : 'Start for Free'}
          </Link>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-inner">
          <div className="footer-brand"><Plane size={20} /> <strong>TravelEase</strong></div>
          <p>© 2025 TravelEase. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
