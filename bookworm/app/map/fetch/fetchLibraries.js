export default async function fetchLibraries() {
  try {
    const response = await fetch("/api/librarydata");

    // Check for successful response
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the response based on its content type (JSON, text, etc.)
    const data = await response.json(); // Assuming the response is JSON
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    alert("Error fetching data!");
    // Handle errors appropriately (e.g., return default data, display error message)
  }
}
