import { React, useState } from "react";
import { useDispatch } from "react-redux";
import { updateSession } from "../redux/trackSlice";


const EditSessionModal = ({ trackId, sessionData, closeModal }) => {
  const dispatch = useDispatch();

  // Track Session Form State
  const [lectureNumber, setLectureNumber] = useState(sessionData.lectureNumber || "");
  const [duration, setDuration] = useState(sessionData.duration || '');
  const [lectureTitle, setLectureTitle] = useState(sessionData.lectureTitle || "");
  const [watchedTime, setWatchedTime] = useState(sessionData.watchedTime || "");
  const [watchedDate, setWatchedDate] = useState(sessionData.watchedDate || "");
  const [status, setStatus] = useState(sessionData.status || "");
  const [notes, setNotes] = useState(sessionData.notes || "");
  const [tags, setTags] = useState(sessionData.tags?.join(", ") || "");
  const [resumePoint, setResumePoint] = useState(sessionData.resumePoint || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!lectureNumber || !lectureTitle || !watchedTime || !watchedDate) {
      alert("Please fill out all fields.");
      return;
    }

    // const updatedSessionData = {
    //   lectureNumber,
    //   lectureTitle,
    //   duration,
    //   watchedTime,
    //   watchedDate,
    //   status,
    //   notes,
    //   tags: tags.split(",").map(tag => tag.trim()),
    //   resumePoint: "00:00:00", // Optional, if you want to track
    // };

    const updatedSessionData = {
      lectureNumber: Number(lectureNumber),
      lectureTitle,
      duration: Number(duration),
      watchedTime: Number(watchedTime),
      watchedDate,
      status,
      notes,
      tags: tags.split(",").map(tag => tag.trim()),
      resumePoint,
    };


    dispatch(updateSession({
      trackId,
      sessionId: sessionData.id, // ✅ lowercase "id", double-check this!
      updatedData: updatedSessionData
    }));

    closeModal(); // Close modal after submission
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-zinc-900 dark:text-white p-6 rounded-lg shadow-lg w-96 transition-all duration-300 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Edit Session</h2>
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
              placeholder="e.g. Introduction to React"
              className="w-full p-2 border rounded mt-1 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-200 mb-1">
              Duration (mins)
            </label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="e.g. 30"
              className="w-full p-2 border rounded mt-1 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-200 mb-1">
              Watched Time
            </label>
            <input
              type="number"
              value={watchedTime}
              onChange={(e) => setWatchedTime(e.target.value)}
              placeholder="e.g. 15"
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
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-2 border rounded mt-1 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
            >
              <option value="">Select Status</option>
              <option value="Completed">Completed</option>
              <option value="In Progress">In Progress</option>
              <option value="Not Started">Not Started</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-200 mb-1">
              Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any notes here..."
              className="w-full p-2 border rounded mt-1 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-200 mb-1">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g. React, JavaScript"
              className="w-full p-2 border rounded mt-1 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-200 mb-1">
              Resume Point (optional) (HH:MM:SS)
            </label>
            <input
              type="text"
              value={resumePoint}
              onChange={(e) => setResumePoint(e.target.value)}
              placeholder="e.g. 00:15:30"
              className="w-full p-2 border rounded mt-1 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="ml-2 px-4 py-2 bg-gray-300 dark:bg-zinc-700 text-zinc-800 dark:text-white rounded hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditSessionModal;