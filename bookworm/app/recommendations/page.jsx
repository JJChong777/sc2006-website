"use client";
import { useState, useEffect } from "react";
import { useAuth } from "../auth/authentication_functions/AuthContext";
import { addBookToDatabaseRec } from "./helper/addbookrec";

const BookRecommendations = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  // const [availabilityData, setAvailabilityData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { userData } = useAuth();

  const generateRecommendations = async () => {
    setIsLoading(true);
    setBooks([]);
    const userId = userData.id;
    if (!userId) return;

    try {
      // Note: Using a GET request with query parameters
      const response = await fetch(`/api/chatgpt?userId=${userId}`);

      if (!response.ok) {
        throw new Error("Getting recommendations failed");
      }

      const recommendations = await response.json();
      const books = JSON.parse(recommendations.recommendations.content).books;
      console.log(books);
      setBooks(books);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      setError("Failed to fetch recommendations.");
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold my-8">Book Recommendations</h1>
        <button
          onClick={generateRecommendations}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Generate Recommendations
        </button>
      </div>
      <div className="flex flex-wrap -mx-4">
        {books.length > 0 ? (
          <ul
            role="list"
            className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 p-16"
          >
            {books.map((book) => (
              <li key={book.ISBN} className="text-center">
                {/* Use ISBN aa a key */}
                <img
                  className="aspect-[3/2] w-full rounded-2xl object-contain"
                  src={`https://covers.openlibrary.org/b/isbn/${book.ISBN}-L.jpg?default=false`}
                  alt={book.title}
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = "booknotfound.jpg"; // Set a fallback image
                  }}
                />
                <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">
                  {book.title}
                </h3>
                <p className="text-base leading-7 text-gray-600">
                  {book.author}
                </p>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => addBookToDatabaseRec(book, userData.id)}
                >
                  Add to saved books
                </button>
              </li>
            ))}
          </ul>
        ) : error ? (
          <p className="mx-auto text-red-700 text-3xl">{error}</p>
        ) : isLoading ? (
          <p className="mx-auto text-green-700 text-3xl">
            Loading recommendations based on your genre preference and saved
            books...
          </p>
        ) : (
          <p className="mx-auto text-3xl">No recommendations yet.</p>
        )}
      </div>
    </div>
  );
};

export default BookRecommendations;
