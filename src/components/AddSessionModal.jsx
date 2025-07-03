import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addSession } from "../redux/trackSlice";

const AddSessionModal = ({ trackId, closeModal }) => {
  const dispatch = useDispatch();

  // Track Session Form State
  const [lectureNumber, setLectureNumber] = useState("");
  const [duration, setDuration] = useState('');
  const [lectureTitle, setLectureTitle] = useState("");
  const [watchedTime, setWatchedTime] = useState("");
  const [watchedDate, setWatchedDate] = useState("");
  const [status, setStatus] = useState("");
  const [notes, setNotes] = useState("");
  const [tags, setTags] = useState("");
  const [resumePoint, setResumePoint] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!lectureNumber || !lectureTitle || !watchedTime || !watchedDate) {
      alert("Please fill out all fields.");
      return;
    }

    const sessionData = {
      trackId,
      lectureNumber,
      lectureTitle,
      duration,
      watchedTime,
      watchedDate,
      status,
      notes,
      tags: tags.split(","),
      resumePoint: "00:00:00", // Optional, if you want to track
    };

    dispatch(addSession(sessionData));
    closeModal(); // Close modal after submission
  };

  
    return (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white dark:bg-zinc-900 dark:text-white p-6 rounded-lg shadow-lg w-96 transition-all duration-300 max-h-[90vh] overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4">Add Session</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-200 mb-1">
            Lecture Number
          </label>
          <input
            type="number"
            value={lectureNumber}
            onChange={(e) => setLectureNumber(e.target.value)}
            placeholder="e.g. 14"
            className="w-full p-2 border rounded mt-1 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-200 mb-1">
            Lecture Title
          </label>
          <input
            type="text"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            placeholder="e.g. useEffect Cleanup"
            className="w-full p-2 border rounded mt-1 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
            required
          />
        </div>

        <div className="mb-4">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-200 mb-1">
                Lecture Duration (minutes)
            </label>
            <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g. 45"
                className="w-full p-2 border rounded mt-1 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
                required
            />
        </div>


        <div className="mb-4">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-200 mb-1">
            Watched Time (minutes)
          </label>
          <input
            type="number"
            value={watchedTime}
            onChange={(e) => setWatchedTime(e.target.value)}
            placeholder="e.g. 25"
            className="w-full p-2 border rounded mt-1 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-200 mb-1">
            Watched Date
          </label>
          <input
            type="date"
            value={watchedDate}
            onChange={(e) => setWatchedDate(e.target.value)}
            className="w-full p-2 border rounded mt-1 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-200 mb-1">
            Status
          </label>
          <input
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            placeholder="e.g. Understood, Confused"
            className="w-full p-2 border rounded mt-1 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-200 mb-1">
            Notes
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Write your thoughts..."
            className="w-full p-2 border rounded mt-1 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-200 mb-1">
            Tags (comma separated)
          </label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g. hooks, useEffect"
            className="w-full p-2 border rounded mt-1 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
          />
        </div>

        <div className="mb-4">
            <label className="block text-sm font-medium">Resume Point (HH:MM:SS)</label>
            <input
                type="text"
                value={resumePoint}
                onChange={(e) => setResumePoint(e.target.value)}
                placeholder="e.g. 00:10:45"
                className="w-full p-2 border rounded mt-1 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
            />
        </div>


        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={closeModal}
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add Session
          </button>
        </div>
      </form>
    </div>
  </div>
);

  
};

export default AddSessionModal;
