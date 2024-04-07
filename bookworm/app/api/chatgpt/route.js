import { createClient } from "@supabase/supabase-js";
import OpenAI from "openai";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function getUserSavedBooks(userId) {
  console.log("Attempting to fetch books for userID:", userId);
  const { data, error } = await supabase
    .from("userLibrary")
    .select("booktitle")
    .eq("user_id", userId); 

  if (error) {
    console.error("Supabase error:", error);
    throw new Error("Failed to fetch user's saved books.");
  }

  console.log("Books fetched successfully:", data);
  return data.map((book) => book.booktitle);
}

async function getUserSavedGenres(userId) {
  console.log("Attempting to fetch genres for userID:", userId);
  const { data, error } = await supabase
    .from("genre")
    .select("genre")
    .eq("user_id", userId);

  if (error) {
    console.error("Supabase error:", error);
    throw new Error("Failed to fetch user's preferred genres.");
  }

  console.log("Genres fetched successfully:", data);
  return data.map((entry) => entry.genre);
}

export async function GET(request) {
  const userId = request.nextUrl.searchParams.get("userId");
  if (!userId) {
    return new Response(JSON.stringify({
      error: "No userId specified, try ?userId={userId here}",
    }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    const bookTitles = await getUserSavedBooks(userId);
    const genres = await getUserSavedGenres(userId);

    const prompt = `Based on the following books: ${bookTitles.join(
      ", "
    )} and preferred genres: ${genres.join(", ")}, what are 5 similar book ISBNs and authors you would recommend? Only provide a RFC8259 compliant JSON response, following this format without deviation. The overall object key must be books, and each item in the JSON response must only have object keys of title, ISBN, and author respectively, with no dashes in the ISBN`;

    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    return new Response(
      JSON.stringify({ recommendations: chatCompletion.choices[0].message }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(
      JSON.stringify({
        error:
          error.message || "An error occurred while processing your request.",
      }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

