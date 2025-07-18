import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const UserPage: React.FC = () => {
  const { user, isAuthenticated, updateUser } = useAuth();

  if (!isAuthenticated || !user) {
    return (
      <div className="p-6 text-center text-gray-300">
        Please sign in to view your profile.
      </div>
    );
  }

  const [formData, setFormData] = useState({
    username: user.username,
    fullName: user.fullName ?? '',
    age: user.age?.toString() ?? '',
    email: user.email,
    password: '',
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateUser({
        username: formData.username.trim(),
        fullName: formData.fullName.trim(),
        age: formData.age ? parseInt(formData.age, 10) : undefined,
        email: formData.email.trim(),
        password: formData.password || undefined,
      });
      alert('Profile updated successfully');
      setFormData((prev) => ({ ...prev, password: '' }));
    } catch (err) {
      console.error(err);
      alert('Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-gray-900 p-6 rounded-xl border border-gray-800 text-white space-y-6">
      <h2 className="text-2xl font-bold">User Details</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {(
          [
            { label: 'Username', name: 'username', type: 'text' },
            { label: 'Full Name', name: 'fullName', type: 'text' },
            { label: 'Age', name: 'age', type: 'number' },
            { label: 'Email', name: 'email', type: 'email' },
            { label: 'New Password', name: 'password', type: 'password' },
          ] as const
        ).map((field) => (
          <div key={field.name} className="space-y-1">
            <label htmlFor={field.name} className="block text-sm text-gray-400">
              {field.label}
            </label>
            <input
              id={field.name}
              name={field.name}
              type={field.type}
              value={formData[field.name] as string}
              onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
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


export const UserPage: React.FC = () => {
  const { user } = useAuth();

  const [isSaving, setIsSaving] = React.useState(false);
    return (
      <div className="p-6 text-center text-gray-300">
        Please sign in to view your profile.
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto bg-gray-900 p-6 rounded-xl border border-gray-800 text-white space-y-4">
      <h2 className="text-2xl font-bold mb-4">User Details</h2>
      <div className="space-y-2">
        <p><span className="text-gray-400">Username:</span> {user.username}</p>
        <p><span className="text-gray-400">Full Name:</span> {user.fullName}</p>
        {user.age !== undefined && (
          <p><span className="text-gray-400">Age:</span> {user.age}</p>
        )}
        <p><span className="text-gray-400">Email:</span> {user.email}</p>
      </div>
    </div>
  );
};
import { useAuth } from '../../contexts/AuthContext';

export const UserPage: React.FC = () => {
  const { user } = useAuth();

  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    // e.preventDefault();
    // setIsSaving(true);
    // try {
    //   // await updateProfile({
    //   //   ...user,
    //   //   username: formData.username,
    //   //   fullName: formData.fullName,
    //   //   age: Number(formData.age),
    //   //   email: formData.email,
    //   //   password: formData.password || undefined,
    //   // });
    //   // alert('Profile updated');
    // } catch (err) {
    //   // console.error(err);
    //   // alert('Failed to update');
    // } finally {
    //   // setIsSaving(false);
    // }
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateProfile({
        ...user,
        username: formData.username,
        fullName: formData.fullName,
        age: Number(formData.age),
        email: formData.email,
        password: formData.password || undefined,
      });
      alert('Profile updated');
    } catch (err) {
      console.error(err);
      alert('Failed to update');
    } finally {
      setIsSaving(false);
    }
  };

  if (!user) {
    return <p className="text-gray-300">Please sign in to view your profile.</p>;
  }

  return (
    <div className="max-w-lg mx-auto bg-gray-900 p-6 rounded-xl border border-gray-800 text-white space-y-6">
      <h2 className="text-2xl font-bold">User Details</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {(
          [
            { label: 'Username', name: 'username', type: 'text' },
            { label: 'Full Name', name: 'fullName', type: 'text' },
            { label: 'Age', name: 'age', type: 'number' },
            { label: 'Email', name: 'email', type: 'email' },
            { label: 'Password', name: 'password', type: 'password' },
          ] as const
        ).map((field) => (
          <div key={field.name} className="space-y-1">
            <label htmlFor={field.name} className="block text-sm text-gray-400">
              {field.label}
            </label>
            <input
              id={field.name}
              name={field.name}
              type={field.type}
              value={formData[field.name] as string}
              onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
        ))}
        <button
          type="submit"
          disabled={isSaving}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 w-full py-2 rounded-lg"
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};
