import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
const supabase = createClientComponentClient();

async function addBookToDatabase(book, userId) {
  const { data, error } = await supabase
    .from("userLibrary") // Ensure this matches your actual table name
    .insert([
      {
        ISBN: book.isbns[0].trim(),
        booktitle: book.title,
        user_id: userId,
      },
    ]);

  if (error) {
    console.error("Error saving the book:", error);
    return false;
  }

  console.log("Book saved successfully:", data);
  return true;
}

export { addBookToDatabase };
