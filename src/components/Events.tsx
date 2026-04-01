import React from 'react';
import { EVENTS } from '../constants';
import { Calendar } from 'lucide-react';

const Events = () => {
  return (
    <section id="events" style={{ background: '#d4d0c8', padding: '12px 16px' }}>
      <div className="win-window" style={{ maxWidth: 960, margin: '0 auto' }}>
        {/* Title bar */}
        <div className="win-titlebar">
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Calendar size={12} color="#fff" />
            <span>Upcoming Events — Calendar</span>
          </div>
          <div style={{ display: 'flex', gap: 2 }}>
            <button className="win-titlebar-btn">_</button>
            <button className="win-titlebar-btn">&#9633;</button>
            <button className="win-titlebar-btn" style={{ fontWeight: 'bold' }}>&#10005;</button>
          </div>
        </div>

        <div className="win-menubar">
          <button>File</button>
          <button>Edit</button>
          <button>View</button>
          <button>Help</button>
        </div>

        <div style={{ background: '#ffffff', padding: 12 }}>
          <div style={{ fontSize: 11, color: '#000080', marginBottom: 8, fontFamily: 'Tahoma, sans-serif', fontWeight: 'bold' }}>
            ASSAVA Community Events — {new Date().getFullYear()}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 10 }}>
            {EVENTS.map((event, i) => (
              <div key={event.id} className="win-window">
                {/* Inner title bar */}
                <div className="win-titlebar" style={{ background: i % 2 === 0 ? 'linear-gradient(to right, #000080, #1084d0)' : 'linear-gradient(to right, #800000, #c04040)' }}>
                  <span style={{ fontSize: 11 }}>&#128197; {event.name}</span>
                  <div style={{ display: 'flex', gap: 2 }}>
                    <button className="win-titlebar-btn">&#10005;</button>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 0 }}>
                  {/* Image */}
                  <div style={{ width: 120, height: 100, flexShrink: 0, overflow: 'hidden', borderRight: '2px solid #808080' }}>
                    <img
                      src={event.image}
                      alt={event.name}
                      referrerPolicy="no-referrer"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>

                  {/* Details */}
                  <div style={{ flex: 1, padding: '8px 10px', background: '#d4d0c8' }}>
                    <div style={{ fontSize: 10, color: '#800000', fontFamily: 'Tahoma, sans-serif', fontWeight: 'bold', marginBottom: 4 }}>
                      &#128197; {event.date}
                    </div>
                    <div style={{ fontSize: 11, fontWeight: 'bold', color: '#000080', fontFamily: 'Tahoma, sans-serif', marginBottom: 4 }}>
                      {event.name}
                    </div>
                    <div style={{ fontSize: 10, color: '#444', fontFamily: 'Tahoma, sans-serif', lineHeight: 1.5, marginBottom: 8 }}>
                      {event.description}
                    </div>
                    <button className="win-btn win-btn-primary" style={{ fontSize: 11, padding: '3px 12px' }}>
                      Reserve Spot &rarr;
                    </button>
                  </div>
                </div>

                {/* Status bar */}
                <div className="win-statusbar" style={{ fontSize: 9 }}>
                  <span>Event #{event.id}</span>
                  <div style={{ flex: 1 }} />
                  <span>{event.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="win-statusbar">
          <span>{EVENTS.length} event(s) found</span>
          <div style={{ flex: 1 }} />
          <span>Community Calendar</span>
        </div>
      </div>
    </section>
  );
};

export default Events;
