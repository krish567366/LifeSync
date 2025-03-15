import { SecureStorageUtil } from './encryption';

export const saveConsentPreferences = async (prefs: Record<string, boolean>) => {
  await SecureStorageUtil.set('consent_prefs', JSON.stringify(prefs));
};

export const checkConsent = async (feature: string) => {
  const prefs = await SecureStorageUtil.get('consent_prefs');
  return prefs ? JSON.parse(prefs)[feature] || false : false;
};