import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { isContentRoute, ADSENSE_CLIENT_ID } from './AdSenseGuard';

declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

interface AdUnitProps {
  slotId?: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal';
  responsive?: boolean;
  className?: string;
  minHeight?: number;
}

export const AdUnit: React.FC<AdUnitProps> = ({
  slotId = 'default-slot',
  format = 'auto',
  responsive = true,
  className = '',
  minHeight = 120,
}) => {
  const { pathname } = useLocation();
  const adRef = useRef<HTMLModElement>(null);
  const isPushed = useRef(false);

  const eligible = isContentRoute(pathname);

  useEffect(() => {
    if (!eligible) return;

    if (!isPushed.current && adRef.current) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        isPushed.current = true;
      } catch (err) {
        // Suppress benign AdSense push errors (e.g. ad blockers)
      }
    }
  }, [eligible, pathname]);

  // Strictly eliminate ads on non-content routes (policy compliance)
  if (!eligible) {
    return null;
  }

  return (
    <div
      className={`my-12 w-full flex flex-col items-center justify-center overflow-hidden transition-all duration-300 ${className}`}
      style={{ minHeight: `${minHeight}px` }}
    >
      <div className="w-full max-w-4xl px-4">
        <div className="flex items-center justify-between py-1 mb-2 border-b border-[#C68E5D]/10">
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#C68E5D]/60 font-bold">
            Advertisement
          </span>
          <span className="text-[8px] uppercase tracking-widest text-[#F5F5DC]/20">
            AdSense Verified
          </span>
        </div>

        <div className="w-full bg-[#140D08]/40 border border-[#C68E5D]/10 rounded-xl p-2 flex items-center justify-center overflow-hidden">
          <ins
            ref={adRef}
            className="adsbygoogle block w-full text-center"
            style={{ display: 'block' }}
            data-ad-client={ADSENSE_CLIENT_ID}
            data-ad-slot={slotId}
            data-ad-format={format}
            data-full-width-responsive={responsive ? 'true' : 'false'}
          />
        </div>
      </div>
    </div>
  );
};

export default AdUnit;
