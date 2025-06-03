import React, { createContext, useReducer } from "react";


// eslint-disable-next-line react-refresh/only-export-components
export const DataContext = createContext();

 export const DataProvider= ({ children, reducer, initialState }) => {
  
  return (
    <DataContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </DataContext.Provider>
  );
};
