import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { SliderProvider } from './context/sliderContext';

const container = document.getElementById('root');
const root = createRoot(container);

const sizeConfig = {
    height: '80vh',
    minHeight: '60rem',
    heightMobile: '40svh',
    minHeightMobile: '30rem'
}

/**
 * The API endpoint URL for fetching data.
 * 
 * alternative endpoint for testing: https://673a61cf339a4ce44518071a.mockapi.io/api/slides
 * 
 * Structure of a single content item for a gallery or post display.
 *
 * @typedef {Object} ContentItem
 * @property {string} leadImage - The URL of the main image to be displayed prominently.
 * @property {string} title - The primary title of the content, used as a header.
 * @property {string} subtitle - A brief description or secondary title providing additional context.
 * @property {string} hash - A string of hashtags associated with the content for categorization.
 */
const url = 'https://api.mockfly.dev/mocks/c52c4149-34a1-43e3-a0cf-99f099926f47/slides';

root.render(
    <React.StrictMode>
        <SliderProvider url={url} sizeConfig={sizeConfig}>
            <App />
        </SliderProvider>
    </React.StrictMode>
);

reportWebVitals();
