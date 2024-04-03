import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
const supabase = createClientComponentClient();

async function addBookToDatabaseRec(book, userId) {
  const { data, error } = await supabase
    .from("userLibrary") // Ensure this matches your actual table name
    .insert([
      {
        ISBN: book.ISBN,
        booktitle: book.title,
        user_id: userId,
      },
    ]);

  if (error) {
    console.error("Error saving the book:", error);
    return false;
  }

  console.log("Book saved successfully:", data);
  alert(`${book.title} added to user library!`);
  return true;
}

export { addBookToDatabaseRec };
