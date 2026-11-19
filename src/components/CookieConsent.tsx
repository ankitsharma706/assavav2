import React, { useEffect, useState } from 'react';
import { CONSENT_EVENT, CONSENT_STORAGE_KEY, setAdvertisingConsent } from '../lib/consent';

const CookieConsent: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const refresh = () => {
      try {
        setVisible(!window.localStorage.getItem(CONSENT_STORAGE_KEY));
      } catch {
        setVisible(true);
      }
    };
    refresh();
    window.addEventListener(CONSENT_EVENT, refresh);
    return () => window.removeEventListener(CONSENT_EVENT, refresh);
  }, []);

  if (!visible) return null;

  const choose = (choice: 'accepted' | 'rejected') => {
    try {
      setAdvertisingConsent(choice);
      setVisible(false);
    } catch {
      setVisible(true);
    }
  };

  return (
    <aside
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-consent-title"
      className="fixed bottom-4 left-4 right-4 z-[200] mx-auto max-w-3xl rounded-2xl border border-[#C68E5D]/30 bg-[#140D08] p-6 text-[#F5F5DC] shadow-2xl"
    >
      <h2 id="cookie-consent-title" className="mb-2 text-lg font-bold">Advertising preferences</h2>
      <p className="mb-5 text-sm text-[#F5F5DC]/75">
        Optional advertising cookies and AdSense are disabled until you choose. You can change this choice from the Privacy Policy page.
      </p>
      <div className="flex flex-wrap gap-3">
        <button type="button" onClick={() => choose('accepted')} className="rounded-full bg-[#C68E5D] px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#1A120B]">
          Allow advertising
        </button>
        <button type="button" onClick={() => choose('rejected')} className="rounded-full border border-white/20 px-5 py-3 text-xs font-bold uppercase tracking-wider">
          Reject optional cookies
        </button>
      </div>
    </aside>
  );
};

export default CookieConsent;
