import React, { useState, useCallback } from 'react';
import { Container, Form, Button, Table, Modal } from 'react-bootstrap';
import axios from 'axios';
import { useFetchWords } from '../hooks/useFetchWords';
import { WORDS_ENDPOINT } from '../config/config';
import { useDebounce } from '../hooks/useDebounce';
import ActionButtons from './ActionButtons';

interface Word {
  _id: string;
  wordfr: string;
  worddz: string;
  type: string;
}

const WordAdmin: React.FC = () => {
  const [newWord, setNewWord] = useState({ wordfr: '', worddz: '', type: '' });
  const [editingWord, setEditingWord] = useState<Word | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const { words, loading, error } = useFetchWords(
    debouncedSearchQuery,
    refreshTrigger
  );

  const refreshWords = useCallback(() => {
    setRefreshTrigger((prev) => prev + 1);
  }, []);

  const handleAddWord = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(WORDS_ENDPOINT, newWord);
      setNewWord({ wordfr: '', worddz: '', type: '' });
      refreshWords();
    } catch (error) {
      console.error("Erreur lors de l'ajout du mot:", error);
    }
  };

  const handleUpdateWord = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingWord) return;
    try {
      await axios.put(`${WORDS_ENDPOINT}/${editingWord._id}`, editingWord);
      setEditingWord(null);
      setShowModal(false);
      refreshWords();
    } catch (error) {
      console.error('Erreur lors de la mise à jour du mot:', error);
    }
  };

  const handleDeleteWord = async (id: string) => {
    try {
      await axios.delete(`${WORDS_ENDPOINT}/${id}`);
      refreshWords();
    } catch (error) {
      console.error('Erreur lors de la suppression du mot:', error);
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error}</div>;

  return (
    <Container>
      <h1 className='my-4'>Administration des mots</h1>

      <Form onSubmit={handleAddWord} className='mb-4'>
        <Form.Group>
          <Form.Label>Mot en français</Form.Label>
          <Form.Control
            type='text'
            value={newWord.wordfr}
            onChange={(e) => setNewWord({ ...newWord, wordfr: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Mot en algérien</Form.Label>
          <Form.Control
            type='text'
            value={newWord.worddz}
            onChange={(e) => setNewWord({ ...newWord, worddz: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Type</Form.Label>
          <Form.Control
            type='text'
            value={newWord.type}
            onChange={(e) => setNewWord({ ...newWord, type: e.target.value })}
            required
          />
        </Form.Group>
        <Button type='submit' className='mt-2'>
          Ajouter un mot
        </Button>
      </Form>

      <Form className='mb-4'>
        <Form.Group>
          <Form.Label>Rechercher</Form.Label>
          <Form.Control
            type='text'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Form.Group>
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Français</th>
            <th>Algérien</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {words.map((word) => (
            <tr key={word._id}>
              <td>{word.wordfr}</td>
              <td>{word.worddz}</td>
              <td>{word.type}</td>
              <td>
                <ActionButtons
                  onEdit={() => {
                    setEditingWord(word);
                    setShowModal(true);
                  }}
                  onDelete={() => handleDeleteWord(word._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier le mot</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdateWord}>
            <Form.Group>
              <Form.Label>Mot en français</Form.Label>
              <Form.Control
                type='text'
                value={editingWord?.wordfr || ''}
                onChange={(e) =>
                  setEditingWord(
                    editingWord
                      ? { ...editingWord, wordfr: e.target.value }
                      : null
                  )
                }
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Mot en algérien</Form.Label>
              <Form.Control
                type='text'
                value={editingWord?.worddz || ''}
                onChange={(e) =>
                  setEditingWord(
                    editingWord
                      ? { ...editingWord, worddz: e.target.value }
                      : null
                  )
                }
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Type</Form.Label>
              <Form.Control
                type='text'
                value={editingWord?.type || ''}
                onChange={(e) =>
                  setEditingWord(
                    editingWord
                      ? { ...editingWord, type: e.target.value }
                      : null
                  )
                }
                required
              />
            </Form.Group>
            <Button type='submit' className='mt-2'>
              Mettre à jour
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default WordAdmin;
