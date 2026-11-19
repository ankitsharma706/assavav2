import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { BreadcrumbItem, generateBreadcrumbSchema } from '../lib/schema';
import JsonLd from './JsonLd';

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  showHomeIcon?: boolean;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  className = '',
  showHomeIcon = true,
}) => {
  const fullItems: BreadcrumbItem[] = [
    { name: 'Home', path: '/' },
    ...items.filter(i => i.path !== '/'),
  ];

  const schema = generateBreadcrumbSchema(fullItems);

  return (
    <>
      <JsonLd id={`breadcrumb-schema-${fullItems.map(i => i.name).join('-')}`} data={schema} />
      <nav aria-label="Breadcrumb" className={`py-4 ${className}`}>
        <ol className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-widest font-mono text-[#F5F5DC]/40">
          {fullItems.map((item, index) => {
            const isLast = index === fullItems.length - 1;

            return (
              <li key={item.path} className="flex items-center gap-2">
                {index > 0 && (
                  <ChevronRight className="w-3 h-3 text-[#C68E5D]/50 flex-shrink-0" aria-hidden="true" />
                )}
                {isLast ? (
                  <span
                    aria-current="page"
                    className="text-[#C68E5D] font-bold truncate max-w-[200px] sm:max-w-xs"
                  >
                    {item.name}
                  </span>
                ) : (
                  <Link
                    to={item.path}
                    className="hover:text-[#F5F5DC] transition-colors flex items-center gap-1.5 focus:outline-none focus:ring-1 focus:ring-[#C68E5D] rounded px-1"
                  >
                    {index === 0 && showHomeIcon && <Home className="w-3.5 h-3.5" aria-hidden="true" />}
                    <span>{item.name}</span>
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumb;
