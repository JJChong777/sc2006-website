"use client";
import { useState, useEffect } from "react";
import { useAuth } from "../auth/authentication_functions/AuthContext";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const supabase = createClientComponentClient();

export default function UserLibrary() {
  const [books, setBooks] = useState([]);
  const [sortBy, setSortBy] = useState('booktitle');
  const { userData } = useAuth();

  const fetchBooks = async () => {
    if (userData && userData.id) {
      try {
        const { data: fetchedBooks, error } = await supabase
          .from("userLibrary")
          .select("booktitle, author")
          .eq("user_id", userData.id)
          .order(sortBy);

        if (error) {
          throw error;
        }

        setBooks(fetchedBooks);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    } else {
      console.log("User data or user ID not available");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [userData, sortBy]);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleremovebook = async (titleToRemove) => {
    try {
      await supabase
        .from("userLibrary")
        .delete()
        .eq("user_id", userData.id)
        .eq("booktitle", titleToRemove);

      alert("Book Removed Successfully!");
      fetchBooks(); // Refresh the list of saved books
    } catch (error) {
      console.error("Error removing book:", error);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-48 border-r border-gray-200 bg-white">
        <nav className="flex flex-col py-4">
          <ul role="list" className="space-y-1">
            <li>
              <a
                href="/genre"
                className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
              >
                Set your genre preferences!
              </a>
            </li>
            <li className="mt-4">
              <label htmlFor="sort" className="block text-sm font-medium text-gray-700 pl-3">
                Sort by:
              </label>
              <select
                id="sort"
                name="sort"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={sortBy}
                onChange={handleSortChange}
              >
                <option value="booktitle">Book Title</option>
                <option value="author">Author</option>
              </select>
            </li>
          </ul>
        </nav>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <h2 className="text-2xl font-semibold mb-4">Your Library</h2>
        <div className="grid grid-cols-1 gap-4">
          {books.map((book, index) => (
            <div key={index} className="border rounded-md overflow-hidden">
              <div className="p-4 flex flex-col h-full justify-between">
                <div>
                  <h3 className="text-lg font-bold mb-2">{book.booktitle}</h3>
                  <div className="flex justify-between items-center">
                    <p className="text-sm">{book.author ? `Author: ${book.author}` : "Author: Not available"}</p>
                    <button
                      onClick={() => handleremovebook(book.booktitle)}
                      className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 focus:outline-none focus:bg-red-600 text-s"
                    >
                      Remove this book!
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {books.length === 0 && (
            <p className="text-center text-gray-500">
              No books found in your library.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
