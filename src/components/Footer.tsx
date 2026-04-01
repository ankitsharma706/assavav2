import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{ background: '#d4d0c8', padding: '12px 16px 48px' }}>
      <div className="win-window" style={{ maxWidth: 960, margin: '0 auto' }}>
        {/* Title bar */}
        <div className="win-titlebar">
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 10 }}>☕</span>
            <span>ASSAVA Coffee Platform — About</span>
          </div>
          <div style={{ display: 'flex', gap: 2 }}>
            <button className="win-titlebar-btn">_</button>
            <button className="win-titlebar-btn">&#9633;</button>
            <button className="win-titlebar-btn" style={{ fontWeight: 'bold' }}>&#10005;</button>
          </div>
        </div>

        <div style={{ background: '#d4d0c8', padding: 16 }}>
          {/* Marquee */}
          <div style={{ marginBottom: 12, borderTop: '1px solid #808080', borderBottom: '1px solid #fff', padding: '3px 0' }}>
            <marquee style={{ fontSize: 11, color: '#000080', fontFamily: 'Tahoma, sans-serif' }}>
              *** ASSAVA Coffee Platform &copy; 2026 *** Roasted to perfection *** Free shipping on orders over $80 *** ritual@assava.coffee *** Brooklyn, NY 11201 ***
            </marquee>
          </div>

          {/* 4-column grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 12 }}>
            {/* Brand */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', overflow: 'hidden', border: '1px solid #808080' }}>
                  <img src="/logo.png" alt="ASSAVA" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                <span style={{ fontWeight: 'bold', fontSize: 13, color: '#000080', fontFamily: 'Tahoma, sans-serif' }}>ASSAVA</span>
              </div>
              <p style={{ fontSize: 10, color: '#444', fontFamily: 'Tahoma, sans-serif', lineHeight: 1.6, marginBottom: 8 }}>
                Igniting the soul through cinematic coffee experiences. Crafted with precision for the modern ritual.
              </p>
              <div style={{ display: 'flex', gap: 4 }}>
                <button className="win-btn" style={{ fontSize: 10, padding: '2px 6px' }}>IG</button>
                <button className="win-btn" style={{ fontSize: 10, padding: '2px 6px' }}>TW</button>
                <button className="win-btn" style={{ fontSize: 10, padding: '2px 6px' }}>FB</button>
              </div>
            </div>

            {/* Experience */}
            <div className="win-groupbox" style={{ position: 'relative' }}>
              <div className="win-groupbox-label">Experience</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
                {[
                  { label: 'Our Story', path: '/about' },
                  { label: 'Roasting Process', path: '/about' },
                  { label: 'Brewing Guides', path: '/about' },
                  { label: 'Locations', path: '/category' },
                ].map(item => (
                  <li key={item.label}>
                    <Link to={item.path} className="win-link" style={{ fontSize: 11 }}>
                      &gt; {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Collection */}
            <div className="win-groupbox" style={{ position: 'relative' }}>
              <div className="win-groupbox-label">Collection</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
                {[
                  { label: 'The Roastery', path: '/shopping' },
                  { label: 'Global Spaces', path: '/category' },
                  { label: 'Special Reserve', path: '/shopping' },
                  { label: 'Membership', path: '/account' },
                ].map(item => (
                  <li key={item.label}>
                    <Link to={item.path} className="win-link" style={{ fontSize: 11 }}>
                      &gt; {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="win-groupbox" style={{ position: 'relative' }}>
              <div className="win-groupbox-label">Contact</div>
              <div style={{ fontSize: 11, fontFamily: 'Tahoma, sans-serif', color: '#444', lineHeight: 1.8 }}>
                <div>ritual@assava.coffee</div>
                <div>Brooklyn, NY 11201</div>
                <div style={{ marginTop: 6 }}>
                  <Link to="/about" className="win-link" style={{ fontSize: 11 }}>&gt; Contact Us</Link>
                </div>
              </div>

              {/* Newsletter */}
              <div style={{ marginTop: 10 }}>
                <div style={{ fontSize: 10, fontWeight: 'bold', color: '#000080', marginBottom: 4 }}>Newsletter</div>
                <div style={{ display: 'flex', gap: 4 }}>
                  <input className="win-input" style={{ flex: 1, fontSize: 10 }} placeholder="your@email.com" />
                  <button className="win-btn win-btn-primary" style={{ fontSize: 10, padding: '2px 6px' }}>OK</button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom separator */}
          <hr className="win-separator" />

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8, flexWrap: 'wrap', gap: 8 }}>
            <span style={{ fontSize: 10, color: '#666', fontFamily: 'Tahoma, sans-serif' }}>
              &copy; 2026 ASSAVA COFFEE PLATFORM. All rights reserved. | Privacy Policy | Terms of Service
            </span>
            <button
              className="win-btn"
              onClick={scrollToTop}
              style={{ fontSize: 10, padding: '3px 10px' }}
            >
              &#8593; Back to Top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
