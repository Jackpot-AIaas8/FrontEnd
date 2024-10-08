import React, {Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import Loader from "./admin/layouts/loader/Loader";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Suspense fallback={<Loader/>}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Suspense>
)
reportWebVitals();
