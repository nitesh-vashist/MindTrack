import React, { useEffect, useState } from 'react';

const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    return document.documentElement.classList.contains("dark");
  });

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
    setIsDark(!isDark);
    localStorage.setItem("theme", !isDark ? "dark" : "light");
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  return (
    <button
      onClick={toggleDarkMode}
      className="absolute top-4 right-4 p-2 text-sm font-medium rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-white shadow hover:scale-105 transition"
    >
      {isDark ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
};

export default DarkModeToggle;
