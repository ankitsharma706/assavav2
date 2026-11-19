export const CONSENT_STORAGE_KEY = 'assava-ad-consent';
export const CONSENT_EVENT = 'assava-consent-changed';

export function hasAdvertisingConsent(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return window.localStorage.getItem(CONSENT_STORAGE_KEY) === 'accepted';
  } catch {
    return false;
  }
}

export function setAdvertisingConsent(value: 'accepted' | 'rejected' | null): void {
  if (typeof window === 'undefined') return;
  try {
    if (value) window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
    else window.localStorage.removeItem(CONSENT_STORAGE_KEY);
    window.dispatchEvent(new Event(CONSENT_EVENT));
  } catch (error) {
    console.error('Unable to persist advertising consent', error);
    throw error;
  }
}
