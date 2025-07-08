import React, { useState } from 'react';
import AddSessionModal from '../components/AddSessionModal'; 
import EditSessionModal from '../components/EditSessionModal';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { deleteSession } from '../redux/trackSlice'; // Import the delete action
import { useDispatch } from 'react-redux';

const TrackDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const track = useSelector(state => state.track.tracks.find(t => t.id === id));
  const sessions = useSelector(state => state.track.sessions[id] || []);

  const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const [isEditSessionOpen, setIsEditSessionOpen] = useState(false);
    const [editingSessionId, setEditingSessionId] = useState(null);

    const openEditSessionModal = (sessionId) => {
      setEditingSessionId(sessionId);
      setIsEditSessionOpen(true);
    };
    const closeEditSessionModal = () => {
      setIsEditSessionOpen(false);
      setEditingSessionId(null); // Clear the previously selected session
    }; 

    const handleDeleteSession = (sessionId) => {
      if (window.confirm("Are you sure you want to delete this session?")) {
        dispatch(deleteSession({ trackId: track.id, sessionId }));
      }
    };

  if (!track) {
    return (
      <div className="p-6 text-red-500">
        Track not found. <button onClick={() => navigate(-1)} className="underline">Go Back</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 max-w-4xl mx-auto space-y-6 bg-gray-50 dark:bg-zinc-900 text-zinc-800 dark:text-white">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">{track.name}</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Type: {track.type} • Added: {track.addedOn.slice(0, 10)}
        </p>
        {track.source && (
          <a
            href={track.source}
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 underline text-sm"
          >
            Visit Source ↗
          </a>
        )}
      </div>

      {/* Tags */}
      {track.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {track.tags.map(tag => (
            <span key={tag} className="bg-zinc-200 dark:bg-zinc-700 px-2 py-1 text-xs rounded">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Progress */}
      <div className="mt-4">
        <p className="font-semibold">Progress: {track.progress} / {track.totalLectures}</p>
        {track.isCompleted && (
          <p className="text-green-600 dark:text-green-400 font-semibold">✅ Completed</p>
        )}
      </div>

      {/* Sessions List */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Sessions:</h2>
        {sessions.length === 0 ? (
          <p className="text-sm text-zinc-500">No sessions added yet.</p>
        ) : (
          <ul className="space-y-3">
            {sessions.map(session => (
              <li key={session.id} className="border dark:border-zinc-700 rounded p-3 bg-white dark:bg-zinc-800">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">Lecture {session.lectureNumber}: {session.lectureTitle}</p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      Watched: {session.watchedTime} mins • Status: {session.status}
                    </p>
                  </div>
                  <button className='mx-2 text-blue-500' onClick={() => openEditSessionModal(session.id)}>Edit</button>
                  <button className='mx-2 text-red-500' onClick={() => handleDeleteSession(session.id)}>Delete</button>
                  <span className="text-xs text-zinc-400">{session.watchedDate}</span>
                </div>
                {session.notes && (
                  <p className="mt-1 text-sm italic text-zinc-600 dark:text-zinc-300">
                    Notes: {session.notes}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-6">
        <button
            onClick={openModal}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
            ➕ Add Session
        </button>

        {track.isCompleted && (
          <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
            🧠 Attempt Quiz for Certificate
          </button>
        )}
        {isModalOpen && (
        <AddSessionModal trackId={track.id} closeModal={closeModal} />
        )}
        {isEditSessionOpen && (
          <EditSessionModal
            trackId={track.id}
            sessionData={sessions.find(session => session.id === editingSessionId)}
            closeModal={closeEditSessionModal}
            // isEditMode={true} // Pass this prop to indicate edit mode
            
            // sessions={sessions} // Pass the sessions array to the modal
          />
        )}
      </div>
    </div>
  );
};

export default TrackDetails;

