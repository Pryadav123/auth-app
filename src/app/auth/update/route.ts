// ✅ FILE: src/app/api/auth/update/route.ts
import { prisma } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function PUT(req: Request) {
  const token = (await cookies()).get('token')?.value;
  if (!token) return new Response('Unauthorized', { status: 401 });

  try {
    const userData = verifyToken(token);
    const { name, number } = await req.json();

    if (!name || !number) return new Response('All fields are required', { status: 400 });

    const updatedUser = await prisma.user.update({
      where: { id: userData.id },
      data: { name, number },
    });

    return Response.json({ message: 'User updated', user: updatedUser });
  } catch (error) {
    return new Response('Invalid token or update error', { status: 500 });
  }
}
