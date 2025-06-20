'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', number: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push('/auth/login');
    } else {
      const msg = await res.text();
      setError(msg || 'Registration failed');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200 px-4 py-12 overflow-hidden">
      {/* Decorative Blurred Circles */}
      <div className="absolute -top-24 -left-16 w-72 h-72 bg-blue-300 rounded-full blur-3xl opacity-30 animate-pulse" />
      <div className="absolute -bottom-24 -right-16 w-72 h-72 bg-blue-400 rounded-full blur-2xl opacity-30 animate-pulse" />

      <form
        onSubmit={handleSubmit}
        className="z-10 bg-white/90 backdrop-blur-xl shadow-2xl rounded-2xl p-10 space-y-6 w-full max-w-md transition-transform transform hover:scale-[1.02]"
      >
        <h2 className="text-4xl font-extrabold text-center text-blue-500 drop-shadow">
          Create an Account
        </h2>

        {error && (
          <p className="text-red-600 text-sm text-center bg-red-100 border border-red-300 rounded p-2">
            {error}
          </p>
        )}

        {(['name', 'email', 'number', 'password'] as Array<keyof typeof form>).map((field) => (
          <div key={field} className="flex flex-col gap-1">
            <label htmlFor={field} className="text-sm font-medium text-gray-700">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              id={field}
              type={
                field === 'password'
                  ? 'password'
                  : field === 'email'
                  ? 'email'
                  : field === 'number'
                  ? 'tel'
                  : 'text'
              }
              name={field}
              placeholder={`Enter your ${field}`}
              value={form[field]}
              onChange={handleChange}
              required
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-md"
        >
          Register
        </button>

        <p className="text-center text-sm text-gray-500">
          Already have an account?{' '}
          <a href="/auth/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
