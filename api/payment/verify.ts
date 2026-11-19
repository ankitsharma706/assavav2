import { createHmac, timingSafeEqual } from 'node:crypto';
import { Buffer } from 'node:buffer';

interface ApiRequest {
  method?: string;
  body?: unknown;
}

interface ApiResponse {
  setHeader(name: string, value: string): void;
  status(code: number): ApiResponse;
  json(value: unknown): void;
}

export default function handler(req: ApiRequest, res: ApiResponse) {
  res.setHeader('Allow', 'POST');
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret) return res.status(503).json({ error: 'Payments are not configured' });
  const body = req.body as Record<string, unknown> | null;
  const orderId = body?.orderId;
  const paymentId = body?.paymentId;
  const signature = body?.signature;
  if (typeof orderId !== 'string' || typeof paymentId !== 'string' || typeof signature !== 'string' ||
      !/^order_[A-Za-z0-9]+$/.test(orderId) || !/^pay_[A-Za-z0-9]+$/.test(paymentId) || !/^[a-f0-9]{64}$/i.test(signature)) {
    return res.status(400).json({ error: 'Invalid payment verification data' });
  }
  const expected = createHmac('sha256', secret).update(`${orderId}|${paymentId}`).digest();
  const received = Buffer.from(signature, 'hex');
  if (received.length !== expected.length || !timingSafeEqual(expected, received)) {
    return res.status(400).json({ error: 'Payment verification failed' });
  }
  return res.status(200).json({ verified: true, paymentId });
}
