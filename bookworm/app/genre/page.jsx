"use client";
import React, { useState } from "react";
import { useAuth } from "../auth/authentication_functions/AuthContext";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
const supabase = createClientComponentClient();
export default function Example() {
  const genres = [
    "Art",
    "Biography",
    "Business",
    "Chick Lit",
    "Children's",
    "Christian",
    "Classics",
    "Comics",
    "Contemporary",
    "Cookbooks",
    "Crime",
    "Ebooks",
    "Fantasy",
    "Fiction",
    "Non-Fiction",
    "Graphic Novels",
    "Historical Fiction",
    "History",
    "Horror",
    "Humor and Comedy",
  ];
  const { userData } = useAuth();

  const [selectedGenres, setSelectedGenres] = useState([]);
  const [otherGenre, setOtherGenre] = useState("");

  const handleCheckboxChange = (event) => {
    if (event.target.checked) {
      setSelectedGenres([...selectedGenres, event.target.value]);
    } else {
      setSelectedGenres(
        selectedGenres.filter((genre) => genre !== event.target.value)
      );
    }
  };

  const handleOtherGenreChange = (event) => {
    setOtherGenre(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();  
    const updatedSelectedGenres = otherGenre.trim()
      ? [...selectedGenres, otherGenre.trim()].filter(Boolean)
      : selectedGenres.filter(Boolean);
  
    console.log("Selected Genres: ", updatedSelectedGenres);
    setOtherGenre("");
    const ToInsert = updatedSelectedGenres.map((genre) => ({
      genre: genre,
      user_id: userData.id,
    }));
  
    const { data, error } = await supabase
      .from("genre")
      .insert(ToInsert);
  
    if (error) {
      console.error("Error inserting data into Supabase", error);
    } else {
      console.log("Successfully inserted genres into Supabase", data);
      alert("Genres successfully saved!");
    }
  };
  

  return (
    <div className="bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Save your genre preferences!
        </h2>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Not here? Input your preferred genre in the text box below!
        </p>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-4 gap-4 text-gray-900">
            {genres.map((genre, index) => (
              <label key={index}>
                <input
                  type="checkbox"
                  value={genre}
                  checked={selectedGenres.includes(genre)}
                  onChange={handleCheckboxChange}
                />{" "}
                {genre}
              </label>
            ))}
          </div>
          <div>
            <input
              type="text"
              placeholder="Your genre"
              value={otherGenre}
              onChange={handleOtherGenreChange}
              className="mt-6 border-2 border-gray-300 rounded-md p-2" // Added border and padding
            />
          </div>
          <div>
            <button
              type="submit"
              className="mt-6 bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition-colors" // Styled the button
            >
              Save Preferences
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
