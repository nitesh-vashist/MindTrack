import React from 'react';
import { Link } from 'react-router-dom';
const TrackCard = ({
  id,
  name,
  type,
  totalLectures,
  progress,
  lastUpdated,
  tags,
  isCompleted,
  onClick
}) => {
  return (
    <Link to={`/track/${id}`} className="no-underline">
      
    <div
      onClick={onClick}
      className="w-full bg-white dark:bg-zinc-900 shadow-md hover:shadow-lg transition rounded-xl p-5 cursor-pointer border border-gray-200 dark:border-zinc-700"
    >
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold text-zinc-800 dark:text-white">{name}</h2>
        <span className="text-sm px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded">
          {type}
        </span>
      </div>

      <div className="text-sm text-zinc-600 dark:text-zinc-300">
        <p>
          <strong>Progress:</strong> {progress}/{totalLectures} lectures
        </p>
        <p>
          <strong>Last Updated:</strong> {new Date(lastUpdated).toLocaleDateString()}
        </p>
        <p>
          <strong>Status:</strong>{' '}
          <span className={isCompleted ? 'text-green-500' : 'text-yellow-500'}>
            {isCompleted ? '✅ Completed' : '🚧 In Progress'}
          </span>
        </p>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {tags?.map((tag, idx) => (
          <span
            key={idx}
            className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs px-2 py-1 rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
    </Link>
  );
};

export default TrackCard;
