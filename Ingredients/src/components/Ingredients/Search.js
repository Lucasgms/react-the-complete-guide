import React, { useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import ErrorModal from '../UI/ErrorModal';
import useHttp from '../../hooks/http';
import './Search.css';

const Search = React.memo(props => {
  const { onLoadIngredients } = props;
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef();
  const { loading, data, error, sendRequest, clear } = useHttp();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm === inputRef.current.value) {
        const query = searchTerm.length === 0 ? '' : `?orderBy="title"&equalTo="${searchTerm}"`;
        sendRequest(
          'https://react-hooks-update-62a28-default-rtdb.firebaseio.com/ingredients.json' + query, 
          'GET',
        );
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm, onLoadIngredients, inputRef, sendRequest]);

  useEffect(() => {
    if (!loading && !error && data) {
      const loadedIngredients = [];
      for (const key in data) {
        loadedIngredients.push({
          id: key,
          title: data[key].title,
          amount: data[key].amount,
        });
      }
      onLoadIngredients(loadedIngredients);
    }
  }, [data, loading, error, onLoadIngredients]);

  return (
    <section className="search">
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          {loading && <span>...loading</span>}
          <input ref={inputRef} type="text" value={searchTerm} onChange={event => setSearchTerm(event.target.value)} />
        </div>
      </Card>
    </section>
  );
});

export default Search;
