"use client";

import { useState } from 'react';

export default function Library() {
  // Example genres and state to track selected genres
  const genres = ['Fantasy', 'Science Fiction', 'Mystery', 'Romance'];
  const [selectedGenres, setSelectedGenres] = useState({});

  const handleGenreChange = (genre) => {
    setSelectedGenres(prevSelectedGenres => ({
      ...prevSelectedGenres,
      [genre]: !prevSelectedGenres[genre]
    }));
  };

  const saveGenrePreferences = () => {
    // Implement save logic, possibly sending selectedGenres to an API
    console.log('Selected Genres:', selectedGenres);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-blue-900 text-white p-4">
        <h2 className="text-xl mb-6">My Library</h2>
        <div className="mb-4">Saved Books</div>
        <div>No saved books yet.</div>
        <div className="mt-6">
          <h3 className="text-lg mb-2">Genre Preferences</h3>
          {genres.map(genre => (
            <label key={genre} className="block mb-2">
              <input
                type="checkbox"
                checked={!!selectedGenres[genre]}
                onChange={() => handleGenreChange(genre)}
                className="mr-2 leading-tight"
              />
              <span className="text-white">
                {genre}
              </span>
            </label>
          ))}
          <button
            onClick={saveGenrePreferences}
            className="mt-4 w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
          >
            Save Preferences
          </button>
        </div>
      </div>
      {/* Main content */}
      <div className="flex-1 p-8 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">Welcome to Your Library</h1>
        {/* Content goes here */}
      </div>
    </div>
  );
}
