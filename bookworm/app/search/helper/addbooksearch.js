import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
const supabase = createClientComponentClient();

async function addBookToDatabaseSearch(book, userId) {
  const { data: existingBooks, error: selectError } = await supabase
    .from("userLibrary")
    .select("ISBN")
    .eq("user_id", userId);

  if (selectError) {
    console.error(
      "Error selecting books from user library:",
      selectError.message
    );
    return false;
  }

  const existingBooksISBN = existingBooks.map((book) => book.ISBN);

  if (existingBooksISBN.includes(book.isbns[0].trim())) {
    alert("Book already exists in user library!");
    return;
  }

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
  alert(`${book.title} added to user library!`);
  return true;
}

export { addBookToDatabaseSearch };
