import React from 'react';

export default function KnowledgeSearch({ searchQuery, onSearch }) {
  const handleSearchChange = (event) => {
    onSearch(event.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search..."
      value={searchQuery}
      onChange={handleSearchChange}
    />
  );
}
