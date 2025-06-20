// ✅ FILE: src/app/layout.tsx
import './globals.css';
import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';


export const metadata = {
  title: 'Auth App',
  description: 'User authentication with Next.js, Prisma, MySQL',
};

interface LayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
  );
}
