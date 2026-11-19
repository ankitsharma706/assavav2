import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { EVENTS } from '../data/events';
import { CATEGORY_DATA } from '../data/categoryData';
import { PRODUCTS } from '../constants';
import { applySEO, getRouteSEO } from '../lib/seo';

export default function RouteMetadata() {
  const location = useLocation();

  useEffect(() => {
    const config = getRouteSEO(location.pathname, PRODUCTS, CATEGORY_DATA, EVENTS);
    applySEO(config);
  }, [location.pathname]);

  return null;
}
