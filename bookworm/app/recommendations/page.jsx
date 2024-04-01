"use client";
import { useState } from "react";
import { useAuth } from "../auth/authentication_functions/AuthContext";

// Sample book data
// const initialBooks = [
//   {
//     id: 1,
//     title: "Harry Potter and the Sorcerer’s Stone",
//     author: "J.K. Rowling",
//     description:
//       "The first book in the Harry Potter series, introducing Harry Potter, a young wizard, and his adventures at Hogwarts School of Witchcraft and Wizardry.",
//     image: "/harrypotterandsorcerer.jpg", // Correct the file name if necessary
//   },
//   {
//     id: 2,
//     title: "Divergent",
//     author: "Veronica Roth",
//     description:
//       "A thrilling dystopian novel about a society divided into five factions, where Tris Prior must choose her place and face the consequences.",
//     image: "/divergent.jpg", // Correct the file name if necessary
//   },
//   {
//     id: 3,
//     title: "The Hobbit",
//     author: "J.R.R. Tolkien",
//     description:
//       "The adventure of Bilbo Baggins as he journeys to the Lonely Mountain with a spirited group of dwarves to reclaim their mountain home from a dragon named Smaug.",
//     image: "/thehobbitt.jpg", // Correct the file name if necessary
//   },
//   {
//     id: 4,
//     title: "Insurgent",
//     author: "Veronica Roth",
//     description:
//       "The second installment in the Divergent series, following Tris as she fights against a powerful alliance that threatens to tear her society apart.",
//     image: "/insurgent.jpg", // Correct the file name if necessary
//   },
//   {
//     id: 5,
//     title: "Four",
//     author: "Veronica Roth",
//     description:
//       'A companion volume to the Divergent series, telling the story from the perspective of Tobias Eaton, known as "Four".',
//     image: "/four.jpg", // This is the correct path as you indicated you have this image
//   },
//   {
//     id: 6,
//     title: "Harry Potter and the Philosopher’s Stone",
//     author: "J.K. Rowling",
//     description:
//       "The British version of the first book in the Harry Potter series, where the young wizard Harry Potter discovers his magical heritage and attends Hogwarts.",
//     image: "/harrypotterandphilostone.jpg", // Correct the file name if necessary
//   },
// ];

function filterMethod1(bookEntries) {
  const books = [];
  let currentBook = {}; // Object to store current book data

  for (const entry of bookEntries) {
    // Check for empty string (end of current book)
    if (entry.trim() === "") {
      if (Object.keys(currentBook).length > 0) {
        // Only add if data exists
        books.push(currentBook); // Add current book to array
      }
      currentBook = {}; // Reset object for next book
    } else {
      const parts = entry.trim().split(": "); // Split by colon (": ")
      const key = parts[0].toLowerCase(); // Convert key to lowercase
      const value = parts[1]; // Extract value

      currentBook[key] = value; // Add key-value pair to current book
    }
  }

  // Add the last book if data exists
  if (Object.keys(currentBook).length > 0) {
    books.push(currentBook);
  }

  return books;
}

function filterMethod2(bookEntries) {
  const bookDetails = [];
  for (const entry of bookEntries) {
    const parts = entry.split(" - ISBN: "); // Split each entry by ISBN delimiter

    if (parts.length === 2) {
      const titlePart = parts[0].trim(); // Title is the entire first part trimmed
      const author = titlePart.split(/by |: /).pop(); // Extract author (after "by" or ":")
      const isbn = parts[1].trim().replace(/-/g, ""); // Extract ISBN (trimmed)

      bookDetails.push({ title: titlePart.slice(3), author, isbn }); // Add details to an object
    } else {
      console.warn("Invalid format for:", entry); // Warn for invalid entries
    }
  }
  return bookDetails;
}

const BookCard = ({ book }) => {
  return (
    <div className="w-1/6 p-4 flex flex-col">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden flex-1 flex flex-col">
        <img
          className="flex-shrink-0 w-full h-48 object-contain"
          src={`https://covers.openlibrary.org/b/isbn/${book.isbns?.[0]?.trim()}-L.jpg?default=false`}
          alt={book.title}
          loading="lazy"
          onError={(e) => {
            e.target.src = "booknotfound.jpg"; // Set a fallback image
          }}
        />
        <div className="p-4 flex-1 flex flex-col justify-between">
          <h3 className="font-bold text-lg text-center mb-2">{book.title}</h3>
          <p className="text-sm text-gray-600 text-center mt-2">
            By {book.author}
          </p>
        </div>
      </div>
    </div>
  );
};

const BookRecommendations = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  const [res, setRes] = useState("");
  const { userData } = useAuth();

  const generateRecommendations = async () => {
    const userId = userData.id;
    if (!userId) return;

    try {
      // Note: Using a GET request with query parameters
      const response = await fetch(`/api/chatgpt?userId=${userId}`);

      if (!response.ok) {
        throw new Error("Getting recommendations failed");
      }

      const recommendations = await response.json();
      setRes(res);
      const bookEntries = recommendations.recommendations.content.split("\n");
      console.log(bookEntries);
      if (bookEntries.length > 5) {
        setBooks(filterMethod1(bookEntries));
        console.log(books);
      } else {
        setBooks(filterMethod2(bookEntries));
        console.log(books);
      }
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
          books.map((book) => <BookCard key={book.isbn} book={book} />)
        ) : (
          <p>No reccomendations yet!</p>
        )}
      </div>
    </div>
  );
};

export default BookRecommendations;
