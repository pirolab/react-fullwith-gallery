import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { SliderProvider } from './context/sliderContext';

const container = document.getElementById('root');
const root = createRoot(container);

//const sliderUrl = 'https://673a61cf339a4ce44518071a.mockapi.io/api/slides';
const sliderUrl = 'https://api.mockfly.dev/mocks/c52c4149-34a1-43e3-a0cf-99f099926f47/slides';

root.render(
    <React.StrictMode>
        <SliderProvider url={sliderUrl}>
            <App />
        </SliderProvider>
    </React.StrictMode>
);

reportWebVitals();
