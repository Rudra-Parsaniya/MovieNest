import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

interface UserSummary {
  userId: number;
  username: string;
  fullName: string;
}

export const Buddies: React.FC = () => {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<UserSummary[]>([]);
  const [friends, setFriends] = useState<UserSummary[]>([]);
  const [pendingRequests, setPendingRequests] = useState<any[]>([]);
  const [selectedBuddy, setSelectedBuddy] = useState<UserSummary | null>(null);
  const [buddyWatchlist, setBuddyWatchlist] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.get(`/api/UserAPI/search?fullName=${encodeURIComponent(search)}`);
      setResults(res.data);
    } catch {
      setResults([]);
    }
    setLoading(false);
  };

  const handleSendBuddyRequest = async (buddyId: number) => {
    if (!user) return;
    await axios.post(`/api/UserAPI/${user.userId}/buddy-requests`, buddyId);
    alert('Buddy request sent!');
  };

  const handleAcceptRequest = async (requestId: number) => {
    await axios.post(`/api/UserAPI/buddy-requests/${requestId}/accept`);
    fetchPendingRequests();
    fetchFriends();
  };

  const handleDeclineRequest = async (requestId: number) => {
    await axios.post(`/api/UserAPI/buddy-requests/${requestId}/decline`);
    fetchPendingRequests();
  };

  const fetchFriends = async () => {
    if (!user) return;
    const res = await axios.get(`/api/UserAPI/${user.userId}/friends`);
    setFriends(res.data);
  };

  const fetchPendingRequests = async () => {
    if (!user) return;
    const res = await axios.get(`/api/UserAPI/${user.userId}/buddy-requests/pending`);
    setPendingRequests(res.data);
  };

  const handleShowBuddyWatchlist = async (buddy: UserSummary) => {
    setSelectedBuddy(buddy);
    const res = await axios.get(`/api/WatchListAPI/user/${buddy.userId}`);
    setBuddyWatchlist(res.data);
  };

  React.useEffect(() => {
    if (user) {
      fetchFriends();
      fetchPendingRequests();
    }
  }, [user]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-gradient">Buddies</h2>
      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search users by name..."
          className="flex-1 rounded-lg p-2 bg-black/60 text-white border border-gray-700 focus:outline-none"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">Search</button>
      </form>
      {loading && <div>Loading...</div>}
      {results.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Search Results</h3>
          <ul className="space-y-2">
            {results.map(u => (
              <li key={u.userId} className="flex justify-between items-center bg-black/40 rounded-lg p-2">
                <span>{u.fullName} (@{u.username})</span>
                <button onClick={() => handleSendBuddyRequest(u.userId)} className="text-green-400 hover:text-green-600 font-bold">Add</button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {pendingRequests.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Pending Buddy Requests</h3>
          <ul className="space-y-2">
            {pendingRequests.map((req: any) => (
              <li key={req.buddyRequestId} className="flex justify-between items-center bg-yellow-100 rounded-lg p-2">
                <span>From User ID: {req.fromUserId}</span>
                <div className="flex gap-2">
                  <button onClick={() => handleAcceptRequest(req.buddyRequestId)} className="text-green-600 font-bold">Accept</button>
                  <button onClick={() => handleDeclineRequest(req.buddyRequestId)} className="text-red-600 font-bold">Decline</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Your Buddies</h3>
        <ul className="space-y-2">
          {friends.map(f => (
            <li key={f.userId} className="flex justify-between items-center bg-black/40 rounded-lg p-2">
              <span>{f.fullName} (@{f.username})</span>
              <div className="flex gap-2">
                <button onClick={() => handleShowBuddyWatchlist(f)} className="text-blue-400 hover:text-blue-600 font-bold">View Watchlist</button>
                <button onClick={() => handleRemoveFriend(f.userId)} className="text-red-400 hover:text-red-600 font-bold">Remove</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {selectedBuddy && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-2 text-gradient">{selectedBuddy.fullName}'s Watchlist</h3>
          <ul className="space-y-2">
            {buddyWatchlist.length === 0 && <li className="text-gray-400">No movies in watchlist.</li>}
            {buddyWatchlist.map((movie: any) => (
              <li key={movie.movieId} className="bg-black/30 rounded-lg p-2">
                {movie.movieTitle}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
