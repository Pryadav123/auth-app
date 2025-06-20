import { cookies } from 'next/headers';

export async function POST() {
  (await cookies()).set('token', '', {
    httpOnly: true,
    maxAge: 0,
    path: '/',
  });

  return new Response('Logged out', { status: 200 });
}
