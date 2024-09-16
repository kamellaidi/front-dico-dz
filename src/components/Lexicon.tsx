// src/components/Lexicon.tsx
import React, { useState } from 'react';
import { Container, Card } from 'react-bootstrap';
import SearchBar from './SearchBar';
import WordTable from './WordTable';
import { useDebounce } from '../hooks/useDebounce';
import { useFetchWords } from '../hooks/useFetchWords';

const Lexicon: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const { words, loading, error } = useFetchWords(debouncedSearchQuery);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Container className="py-5">
      <h1 className="text-primary mb-4">Lexique</h1>
      <Card className="shadow-sm">
        <Card.Body>
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <WordTable words={words} />
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Lexicon;