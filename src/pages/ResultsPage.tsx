import React from 'react';
import { useState, useEffect } from 'react';
import type { Character } from '../types';
import { fetchCharacters } from '../services/characterService';
import Header from '../components/Header/Header';
import Loader from '../components/Loader/Loader';
import CardList from '../components/CardList/CardList';
import NoResults from '../components/NoResults/NoResults';

const ResultsPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadCharacters = async (inputValue: string = ''): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const results = await fetchCharacters(inputValue);
      setSearchResults(results);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCharacters(inputValue);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  const handleSubmitButton = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    loadCharacters(inputValue);
    setInputValue('');
  };

  return (
    <div className="App">
      <Header
        inputValue={inputValue}
        onInputChange={handleInputChange}
        onSearchSubmit={handleSubmitButton}
      />

      {isLoading ? (
        <Loader />
      ) : searchResults.length ? (
        <CardList results={searchResults} />
      ) : (
        <NoResults />
      )}

      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default ResultsPage;
