function LibList({ libData }) {
  return (
    <div className="absolute ml-64 h-32 overflow-y-scroll px-4 py-8">
      <ul className="list-none space-y-2">
        {libData.map((lib) => (
          <li key={lib.libName} className="group">
            <button
              type="button"
              className="w-16 py-2 px-4 text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {lib.libName}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LibList;
