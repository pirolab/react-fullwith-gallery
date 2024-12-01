import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { SliderProvider } from './context/sliderContext';
import { URL } from './constants/constants';

const container = document.getElementById('root');
const root = createRoot(container);
const url = URL;

root.render(
    <React.StrictMode>
        <SliderProvider url={url}>
            <App />
        </SliderProvider>
    </React.StrictMode>
);

reportWebVitals();
