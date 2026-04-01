import React from 'react';
import { REVIEWS } from '../constants';
import { Star } from 'lucide-react';

const Reviews = () => {
  return (
    <section id="reviews" style={{ background: '#d4d0c8', padding: '12px 16px' }}>
      <div className="win-window" style={{ maxWidth: 960, margin: '0 auto' }}>
        {/* Title bar */}
        <div className="win-titlebar">
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 10 }}>&#11088;</span>
            <span>Customer Reviews — Notepad</span>
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
          <button>Format</button>
          <button>View</button>
          <button>Help</button>
        </div>

        {/* Table view */}
        <div style={{ background: '#ffffff', padding: 12 }}>
          <table className="win-table" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th style={{ width: 40 }}>#</th>
                <th style={{ width: 120 }}>Customer</th>
                <th>Review</th>
                <th style={{ width: 80 }}>Rating</th>
              </tr>
            </thead>
            <tbody>
              {REVIEWS.map((review, i) => (
                <tr key={review.id}>
                  <td style={{ textAlign: 'center', fontSize: 11, color: '#666' }}>{i + 1}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{
                        width: 28, height: 28, borderRadius: '50%', overflow: 'hidden', flexShrink: 0,
                        border: '1px solid #808080',
                      }}>
                        <img
                          src={review.userImage}
                          alt={review.userName}
                          referrerPolicy="no-referrer"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                      <span style={{ fontSize: 11, fontFamily: 'Tahoma, sans-serif', color: '#000080', fontWeight: 'bold', whiteSpace: 'nowrap' }}>
                        {review.userName}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div style={{ fontSize: 11, fontFamily: 'Tahoma, sans-serif', color: '#333', fontStyle: 'italic', lineHeight: 1.5 }}>
                      &ldquo;{review.text}&rdquo;
                    </div>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} size={10} fill="#c68e5d" color="#c68e5d" />
                      ))}
                    </div>
                    <div style={{ fontSize: 9, color: '#666', marginTop: 2, fontFamily: 'Tahoma, sans-serif' }}>
                      {review.rating}/5
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Add review prompt */}
          <div style={{ marginTop: 10, display: 'flex', gap: 8, alignItems: 'center' }}>
            <input
              className="win-input"
              style={{ flex: 1, fontSize: 11 }}
              placeholder="Write your review here..."
              readOnly
            />
            <button className="win-btn win-btn-primary" style={{ fontSize: 11 }}>Submit</button>
          </div>
        </div>

        <div className="win-statusbar">
          <span>{REVIEWS.length} review(s)</span>
          <div style={{ flex: 1 }} />
          <span>Average: 5.0 / 5.0</span>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
