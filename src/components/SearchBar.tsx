// SearchBar.tsx
import React, { useState, useEffect } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

interface SearchBarProps {
  filters: Record<string, any>;
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ filters, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Convert filters to search term string
    const filterString = Object.entries(filters)
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          return value.map(v => `${key}:${v}`).join(' ');
        }
        return `${key}:${value}`;
      })
      .join(' ');
    setSearchTerm(filterString);
  }, [filters]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <Form onSubmit={handleSearch}>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Search (e.g., active:true tags:science)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="outline-secondary" type="submit">
          <FaSearch />
        </Button>
      </InputGroup>
    </Form>
  );
};

export default SearchBar;