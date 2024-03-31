"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function SearchResultsPage() {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  function extractIsbns(isbns) {
    for (const isbn of isbns) {
      const cleanISBN = isbn.split(" ")[0];
      return cleanISBN;
    }
  }

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        if (!search) return;
        const response = await fetch(
          `http://localhost:3000/api/search?keyword=${search}`
        );
        const jsonData = await response.json();
        console.log(jsonData);
        setSearchResults(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSearchResults();
  }, [search]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {(!search || searchResults.length === 0 || error) && (
        <>
          <h1 className="text-4xl font-bold text-red-600">
            Error!
            {!search
              ? " No search query specified. "
              : searchResults.length === 0
              ? " No search results found. "
              : ` Problem fetching data. Error message : ${error} `}
            Try again
          </h1>
          <Link
            href="/search"
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Go back to Search
          </Link>
        </>
      )}

      {searchResults.length > 0 && (
        <ul className="list-disc space-y-4">
          {searchResults.map((result) => (
            <li key={result.title} className="hover:bg-gray-100 p-2 rounded">
              {/* Customize result rendering here */}
              <div className="flex items-center space-x-4">
                {result["isbns"].length > 0 && (
                  <img
                    className="w-20 h-20 rounded-full object-cover"
                    src={`https://covers.openlibrary.org/b/isbn/${extractIsbns(
                      result["isbns"]
                    )}-L.jpg`}
                    alt={result.title}
                  />
                )}
              </div>
              <h3 className="text-xl font-medium">{result.title}</h3>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
