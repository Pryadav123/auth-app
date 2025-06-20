import { verifyToken } from '../../../../lib/auth';
import { cookies } from 'next/headers';

export async function GET() {
  const token = (await cookies()).get('token')?.value;
  if (!token) return new Response('Not authenticated', { status: 401 });

  try {
    const user = verifyToken(token);
    return Response.json({ user });
  } catch {
    return new Response('Invalid token', { status: 401 });
  }
}