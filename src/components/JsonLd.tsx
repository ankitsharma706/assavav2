import React, { useEffect } from 'react';
import { sanitizeJsonLd } from '../lib/schema';

interface JsonLdProps {
  id?: string;
  data: Record<string, unknown> | Array<Record<string, unknown>>;
}

export const JsonLd: React.FC<JsonLdProps> = ({ id = 'json-ld-schema', data }) => {
  useEffect(() => {
    const existing = document.getElementById(id);
    if (existing) {
      existing.remove();
    }

    const script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    script.text = sanitizeJsonLd(data);
    document.head.appendChild(script);

    return () => {
      const el = document.getElementById(id);
      if (el) el.remove();
    };
  }, [id, data]);

  return null;
};

export default JsonLd;
