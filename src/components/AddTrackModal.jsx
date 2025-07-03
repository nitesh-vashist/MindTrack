import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTrack } from "../redux/trackSlice";

const AddTrackModal = ({ closeModal }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [type, setType] = useState("YouTube");
  const [source, setSource] = useState("");
  const [totalLectures, setTotalLectures] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      addTrack({
        name,
        type,
        source,
        totalLectures: parseInt(totalLectures),
        tags: tags.split(",").map((tag) => tag.trim()),
      })
    );

    closeModal();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-lg w-96 max-h-[90vh] overflow-y-auto text-zinc-800 dark:text-white">
        <h2 className="text-xl font-semibold mb-4">➕ Add New Track</h2>
        <form onSubmit={handleSubmit}>

          <div className="mb-4">
            <label className="block text-sm font-medium">Track Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded mt-1 dark:bg-zinc-800"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full p-2 border rounded mt-1 dark:bg-zinc-800"
              required
            >
              <option>YouTube</option>
              <option>Course</option>
              <option>Book</option>
              <option>Playlist</option>
              <option>Sheet</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Source URL</label>
            <input
              type="text"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="w-full p-2 border rounded mt-1 dark:bg-zinc-800"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Total Lectures</label>
            <input
              type="number"
              value={totalLectures}
              onChange={(e) => setTotalLectures(e.target.value)}
              className="w-full p-2 border rounded mt-1 dark:bg-zinc-800"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium">Tags (comma-separated)</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full p-2 border rounded mt-1 dark:bg-zinc-800"
            />
          </div>

          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 bg-gray-400 text-white rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add Track
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTrackModal;
