import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './provider/AuthProvider';
import { ProSidebarProvider } from "react-pro-sidebar";
import { CartProvider } from './provider/CartProvider';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ProSidebarProvider>
      <CartProvider>
        <AuthProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AuthProvider>
      </CartProvider>
    </ProSidebarProvider>
  </React.StrictMode>
);


