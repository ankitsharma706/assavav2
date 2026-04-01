import React from 'react';
import { PRODUCTS } from '../constants';
import { ShowcaseCard } from './CoffeeComponents';

const Collection = ({ onAddToCart }: { onAddToCart: (item: any) => void }) => {
  return (
    <section id="collection" style={{ background: '#d4d0c8', padding: '0' }}>
      {/* Section window header */}
      <div style={{ background: '#d4d0c8', padding: '12px 16px 0' }}>
        <div
          className="win-window"
          style={{ marginBottom: 0 }}
        >
          {/* Title bar */}
          <div className="win-titlebar">
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 10 }}>📁</span>
              <span>Coffee Collection — Windows Explorer</span>
            </div>
            <div style={{ display: 'flex', gap: 2 }}>
              <button className="win-titlebar-btn">_</button>
              <button className="win-titlebar-btn">&#9633;</button>
              <button className="win-titlebar-btn" style={{ fontWeight: 'bold' }}>&#10005;</button>
            </div>
          </div>

          {/* Explorer toolbar */}
          <div className="win-menubar">
            <button>File</button>
            <button>Edit</button>
            <button>View</button>
            <button>Favorites</button>
            <button>Tools</button>
            <button>Help</button>
          </div>

          <div style={{ background: '#d4d0c8', borderBottom: '2px solid #808080', padding: '4px 8px', display: 'flex', gap: 4, alignItems: 'center' }}>
            <button className="win-btn" style={{ fontSize: 11, padding: '2px 8px' }}>&#8592; Back</button>
            <button className="win-btn" style={{ fontSize: 11, padding: '2px 8px' }}>Forward &#8594;</button>
            <button className="win-btn" style={{ fontSize: 11, padding: '2px 8px' }}>&#8593; Up</button>
            <div style={{ width: 1, height: 18, background: '#808080', margin: '0 2px' }} />
            <button className="win-btn" style={{ fontSize: 11, padding: '2px 8px' }}>Views</button>
            <div className="win-addressbar" style={{ flex: 1, fontSize: 11 }}>
              C:\ASSAVA\Coffee_Collection\
            </div>
          </div>

          {/* Explorer content area with sidebar */}
          <div style={{ display: 'flex', background: '#ffffff', borderTop: 'none' }}>
            {/* Left sidebar */}
            <div style={{ width: 160, background: '#d4d0c8', borderRight: '2px solid #808080', padding: '8px 6px', flexShrink: 0 }}>
              <div style={{ fontWeight: 'bold', fontSize: 11, color: '#000080', marginBottom: 6, fontFamily: 'Tahoma, sans-serif' }}>
                Folders
              </div>
              {[
                { label: 'Desktop', icon: '🖥️' },
                { label: 'My Documents', icon: '📄' },
                { label: 'Coffee Collection', icon: '📁', active: true },
                { label: '  ├ Espresso', icon: '☕' },
                { label: '  ├ Pour Over', icon: '🫗' },
                { label: '  └ Special Reserve', icon: '💎' },
                { label: 'Recycle Bin', icon: '🗑️' },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 4,
                    padding: '2px 4px',
                    fontSize: 10, fontFamily: 'Tahoma, sans-serif',
                    background: item.active ? '#000080' : 'transparent',
                    color: item.active ? '#fff' : '#000',
                    cursor: 'default',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              ))}

              <div style={{ borderTop: '1px solid #808080', margin: '8px 0 6px' }} />
              <div style={{ fontWeight: 'bold', fontSize: 11, color: '#000080', marginBottom: 4, fontFamily: 'Tahoma, sans-serif' }}>
                Details
              </div>
              <div style={{ fontSize: 9, color: '#444', fontFamily: 'Tahoma, sans-serif', lineHeight: 1.6 }}>
                <div><b>Coffee Collection</b></div>
                <div>6 items</div>
                <div>Type: Folder</div>
              </div>
            </div>

            {/* Files area */}
            <div style={{ flex: 1, padding: '8px', background: '#ffffff' }}>
              {/* Status: items found */}
              <div style={{ fontSize: 10, color: '#000080', marginBottom: 6, fontFamily: 'Tahoma, sans-serif', fontStyle: 'italic' }}>
                6 object(s) — Select an item to see its description.
              </div>

              <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                style={{ gap: 12 }}
              >
                {PRODUCTS.map((product) => (
                  <ShowcaseCard key={product.id} item={product} onAddToCart={onAddToCart} />
                ))}
              </div>
            </div>
          </div>

          {/* Status bar */}
          <div className="win-statusbar">
            <span>6 object(s)</span>
            <div style={{ flex: 1 }} />
            <span>Coffee Collection</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Collection;
