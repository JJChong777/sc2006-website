export default async function getLibraries() {
  try {
    const response = await fetch("http://localhost:3000/api/librarydata");

    // Check for successful response
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the response based on its content type (JSON, text, etc.)
    const data = await response.json(); // Assuming the response is JSON

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    // Handle errors appropriately (e.g., return default data, display error message)
  }
}
