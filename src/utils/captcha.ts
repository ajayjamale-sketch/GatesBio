const CAPTCHA_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

/**
 * Generates an unambiguous alphanumeric CAPTCHA challenge code.
 */
export function generateCaptchaCode(length = 6): string {
  const bytes = new Uint32Array(length);
  if (typeof window !== 'undefined' && window.crypto?.getRandomValues) {
    window.crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < length; i += 1) {
      bytes[i] = Math.floor(Math.random() * 4294967296);
    }
  }
  let out = '';
  for (let i = 0; i < length; i += 1) {
    out += CAPTCHA_CHARS[bytes[i] % CAPTCHA_CHARS.length];
  }
  return out;
}
