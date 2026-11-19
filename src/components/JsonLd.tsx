import React from 'react';
import { sanitizeJsonLd } from '../lib/schema';

interface JsonLdProps {
  id?: string;
  data: Record<string, unknown> | Array<Record<string, unknown>>;
}

export const JsonLd: React.FC<JsonLdProps> = ({ id = 'json-ld-schema', data }) => {
  return <script id={id} type="application/ld+json" dangerouslySetInnerHTML={{ __html: sanitizeJsonLd(data) }} />;
};

export default JsonLd;
