'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiUser, FiMail, FiPhone, FiEdit, FiLogOut } from 'react-icons/fi';



export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: '', number: '' });
  const router = useRouter();

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);
        setForm({ name: data.user.name, number: data.user.number });
      })
      .catch(() => setUser(null));
  }, []);

  const handleLogout = async () => {
    const confirmed = window.confirm('Are you sure you want to log out?');
    if (confirmed) {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/auth/login');
    }
  };

  //save changes on dashboard ?? review and fix this
  const handleSave = async () => {
  const res = await fetch('/api/auth/update', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: form.name, number: form.number }),
  });

  if (res.ok) {
    const updated = await res.json();
    setUser(updated.user);
    setEditMode(false);
  } else {
    alert('Failed to update profile');
  }
};




  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/auth/update', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: form.name, number: form.number }),
    });
    if (res.ok) {
      const updated = await res.json();
      setUser(updated.user);
      setEditing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 shadow">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-4">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          {user && (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-1 rounded text-sm"
            >
              <FiLogOut /> Logout
            </button>
          )}
        </div>
      </header>

      <main className="flex-grow bg-gradient-to-br from-gray-50 to-gray-100 p-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 bg-white rounded-xl p-6 shadow-md text-center">
            <h2 className="text-3xl font-semibold text-gray-800">Welcome 👋</h2>
            <p className="text-gray-500 mt-1">Manage your account securely</p>
          </div>

          {user ? (
            <div className="bg-white rounded-xl shadow-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-indigo-600 mb-4">User Details</h3>
                {editing ? (
                  <form onSubmit={handleEditSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="mt-1 px-4 py-2 border rounded w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Mobile</label>
                      <input
                        type="text"
                        value={form.number}
                        onChange={(e) => setForm({ ...form, number: e.target.value })}
                        className="mt-1 px-4 py-2 border rounded w-full"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Save
                    </button>
                  </form>
                ) : (
                  <ul className="space-y-4 text-gray-700">
                    <li className="flex items-center gap-3">
                      <FiUser className="text-indigo-500 text-xl" />
                      <span><strong>Name:</strong> {user.name}</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <FiMail className="text-indigo-500 text-xl" />
                      <span><strong>Email:</strong> {user.email}</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <FiPhone className="text-indigo-500 text-xl" />
                      <span><strong>Mobile:</strong> {user.number}</span>
                    </li>
                    <button
                      onClick={() => setEditing(true)}
                      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      <FiEdit className="inline-block mr-1" /> Edit Profile
                    </button>
                  </ul>
                )}
              </div>

              <div className="flex flex-col items-center justify-center gap-4">
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=160&q=80"
                  alt="User Avatar"
                  className="w-32 h-32 rounded-full border-4 border-indigo-300 shadow-md"
                />
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-600 mt-12">
              <p className="text-lg">You are not logged in.</p>
              <button
                onClick={() => router.push('/auth/login')}
                className="mt-4 px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Go to Login
              </button>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-white border-t mt-8">
        <div className="max-w-6xl mx-auto py-4 px-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} AuthApp. Built with ❤️ using Next.js.
        </div>
      </footer>
    </div>
  );
}
function setEditMode(arg0: boolean) {
  throw new Error('Function not implemented.');
}

