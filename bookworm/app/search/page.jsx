"use client";
import React, { useState } from 'react';
//import logo from 'logo.png'; // Import your logo image

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://api.example.com/search?q=${searchTerm}`);
      const data = await response.json();
      setSearchResults(data.results);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img src="logo.png" alt="Logo" className="mb-4 h-25 w-20" />
      <div className="w-full max-w-md p-4">
        <input
          className="w-full border border-gray-300 rounded-md px-3 py-2"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter search term..."
        />
        <button
          className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSearch}
        >
          Search
        </button>
        <ul>
          {searchResults.map((result) => (
            <li key={result.id}>{result.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchPage;