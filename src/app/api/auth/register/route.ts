// src/app/api/auth/register/route.ts

import { prisma } from '@/lib/db';
import { hashPassword } from '@/lib/hash';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, number, password } = body;

    if (!name || !email || !number || !password) {
      return new Response('All fields are required', { status: 400 });
    }

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) {
      return new Response('User already exists', { status: 409 });
    }

    const hashed = await hashPassword(password);
    const user = await prisma.user.create({
      data: { name, email, number, password: hashed },
    });

    return Response.json({ message: 'User registered', user });
  } catch (error) {
    console.error('Registration Error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
