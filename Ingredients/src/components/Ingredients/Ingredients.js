import React, { useReducer, useCallback, useMemo, useEffect } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';
import useHttp from '../../hooks/http';

const ingredientsReducer = (currentIngredients, action) => {
  switch(action.type) {
    case 'SET':
      return action.ingredients;
    case 'ADD':
      return [...currentIngredients, action.newIngredient];
    case 'DELETE':
      return currentIngredients.filter(ingredient => ingredient.id !== action.id);
    default:
      throw new Error('Should not get there!');
  }
};

const Ingredients = () => {
  const [ingredients, dispatch] = useReducer(ingredientsReducer, []);
  const { isLoading, data, error, sendRequest, reqExtra, identifier, clear } = useHttp();

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    dispatch({ type: 'SET', ingredients: filteredIngredients });
  }, []);

  const addIngredientHandler = useCallback(ingredient => {
    sendRequest(
      'https://react-hooks-update-62a28-default-rtdb.firebaseio.com/ingredients.json', 
      'POST', 
      JSON.stringify(ingredient),
      ingredient,
      'ADD_INGREDIENT',
    );
  }, [sendRequest]);

  const removeIngredientHandler = useCallback(id => {
    sendRequest(
      `https://react-hooks-update-62a28-default-rtdb.firebaseio.com/ingredients/${id}.json`,
      'DELETE', 
      null, 
      id,
      'REMOVE_INGREDIENT',
    );
  }, [sendRequest]);

  useEffect(() => {
    if (!isLoading && identifier === 'REMOVE_INGREDIENT') {
      dispatch({ type: 'DELETE', id: reqExtra });
    } else if (!isLoading && !error && data && identifier === 'ADD_INGREDIENT') {
      dispatch({ type: 'ADD', newIngredient: { id: data.name, ...reqExtra } })
    }
  }, [isLoading, data, identifier, reqExtra, error]);

  const ingredientList = useMemo(() => {
    return (
      <IngredientList
        ingredients={ingredients} 
        onRemoveItem={removeIngredientHandler} 
      />
    )
  }, [ingredients, removeIngredientHandler]);

  return (
    <div className="App">
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}

      <IngredientForm onAddIngredient={addIngredientHandler} loading={isLoading} />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        {ingredientList}
      </section>
    </div>
  );
}

export default Ingredients;
