import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const UserPage: React.FC = () => {
  const { user, isAuthenticated, updateUser } = useAuth();

  const [formData, setFormData] = useState({
    username: user?.username || '',
    fullName: user?.fullName || '',
    age: user?.age !== undefined ? user.age.toString() : '',
    email: user?.email || '',
    password: '',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  if (!isAuthenticated || !user) {
    return (
      <div className="p-6 text-center text-gray-300">
        Please sign in to view your profile.
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);
    setSuccess(null);
    try {
      await updateUser({
        username: formData.username.trim(),
        fullName: formData.fullName.trim(),
        age: formData.age ? parseInt(formData.age, 10) : undefined,
        email: formData.email.trim(),
        password: formData.password || undefined,
      });
      setSuccess('Profile updated successfully');
      setFormData((prev) => ({ ...prev, password: '' }));
    } catch (err) {
      setError('Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-gray-900 p-6 rounded-xl border border-gray-800 text-white space-y-6 mt-10">
      <h2 className="text-2xl font-bold">User Details</h2>
      {error && <div className="text-red-400 text-sm">{error}</div>}
      {success && <div className="text-green-400 text-sm">{success}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { label: 'Username', name: 'username', type: 'text' },
          { label: 'Full Name', name: 'fullName', type: 'text' },
          { label: 'Age', name: 'age', type: 'number' },
          { label: 'Email', name: 'email', type: 'email' },
          { label: 'New Password', name: 'password', type: 'password' },
        ].map((field) => (
          <div key={field.name} className="space-y-1">
            <label htmlFor={field.name} className="block text-sm text-gray-400">
              {field.label}
            </label>
            <input
              id={field.name}
              name={field.name}
              type={field.type}
              value={formData[field.name as keyof typeof formData]}
              onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
              autoComplete={field.name === 'password' ? 'new-password' : 'off'}
            />
          </div>
        ))}
        <button
          type="submit"
          disabled={isSaving}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 w-full py-2 rounded-lg"
        >
          {isSaving ? 'Saving…' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default UserPage;
