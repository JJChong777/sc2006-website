"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "../auth/authentication_functions/AuthContext";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const supabase = createClientComponentClient();

export default function GenrePage() {
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
  const [savedGenres, setSavedGenres] = useState([]);

  // Fetch genres from the database
  async function fetchGenres() {
    try {
      const { data, error } = await supabase
        .from("genre")
        .select("genre")
        .eq("user_id", userData?.id);

      if (error) {
        throw error;
      }

      const uniqueGenres = Array.from(new Set(data.map((g) => g.genre)));
      setSavedGenres(uniqueGenres);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  }

  useEffect(() => {
    if (userData?.id) {
      fetchGenres();
    }
  }, [userData?.id]);

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    const updatedGenres = event.target.checked
      ? [...selectedGenres, value]
      : selectedGenres.filter((genre) => genre !== value);
    setSelectedGenres(updatedGenres);
  };

  const handleOtherGenreChange = (event) => {
    setOtherGenre(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const uniqueGenres = Array.from(
      new Set([...selectedGenres, otherGenre.trim()])
    ).filter(Boolean);
    const newGenres = uniqueGenres.filter(
      (genre) => !savedGenres.includes(genre)
    );

    if (newGenres.length > 0) {
      try {
        const { data: existingGenres, error } = await supabase
          .from("genre")
          .select("genre")
          .eq("user_id", userData.id);

        if (error) {
          throw error;
        }

        const existingGenreNames = existingGenres.map((g) => g.genre);

        const genresToAdd = newGenres.filter(
          (genre) => !existingGenreNames.includes(genre)
        );

        if (genresToAdd.length > 0) {
          await supabase
            .from("genre")
            .insert(
              genresToAdd.map((genre) => ({ genre, user_id: userData.id }))
            );
          fetchGenres();
          setOtherGenre("");
          setSelectedGenres([]);
          alert("Genres successfully saved!");
        } else {
          alert("No new genres to add or already saved.");
        }
      } catch (error) {
        console.error("Error saving genres:", error);
      }
    } else {
      alert("No new genres to add or already saved.");
    }
  };

  const removeGenre = async (genreToRemove) => {
    try {
      const { error } = await supabase
        .from("genre")
        .delete()
        .match({ genre: genreToRemove, user_id: userData.id });

      if (error) {
        throw error;
      }

      fetchGenres();
      alert(`Genre '${genreToRemove}' removed successfully.`);
    } catch (error) {
      console.error("Error removing genre:", error);
      alert(`Failed to remove genre '${genreToRemove}'.`);
    }
  };

  return (
    <div className="bg-white px-6 py-12 lg:py-24 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-4xl font-bold text-center text-gray-900 sm:text-5xl">
          Save your genre preferences!
        </h2>
        <p className="mt-6 text-lg text-center leading-8 text-gray-600">
          Not here? Input your preferred genre in the text box below!
        </p>
        <form onSubmit={handleSubmit} className="mt-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-gray-900">
            {genres.map((genre, index) => (
              <div key={index} className="flex items-center">
                <input
                  id={`genre-${index}`}
                  type="checkbox"
                  value={genre}
                  checked={selectedGenres.includes(genre)}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                <label
                  htmlFor={`genre-${index}`}
                  className="text-sm sm:text-base"
                >
                  {genre}
                </label>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Your genre"
              value={otherGenre}
              onChange={handleOtherGenreChange}
              className="w-full mt-2 border-2 border-gray-300 rounded-md p-2 text-sm sm:text-base"
            />
          </div>
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-blue-500 text-white font-bold py-2 px-6 rounded hover:bg-blue-700 transition-colors"
            >
              Save Preferences
            </button>
          </div>
        </form>
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900">Saved Genres:</h3>
          <ul className="mt-2 list-disc list-inside text-gray-600">
            {savedGenres.map((genre, index) => (
              <li
                key={index}
                className="flex justify-between items-center mt-2"
              >
                <span className="text-sm sm:text-base">{genre}</span>
                <button
                  onClick={() => removeGenre(genre)}
                  className="ml-2 bg-red-500 text-white px-2 py-1 text-xs sm:text-sm rounded hover:bg-red-700 transition-colors"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
