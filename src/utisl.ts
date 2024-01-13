import { createHmac } from 'node:crypto';

export function cryptoPassword(password: string): string {
  const hmac = createHmac('sha256', process.env.API_SECRET);
  return hmac.update(password).digest('hex');
}