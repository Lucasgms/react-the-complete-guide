import { useReducer, useCallback } from 'react';

const initialData = { 
  loading: false, 
  error: null, 
  data: null, 
  extra: null, 
  identifier: null 
};

const httpReducer = (httpState, action) => {
  switch(action.type) {
    case 'SEND':
      return { loading: true, error: null, data: null, extra: null, identifier: action.identifier }; 
    case 'RESPONSE':
      return { ...httpState, loading: false, data: action.responseData, extra: action.extra };
    case 'ERROR':
      return { loading: false, error: action.errorMessage };
    case 'CLEAR':
      return initialData; 
    default:
      throw new Error('Should not be reached!');
  }
};

const useHttp = () => {
  const [httpState, dispatchHttpState] = useReducer(httpReducer, initialData);

  const clear = useCallback(() => {
    dispatchHttpState({ type: 'CLEAR' });
  }, [])

  const sendRequest = useCallback((url, method, body, extra, identifier) => {
    dispatchHttpState({ type: 'SEND', identifier });
    fetch(url, {
      method,
      body,
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => {
        return response.json();
      })
      .then(responseData => {
        dispatchHttpState({ type: 'RESPONSE', responseData, extra });
      })
      .catch(() => {
        dispatchHttpState({ type: 'ERROR', errorMessage: 'Something went wrong!' });
      });
  }, []);

  return {
    isLoading: httpState.isLoading,
    data: httpState.data,
    error: httpState.error,
    sendRequest,
    reqExtra: httpState.extra,
    identifier: httpState.identifier,
    clear,
  };
};

export default useHttp;