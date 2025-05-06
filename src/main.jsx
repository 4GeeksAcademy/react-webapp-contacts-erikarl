import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppRoutes from './AppRoutes';  // Cambiado a import default
import { StoreProvider } from './hooks/useGlobalReducer';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StoreProvider>
      <AppRoutes />  {/* Usamos el componente directamente */}
    </StoreProvider>
  </React.StrictMode>
);
