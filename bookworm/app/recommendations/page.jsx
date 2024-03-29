"use client"
import React, { useState } from 'react';

// Sample book data
const initialBooks = [
    {
      id: 1,
      title: 'Harry Potter and the Sorcerer’s Stone',
      author: 'J.K. Rowling',
      description: 'The first book in the Harry Potter series, introducing Harry Potter, a young wizard, and his adventures at Hogwarts School of Witchcraft and Wizardry.',
      image: '/harrypotterandsorcerer.jpg', // Correct the file name if necessary
    },
    {
      id: 2,
      title: 'Divergent',
      author: 'Veronica Roth',
      description: 'A thrilling dystopian novel about a society divided into five factions, where Tris Prior must choose her place and face the consequences.',
      image: '/divergent.jpg', // Correct the file name if necessary
    },
    {
      id: 3,
      title: 'The Hobbit',
      author: 'J.R.R. Tolkien',
      description: 'The adventure of Bilbo Baggins as he journeys to the Lonely Mountain with a spirited group of dwarves to reclaim their mountain home from a dragon named Smaug.',
      image: '/thehobbitt.jpg', // Correct the file name if necessary
    },
    {
      id: 4,
      title: 'Insurgent',
      author: 'Veronica Roth',
      description: 'The second installment in the Divergent series, following Tris as she fights against a powerful alliance that threatens to tear her society apart.',
      image: '/insurgent.jpg', // Correct the file name if necessary
    },
    {
      id: 5,
      title: 'Four',
      author: 'Veronica Roth',
      description: 'A companion volume to the Divergent series, telling the story from the perspective of Tobias Eaton, known as "Four".',
      image: '/four.jpg', // This is the correct path as you indicated you have this image
    },
    {
      id: 6,
      title: 'Harry Potter and the Philosopher’s Stone',
      author: 'J.K. Rowling',
      description: 'The British version of the first book in the Harry Potter series, where the young wizard Harry Potter discovers his magical heritage and attends Hogwarts.',
      image: '/harrypotterandphilostone.jpg', // Correct the file name if necessary
    },
  ];

  const BookCard = ({ book }) => {
    return (
      <div className="w-1/6 p-4 flex flex-col">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden flex-1 flex flex-col">
          <img className="flex-shrink-0 w-full h-48 object-contain" src={book.image} alt={`Cover of the book ${book.title}`} />
          <div className="p-4 flex-1 flex flex-col justify-between">
            <h3 className="font-bold text-lg text-center mb-2">{book.title}</h3>
            <p className="text-sm text-gray-700 flex-1">{book.description}</p>
            <p className="text-sm text-gray-600 text-center mt-2">By {book.author}</p>
          </div>
        </div>
      </div>
    );
  };
  
const BookRecommendations = () => {
  const [books, setBooks] = useState(initialBooks);

  const generateRecommendations = () => {
    // Placeholder function to change book recommendations
    console.log('Generate new book recommendations');
    // This function would ideally fetch new books and set them using setBooks
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
        {books.map(book => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default BookRecommendations;
