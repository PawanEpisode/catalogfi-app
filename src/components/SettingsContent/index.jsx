import React, { useContext } from 'react';

import './SettingsContent.css';
import { ThemeContext } from '../../contexts/ThemeContext';

const SettingsContent = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="flex w-full justify-between p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-indigo-500 mb-4">App Theme</h2>
      <div className="flex items-center justify-between">
        <button
          onClick={toggleTheme}
          className={`px-4 py-2 rounded-full transition ${
            theme === 'dark' ? 'bg-indigo-500 text-white' : 'bg-gray-300 text-gray-700'
          }`}
        >
          Toggle to {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>
      </div>
    </div>
  );
};

export default SettingsContent;
