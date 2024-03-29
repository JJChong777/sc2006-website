import React from 'react';

const ResultsPage = ({ location }) => {
  const { results } = location.state; // Get search results from location state

  return (
    <div>
      <h1>Search Results</h1>
      <ul>
        {results.map((result) => (
          <li key={result.id}>{result.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default ResultsPage;
