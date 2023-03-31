import { useRef } from 'react';
import produce from 'immer';
import _ from 'lodash';

export default () => {
  const store = useRef({}).current;
  
  return (data, path, value) => {
    store.data = produce(store.data || data, draft => {
      _.set(draft, path, value);
    });
    return store.data;
  }
}