"use client";
import { FolderIcon } from "@heroicons/react/24/outline";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState, useEffect } from "react";
import { useAuth } from "../auth/authentication_functions/AuthContext";

const supabase = createClientComponentClient();

export default function UserLibrary() {
  const [books, setBooks] = useState([]);
  const { userData } = useAuth();
  const sortBooksAlphabetically = () => {
    const sortedBooks = [...books].sort((a, b) =>
      a.booktitle.localeCompare(b.booktitle)
    );
    setBooks(sortedBooks);
  };

  useEffect(() => {
    const fetchBooks = async () => {
      if (userData && userData.id) {
        console.log("Fetching books for user ID:", userData.id);
        let { data: fetchedBooks, error } = await supabase
          .from("userLibrary")
          .select("booktitle")
          .eq("user_id", userData.id);

        if (error) {
          console.error("error", error);
        } else {
          // Deduplicate books based on booktitle
          const titles = new Set();
          const uniqueBooks = fetchedBooks.filter((book) => {
            if (!titles.has(book.booktitle)) {
              titles.add(book.booktitle);
              return true;
            }
            return false;
          });

          setBooks(uniqueBooks);
        }
      } else {
        console.log("User data or user ID not available");
      }
    };

    fetchBooks();
  }, [userData]);

  return (
    <div className="min-h-screen flex">
      <div className="w-48 border-r border-gray-200 bg-white">
        <nav className="flex flex-col py-4">
          <ul role="list" className="space-y-1">
            <li>
              <a
                href="/genre"
                className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-50 pl-8"
              >
                Set your genre preferences!
              </a>
            </li>
            <li>
              <button
                onClick={sortBooksAlphabetically}
                className="group flex items-center px-3 py-2 w-full text-left text-sm font-medium rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-50 pl-8"
              >
                Sort Alphabetically
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <h2 className="text-2xl font-semibold mb-4">Your Library</h2>
        {books.length > 0 ? (
          <ul className="space-y-2">
            {books.map((book, index) => (
              <li key={index} className="border p-4 rounded-md">
                <h3 className="text-lg font-bold">{book.booktitle}</h3>
              </li>
            ))}
          </ul>
        ) : (
          <p>No books found in your library.</p>
        )}
      </div>
    </div>
  );
}
