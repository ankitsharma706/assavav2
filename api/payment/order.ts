import { PRODUCTS } from '../../src/constants';

interface ApiRequest {
  method?: string;
  body?: unknown;
}

interface ApiResponse {
  setHeader(name: string, value: string): void;
  status(code: number): ApiResponse;
  json(value: unknown): void;
}

interface CartEntry {
  id: string;
  quantity: number;
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  res.setHeader('Allow', 'POST');
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const keyId = process.env.RAZORPAY_KEY_ID;
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !secret) return res.status(503).json({ error: 'Payments are not configured' });

  const body = req.body as { items?: unknown } | null;
  if (!body || !Array.isArray(body.items) || body.items.length === 0 || body.items.length > 50) {
    return res.status(400).json({ error: 'A valid cart is required' });
  }

  let subtotal = 0;
  for (const rawEntry of body.items) {
    if (!rawEntry || typeof rawEntry !== 'object') return res.status(400).json({ error: 'Invalid cart item' });
    const entry = rawEntry as Partial<CartEntry>;
    if (typeof entry.id !== 'string' || !Number.isInteger(entry.quantity) || entry.quantity! < 1 || entry.quantity! > 99) {
      return res.status(400).json({ error: 'Invalid cart item' });
    }
    const product = PRODUCTS.find((item) => item.id === entry.id);
    if (!product) return res.status(400).json({ error: 'Unknown product in cart' });
    subtotal += product.price * entry.quantity!;
  }

  const amount = Math.round((subtotal + (subtotal > 150 ? 0 : 15)) * 100);
  if (!Number.isSafeInteger(amount) || amount <= 0) return res.status(400).json({ error: 'Invalid order amount' });

  const auth = btoa(`${keyId}:${secret}`);
  let response: Response;
  try {
    response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: { Authorization: `Basic ${auth}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, currency: 'INR', receipt: `assava-${Date.now()}` }),
    });
  } catch (error) {
    console.error('Razorpay order request failed', error);
    return res.status(502).json({ error: 'Unable to create payment order' });
  }
  if (!response.ok) {
    console.error('Razorpay order creation failed', response.status);
    return res.status(502).json({ error: 'Unable to create payment order' });
  }
  const order = await response.json() as { id?: string; amount?: number; currency?: string };
  if (!order.id || order.amount !== amount || order.currency !== 'INR') {
    return res.status(502).json({ error: 'Payment provider returned an invalid order' });
  }
  return res.status(200).json({ orderId: order.id, amount, currency: 'INR', keyId });
}
