import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router-dom";
import { StoreProvider } from './hooks/useGlobalReducer';
import {router} from "./AppRoutes"; 



const Main = () => {
    return (
        <React.StrictMode>  
            <StoreProvider> 
                <RouterProvider router={router} />   
            </StoreProvider>
        </React.StrictMode>
    );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Main />);
