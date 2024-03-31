"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = (searchTerm) => {
    router.push(`/searchresults/?search=${searchTerm}`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img src="logo.png" alt="Logo" className="mb-4 h-40 w-25" />
      <h1 className="text-4xl font-bold">Bookworm</h1>
      <div className="w-full max-w-md p-4 flex flex-col items-center">
        <input
          className="w-full border border-gray-300 rounded-md px-3 py-2"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Book search"
        />
        <div className="flex items-center justify-center">
          {/* New div for centering */}
          <button
            className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleSearch(searchTerm)}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};
export default SearchPage;
