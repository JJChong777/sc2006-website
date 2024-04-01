"use client"
import React, { useState } from 'react';
import { useAuth } from "../auth/authentication_functions/AuthContext";

const BookCard = ({ book }) => {
    return (
      <div className="max-w-sm w-full lg:max-w-full p-4">
        <div className="border border-gray-200 bg-white rounded-lg shadow-lg">
          <img
            className="h-48 w-full object-cover rounded-t-lg"
            src={book.image || '/default-cover.jpg'}
            alt={`Cover of the book: ${book.title}`}
          />
          <div className="p-4">
            <h3 className="font-bold text-lg mb-2">{book.title}</h3>
            <p className="text-gray-800 text-sm mb-2">{book.author || 'Author Unknown'}</p>
            <p className="text-gray-600 text-sm">{book.description || 'No description available.'}</p>
          </div>
        </div>
      </div>
    );
  };
  
  const BookRecommendations = () => {
    const { userData } = useAuth();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
  
    
    const userId = userData ? userData.id: null; // Ensure this is correctly obtained from your authentication context

    
    const generateRecommendations = async () => {
      setLoading(true);
      setError('');
  
      if (!userData || !userData.id) {
        setError('User not authenticated');
        setLoading(false);
        return;
      }
  
      try {
        const response = await fetch('/api/chatgpt', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: userData.id }),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Network response was not ok');
        }
  
        const data = await response.json();
        const recommendations = JSON.parse(data.recommendations); // Make sure this matches the response structure
        // Process and display the recommendations
        // Assuming recommendations is an array of book objects
        setBooks(recommendations.map((title, index) => ({
          id: index, // or any unique identifier
          title, // assuming the response directly contains titles
          // Populate other fields as necessary, depending on the API response structure
        })));
      } catch (error) {
        console.error('Failed to generate recommendations:', error);
        setError('Failed to generate recommendations. Please try again.');
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div className="container mx-auto px-4 py-8">
        {/* UI elements */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold">Book Recommendations</h1>
          <p className="text-gray-600 mt-2">Find new books based on your preferences</p>
        </div>
  
        <div className="flex justify-center mb-6">
          <button
            onClick={generateRecommendations}
            disabled={loading}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Generating...' : 'Generate Recommendations'}
          </button>
        </div>
  
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
  
        <div className="flex flex-wrap -m-4 justify-center">
          {books.map((book, index) => (
            <BookCard key={index} book={book} />
          ))}
  
          {!loading && books.length === 0 && (
            <p className="text-center w-full mt-5 text-gray-600">No books found. Try generating recommendations!</p>
          )}
        </div>
      </div>
    );
  };
  
  export default BookRecommendations;
  