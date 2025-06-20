import { prisma } from '../../../../lib/db';
import { comparePassword } from '../../../../lib/hash';
import { signToken } from '../../../../lib/auth';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await comparePassword(password, user.password))) {
    return new Response('Invalid credentials', { status: 401 });
  }

  const token = signToken(user.id, user.email, user.name, user.number);
  (await cookies()).set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });

  return Response.json({ message: 'Login successful' });
}