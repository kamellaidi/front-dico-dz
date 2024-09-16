import React from 'react';
import { Form } from 'react-bootstrap';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => (
  <Form.Group controlId='search' className='d-flex justify-content-end mb-3'>
    <Form.Control
      type='text'
      placeholder='Rechercher...'
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ maxWidth: '300px' }}
      aria-label="Rechercher des mots"
    />
  </Form.Group>
);

export default SearchBar;