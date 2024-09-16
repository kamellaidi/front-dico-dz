// src/hooks/useFetchWords.ts
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { WORDS_ENDPOINT, SEARCH_ENDPOINT } from '../config/config';

interface Word {
  _id: string;
  wordfr: string;
  worddz: string;
  type: string;
}

export function useFetchWords(debouncedSearchQuery: string) {
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWords = useCallback(async () => {
    try {
      const url = debouncedSearchQuery ? SEARCH_ENDPOINT : WORDS_ENDPOINT;
      const response = await axios.get(url, {
        params: debouncedSearchQuery ? { q: debouncedSearchQuery } : {}
      });
      setWords(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(`Erreur lors de la récupération des mots: ${error.response?.data?.message || error.message}`);
      } else {
        setError("Une erreur inattendue s'est produite");
      }
    } finally {
      setLoading(false);
    }
  }, [debouncedSearchQuery]);

  useEffect(() => {
    fetchWords();
  }, [fetchWords]);

  return { words, loading, error };
}