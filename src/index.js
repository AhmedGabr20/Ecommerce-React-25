import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.min.css";
import {AuthProvider} from "./contexts/AuthContext";
import {CartProvider} from "./contexts/CartContext";
import "./i18n";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthProvider>
        <CartProvider>
            <App />
        </CartProvider>
    </AuthProvider>
);
reportWebVitals();
