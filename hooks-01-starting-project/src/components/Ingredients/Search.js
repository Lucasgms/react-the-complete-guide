import React, { useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const { onLoadIngredients } = props;
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm === inputRef.current.value) {
        const query = searchTerm.length === 0 ? '' : `?orderBy="title"&equalTo="${searchTerm}"`;
        fetch('https://react-hooks-update-62a28-default-rtdb.firebaseio.com/ingredients.json' + query)
          .then(response => response.json())
          .then(responseData => {
            const loadedIngredients = [];
            for (const key in responseData) {
              loadedIngredients.push({
                id: key,
                title: responseData[key].title,
                amount: responseData[key].amount,
              });
            }
            onLoadIngredients(loadedIngredients);
          });
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm, onLoadIngredients, inputRef]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input ref={inputRef} type="text" value={searchTerm} onChange={event => setSearchTerm(event.target.value)} />
        </div>
      </Card>
    </section>
  );
});

export default Search;
