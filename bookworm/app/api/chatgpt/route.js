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

export async function GET(request) {
  // userID is hardcoded right now, need to fix
  const userId = request.nextUrl.searchParams.get("userId");
  if (!userId)
    return NextResponse.json({
      error: "No userId specified, try ?userId={userId here}",
    });

  try {
    const bookTitles = await getUserSavedBooks(userId);

    const prompt = `Based on the following books: ${bookTitles.join(
      ", "
    )}, what are 5 similar book ISBNs and author you would recommend?`;

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
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

// export async function POST(request) {
//   // userID is hardcoded right now, need to fix
//   const userId = '69eda37f-dc8f-4799-9869-3372bff1928c';

//   try {
//     const bookTitles = await getUserSavedBooks(userId);

//     const prompt = `Based on the following books: ${bookTitles.join(', ')}, what are 5 similar books you would recommend?`;

//     const chatCompletion = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages: [{ role: "user", content: prompt }],
//     });

//     return new Response(JSON.stringify({ recommendations: chatCompletion.choices[0].message }), {
//       status: 200,
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//   } catch (error) {

//     console.error('Error processing request:', error);
//     return new Response(JSON.stringify({ error: error.message || 'An error occurred while processing your request.' }), {
//       status: 500,
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//   }
// }
