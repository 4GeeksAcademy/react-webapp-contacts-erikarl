import { useContext, useReducer, createContext } from "react";
import { storeReducer, InitialState } from "../store";

// Exporta el contexto para que otros componentes puedan usarlo
export const StoreContext = createContext();

export function StoreProvider({ children }) {
  const [store, dispatch] = useReducer(storeReducer, InitialState);
  
  return (
    <StoreContext.Provider value={{ store, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}

export default function useGlobalReducer() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useGlobalReducer must be used within a StoreProvider');
  }
  return context;
}
