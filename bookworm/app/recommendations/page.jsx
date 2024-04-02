"use client";
import { useState, useEffect } from "react";
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

const BookCard = ({ book }) => {
  return (
    <li key={book.ISBN} className="text-center">
      {/* Use ISBN or title as a fallback key */}
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
      <p className="text-base leading-7 text-gray-600">{book.author}</p>
    </li>
  );
};

const BookRecommendations = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  // const [availabilityData, setAvailabilityData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { userData } = useAuth();

  // useEffect(() => {
  //   const fetchAvailability = async () => {
  //     const availabilityData = {};

  //     // Fetch availability for each book
  //     for (const book of books) {
  //       const isbn = book.ISBN.trim();
  //       try {
  //         const response = await fetch(`/api/availability?ISBN=${isbn}`);
  //         if (!response.ok) throw new Error("Network response was not ok.");
  //         const data = await response.json();
  //         availabilityData[isbn] = [];
  //         if (data.items.length <= 0) availabilityData[isbn] = null;
  //         data.items.forEach((item) =>
  //           availabilityData[isbn].push(item["location"]["name"])
  //         );
  //       } catch (error) {
  //         console.error("Error fetching availability:", error);
  //         availabilityData[isbn] = null;
  //       }
  //     }

  //     setAvailabilityData(availabilityData);
  //   };

  //   if (books.length) {
  //     fetchAvailability();
  //   }
  // }, [books]); // Dependency array, re-run the effect if books changes

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
              <BookCard key={book.ISBN} book={book} />
            ))}
          </ul>
        ) : error ? (
          <p className="mx-auto text-red-700 text-3xl">{error}</p>
        ) : isLoading ? (
          <p className="mx-auto text-green-700 text-3xl">
            ChatGPT is loading recommendations...
          </p>
        ) : (
          <p className="mx-auto text-3xl">No recommendations yet.</p>
        )}
      </div>
    </div>
  );
};

export default BookRecommendations;
