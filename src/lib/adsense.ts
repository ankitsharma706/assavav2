import config from './adsense-config.json';

export const ADSENSE_CLIENT_ID = import.meta.env.VITE_ADSENSE_CLIENT_ID || config.publisherId;
