import { createContext, useContext } from 'react';

const ValueContext = createContext(null);

export default (props) => {
  const { children, value } = props;

  return (
    <ValueContext.Provider value={value}>
      {children}
    </ValueContext.Provider>
  );
}

export const useValue = () => {
  return useContext(ValueContext);
};
