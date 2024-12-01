import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { SliderProvider } from './context/sliderContext';
import { LAYOUT_SIZE_CONFIG, URL } from './constants/constants';

const container = document.getElementById('root');
const root = createRoot(container);
const url = URL;

root.render(
    <React.StrictMode>
        <SliderProvider url={url} sizeConfig={LAYOUT_SIZE_CONFIG}>
            <App />
        </SliderProvider>
    </React.StrictMode>
);

reportWebVitals();
