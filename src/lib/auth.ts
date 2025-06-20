// ✅ FILE: src/lib/auth.ts
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET!;

export const signToken = (id: string, email: string, name: string, number: string) =>
  jwt.sign({ id, email, name, number }, JWT_SECRET, { expiresIn: '7d' });

export const verifyToken = (token: string) =>
  jwt.verify(token, JWT_SECRET) as { id: string, email: string, name: string, number: string };
