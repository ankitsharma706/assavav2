interface ApiRequest {
  method?: string;
  body?: unknown;
}

interface ApiResponse {
  setHeader(name: string, value: string): void;
  status(code: number): ApiResponse;
  json(value: unknown): void;
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  res.setHeader('Allow', 'POST');
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.CONTACT_TO_EMAIL;
  const sender = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !recipient || !sender) return res.status(503).json({ error: 'Contact service is not configured' });

  const body = req.body as Record<string, unknown> | null;
  const { name, email, phone, inquiryType, message } = body || {};
  if (typeof name !== 'string' || name.trim().length < 2 || name.length > 120 ||
      typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 ||
      (phone !== undefined && (typeof phone !== 'string' || phone.length > 40)) ||
      typeof inquiryType !== 'string' || inquiryType.length > 80 ||
      typeof message !== 'string' || message.trim().length < 10 || message.length > 5000) {
    return res.status(400).json({ error: 'Please provide valid contact details and a message' });
  }

  let response: Response;
  try {
    response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: sender,
        to: [recipient],
        reply_to: email,
        subject: `Website inquiry: ${inquiryType}`,
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\nType: ${inquiryType}\n\n${message}`,
      }),
    });
  } catch (error) {
    console.error('Contact email request failed', error);
    return res.status(502).json({ error: 'Unable to send your message right now' });
  }
  if (!response.ok) {
    console.error('Contact email delivery failed', response.status);
    return res.status(502).json({ error: 'Unable to send your message right now' });
  }
  return res.status(200).json({ sent: true });
}
