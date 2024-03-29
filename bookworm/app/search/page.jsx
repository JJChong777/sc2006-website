"use client";
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import ResultsPage from './results';
//import logo from 'logo.png'; // Import your logo image

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState('');
  const [redirectToResults, setRedirectToResults] = useState(false);
  let results = [];
  
  const handleSearch = async () => {
    try {
      const response = await fetch(`bookdata.json`);
      const data = await response.json();
      const results = data.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (results.length>0){
        setSearchResults(results);
        setError('');
        setRedirectToResults(true);
      }
      else{
        setSearchResults([]);
        setError('No books found.')
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };
  if (redirectToResults) {
    return <Redirect to={{ pathname: '/results', state: { results } }} />;
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img src="logo.png" alt="Logo" className="mb-4 h-40 w-25" />
      <h1 className="text-4xl font-boldho">Bookworm</h1>
      <div className="w-full max-w-md p-4 flex flex-col items-center">
        <input
          className="w-full border border-gray-300 rounded-md px-3 py-2"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Book search"
        />
        <div className="flex items-center justify-center"> {/* New div for centering */}
          <button
            className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        <ul>
          {searchResults.map((result) => (
            <li key={result.id}>{result.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );  
          }
export default SearchPage;