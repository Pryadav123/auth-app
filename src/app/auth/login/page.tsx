'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push('/dashboard');
    } else {
      const msg = await res.text();
      setError(msg || 'Login failed');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-green-200 via-white to-green-100 overflow-hidden px-4 py-12">
      {/* Decorative blurred shape */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-green-300 rounded-full opacity-30 blur-3xl animate-pulse z-0" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-green-400 rounded-full opacity-30 blur-2xl animate-pulse z-0" />

      <form
        onSubmit={handleSubmit}
        className="z-10 bg-white/90 backdrop-blur-xl shadow-2xl rounded-xl p-10 space-y-6 w-full max-w-md transition-transform transform hover:scale-[1.02]"
      >
        <h2 className="text-4xl font-extrabold text-center text-green-700 drop-shadow">
          Welcome Back
        </h2>

        {error && (
          <p className="text-red-600 text-sm text-center bg-red-100 border border-red-300 rounded p-2">
            {error}
          </p>
        )}

        {(['email', 'password'] as Array<keyof typeof form>).map((field) => (
          <div key={field} className="flex flex-col gap-1">
            <label htmlFor={field} className="text-sm font-medium text-gray-700">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              id={field}
              type={field === 'password' ? 'password' : 'email'}
              name={field}
              value={form[field]}
              onChange={handleChange}
              placeholder={`Enter your ${field}`}
              required
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-md font-semibold hover:bg-green-700 transition duration-200 shadow-md"
        >
          Login
        </button>

        <p className="text-center text-sm text-gray-500">
          Don’t have an account?{' '}
          <a href="/auth/register" className="text-green-600 hover:underline">
            Register
          </a>
        </p>
      </form>
    </div>
  );
}
