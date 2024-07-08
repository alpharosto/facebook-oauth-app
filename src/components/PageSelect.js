// src/components/PageSelect.js
import React from 'react';


const PageSelect = ({ pages, onSelectPage }) => {
  return (
    <select onChange={(e) => onSelectPage(e.target.value)}>
      <option value="">Select a page</option>
      {pages.map((page) => (
        <option key={page.id} value={page.id}>{page.name}</option>
      ))}
    </select>
    
  );
};

export default PageSelect;