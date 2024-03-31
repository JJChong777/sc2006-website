"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../auth/authentication_functions/AuthContext";
const SearchPage = () => {
  const { userData } = useAuth();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [bookQuery, setBookQuery] = useState([]);

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setError("Please enter a search term.");
      return;
    }

    try {
      // Note: Using a GET request with query parameters
      const response = await fetch(
        `http://localhost:3000/api/search?keyword=${encodeURIComponent(
          searchTerm
        )}`
      );

      if (!response.ok) {
        throw new Error("Search failed");
      }

      const books = await response.json();
      setBookQuery(books);

      if (books.length > 0) {
        router.replace("/search");
      } else {
        setError("No books found.");
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      setError("Failed to fetch search results.");
    }
  };

  console.log(userData);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img src="logo.png" alt="Logo" className="mb-4 h-40 w-auto" />
      <h1 className="text-4xl font-bold">Bookworm</h1>
      <div className="w-full max-w-md p-4 flex flex-col items-center">
        <input
          className="w-full border border-gray-300 rounded-md px-3 py-2"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for books"
        />
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <button
          className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <ul>
        {bookQuery.map((book) => (
          <li>
            <div>
              <img
                src={`https://covers.openlibrary.org/b/isbn/${book.isbns[0]}-L.jpg`}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchPage;
