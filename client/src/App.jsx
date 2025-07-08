import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DarkModeToggle from "./components/DarkModeToggle";
import TrackDetails from './pages/TrackDetails';
import Dashboard from './pages/Dashboard';

const App = () => {
  return (
    <>
      <DarkModeToggle />
      <div className="min-h-screen bg-white dark:bg-zinc-900 text-zinc-800 dark:text-white">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/track/:id" element={<TrackDetails />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
