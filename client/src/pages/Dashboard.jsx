import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import TrackCard from '../components/TrackCard';
import AddTrackModal from '../components/AddTrackModal';

const Dashboard = () => {
  const tracks = useSelector((state) => state.track.tracks);
  const [showAddModal, setShowAddModal] = useState(false);

 return (
  <>
  <div className="p-6 max-w-4xl mx-auto space-y-4 bg-white dark:bg-zinc-900 min-h-screen">

    <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-bold text-zinc-800 dark:text-white">
        📚 Your Learning Tracks
      </h1>
      <button
        onClick={() => setShowAddModal(true)}
        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        ➕ Add Track
      </button>
    </div>

    {tracks.length === 0 ? (
      <p className="text-zinc-600 dark:text-zinc-400">
        No tracks found. Start by adding one!
      </p>
    ) : (
      tracks.map((track) => (
        <TrackCard
          key={track.id}
          id={track.id}
          name={track.name}
          type={track.type}
          totalLectures={track.totalLectures}
          progress={track.progress}
          lastUpdated={track.lastUpdated}
          tags={track.tags}
          isCompleted={track.isCompleted}
        />
      ))
    )}

    {showAddModal && <AddTrackModal closeModal={() => setShowAddModal(false)} />}
  </div>
  </>
);

};

export default Dashboard;
