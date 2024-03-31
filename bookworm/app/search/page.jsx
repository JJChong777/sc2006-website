"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../auth/authentication_functions/AuthContext";
const SearchPage = () => {
  const { userData } = useAuth();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [bookQuery, setBookQuery] = useState([]);
  const [availabilityData, setAvailabilityData] = useState({});
  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setError("Please enter a search term.");
      return;
    }

    try {
      // Note: Using a GET request with query parameters
      const response = await fetch(
        `http://localhost:3000/api/search?keyword=${searchTerm}`
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

  useEffect(() => {
    const fetchAvailability = async () => {
      const availabilityData = {};

      // Fetch availability for each book
      if (bookQuery.length > 0) {
        for (const book of bookQuery) {
          const isbn = book.isbns[0].trim();
          try {
            const response = await fetch(
              `http://localhost:3000/api/availability?ISBN=${isbn}`
            );
            if (!response.ok) throw new Error("Network response was not ok.");
            const data = await response.json();
            availabilityData[isbn] = [];
            data.items.forEach((item) =>
              availabilityData[isbn].push(item["location"]["name"])
            );
          } catch (error) {
            console.error("Error fetching availability:", error);
            availabilityData[isbn] = "Error fetching availability";
          }
        }
      }

      setAvailabilityData(availabilityData);
    };

    if (bookQuery.length) {
      fetchAvailability();
    }
  }, [bookQuery]); // Dependency array, re-run the effect if bookQuery changes

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Flex container to align items horizontally */}
        <div className="flex flex-wrap items-center justify-between">
          {/* Container for logo and title */}
          <div className="flex items-center space-x-4">
            <img src="logo.png" alt="Logo" className="h-40 w-auto" />
            <h1 className="text-4xl font-bold">Book Search</h1>
          </div>
          {/* Flex container for search input, button, and potentially error message */}
          <div className="flex flex-col items-center lg:flex-row space-x-2 mt-4 lg:mt-0">
            <input
              className="border border-gray-300 rounded-md px-3 py-2"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for books"
            />
            {error && <p className="text-red-500">{error}</p>}
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
        {bookQuery.length > 0 && (
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center mt-4 underline">
            Search Results
          </h2>
        )}
      </div>
      <ul
        role="list"
        className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 p-16"
      >
        {bookQuery.map((book) => (
          <li key={book.isbns[0]} className="text-center">
            <img
              className="aspect-[3/2] w-full rounded-2xl object-contain"
              src={`https://covers.openlibrary.org/b/isbn/${book.isbns[0].trim()}-L.jpg?default=false`}
              alt={book["title"]}
              onError={(e) => {
                e.target.src = "booknotfound.jpg"; // Set a fallback image
              }}
            />
            <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">
              {book.title}
            </h3>
            <p className="text-base leading-7 text-gray-600">{book.author}</p>
            {book.availability && (
              <p className="text-base leading-7 text-gray-600 text-center">
                Available in
                <ul>
                  {availabilityData[book.isbns[0].trim()]?.map((loc) => (
                    <li key={loc}>{loc}</li>
                  ))}
                </ul>
              </p>
            )}
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Add to saved books
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchPage;
