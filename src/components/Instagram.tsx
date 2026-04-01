import React from 'react';
import { INSTAGRAM_IMAGES } from '../constants';

const Instagram = () => {
  return (
    <section style={{ background: '#d4d0c8', padding: '12px 16px' }}>
      <div className="win-window" style={{ maxWidth: 960, margin: '0 auto' }}>
        {/* Title bar */}
        <div className="win-titlebar">
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 10 }}>🖼️</span>
            <span>ASSAVA Gallery — Windows Photo Viewer</span>
          </div>
          <div style={{ display: 'flex', gap: 2 }}>
            <button className="win-titlebar-btn">_</button>
            <button className="win-titlebar-btn">&#9633;</button>
            <button className="win-titlebar-btn" style={{ fontWeight: 'bold' }}>&#10005;</button>
          </div>
        </div>

        <div className="win-menubar">
          <button>File</button>
          <button>View</button>
          <button>Print</button>
          <button>Help</button>
        </div>

        {/* Toolbar */}
        <div style={{
          background: '#d4d0c8',
          borderBottom: '2px solid #808080',
          padding: '4px 8px',
          display: 'flex',
          gap: 4,
          alignItems: 'center',
        }}>
          <button className="win-btn" style={{ fontSize: 11, padding: '2px 10px' }}>&#8592; Prev</button>
          <button className="win-btn" style={{ fontSize: 11, padding: '2px 10px' }}>Next &#8594;</button>
          <div style={{ width: 1, height: 18, background: '#808080', margin: '0 4px' }} />
          <button className="win-btn" style={{ fontSize: 11, padding: '2px 10px' }}>Slideshow</button>
          <button className="win-btn" style={{ fontSize: 11, padding: '2px 10px' }}>Print</button>
          <div style={{ flex: 1 }} />
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
          >
            <button className="win-btn win-btn-primary" style={{ fontSize: 11, padding: '2px 12px' }}>
              Follow @ASSAVA
            </button>
          </a>
        </div>

        <div style={{ background: '#ffffff', padding: 12 }}>
          <div style={{ fontSize: 10, color: '#000080', fontFamily: 'Tahoma, sans-serif', marginBottom: 8 }}>
            My Pictures &gt; ASSAVA Coffee &gt; Instagram &mdash; 6 items
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
            gap: 8,
          }}>
            {INSTAGRAM_IMAGES.map((image, i) => (
              <div
                key={i}
                style={{
                  background: '#d4d0c8',
                  padding: 3,
                  borderTop: '2px solid #ffffff',
                  borderLeft: '2px solid #ffffff',
                  borderRight: '2px solid #808080',
                  borderBottom: '2px solid #808080',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 3,
                }}
                onMouseEnter={e => (e.currentTarget.style.outline = '2px dotted #000080')}
                onMouseLeave={e => (e.currentTarget.style.outline = 'none')}
              >
                <div style={{ height: 100, overflow: 'hidden', background: '#000' }}>
                  <img
                    src={image}
                    alt={`Gallery ${i + 1}`}
                    referrerPolicy="no-referrer"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    loading="lazy"
                  />
                </div>
                <div style={{ fontSize: 9, color: '#000', fontFamily: 'Tahoma, sans-serif', textAlign: 'center', padding: '1px 2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  IMG_{String(i + 1).padStart(4, '0')}.jpg
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="win-statusbar">
          <span>6 object(s)</span>
          <div style={{ flex: 1 }} />
          <span>Instagram Gallery</span>
        </div>
      </div>
    </section>
  );
};

export default Instagram;
