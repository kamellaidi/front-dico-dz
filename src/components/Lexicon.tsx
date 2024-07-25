import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Container, Form } from 'react-bootstrap';

interface Word {
  _id: string;
  wordfr: string;
  worddz: string;
  type: string;
}

const Lexicon: React.FC = () => {
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const url = searchQuery
          ? 'http://localhost:3000/api/words/search'
          : 'http://localhost:3000/api/words';
        const response = await axios.get(url, {
          params: searchQuery ? { q: searchQuery } : {}
        });
        setWords(response.data);
      } catch (error) {
        setError('Erreur lors de la récupération des mots');
      } finally {
        setLoading(false);
      }
    };

    fetchWords();
  }, [searchQuery]); // Re-fetch des mots lorsque searchQuery ou isSearching change

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container className='mt-5'>
      <h1 className='mb-5'>Lexique</h1>
      <Form.Group controlId='search' className='d-flex justify-content-end mb-3'>
        <Form.Control
          type='text'
          placeholder='Rechercher...'
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ maxWidth: '300px' }} // Limite la largeur du champ de recherche
        />
      </Form.Group>

      <Table striped bordered hover className='mt-3'>
        <thead>
          <tr>
            <th>Mot en Français</th>
            <th>Mot en Algérien</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {words.map((word) => (
            <tr key={word._id}>
              <td>{word.wordfr}</td>
              <td>{word.worddz}</td>
              <td>{word.type}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Lexicon;
