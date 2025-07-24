import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const UserDetailsPage: React.FC = () => {
  React.useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const { user } = useAuth();

  if (!user) {
    return (
      <div className="p-6 text-center text-gray-300">
        Please sign in to view your profile.
      </div>
    );
  }

  return (
    <div className="h-screen flex items-center justify-center overflow-hidden relative">
      <img
        src="/own1.jpg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="absolute inset-0 bg-black/70 z-10" />
      <div className="max-w-lg w-full mx-auto bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 text-slate-100 space-y-4 shadow-xl relative z-20">
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
    </div>
  );
};

export default UserDetailsPage;
