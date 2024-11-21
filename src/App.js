import React from 'react';
import Slider from './components/slider/Slider';

const loremIpsumContent = [
    {
        "title": "React Fullwidth Image Gallery",
        "text": "A **fullwidth image gallery** component built using **React** and **CSS animations**. It includes hooks like <code><b>useDataFetch(url)</b></code> to fetch data asynchronously. The gallery is designed to work with both **touch** and **mouse drag interactions**. The gallery also supports resizing through the <code><b>useResizeObserver</b></code> hook, which dynamically adjusts the layout as the window size changes. This ensures the gallery maintains its responsiveness across different screen sizes."
    },
    {
        "title": "useResizeObserver Hook",
        "text": "<p>The <code><b>useResizeObserver</b></code> hook listens for **window resize** events and updates the width of a referenced DOM element. It returns two key values:</p>\n<ul>\n  <li><code><b>containerWidth</b></code>: The current width of the element.</li>\n  <li><code><b>isResizing</b></code>: A boolean indicating if the element is being resized.</li>\n</ul>\n<p>Example usage:</p>\n<pre><code>const { containerWidth, isResizing } = useResizeObserver(containerRef);</code></pre>\n<p>This hook is useful for making **responsive design adjustments** when the element's size changes.</p>"
    },
    {
        "title": "useSliderDrag Hook",
         // eslint-disable-next-line
        "text": "<p>The <code><b>useSliderDrag</b></code> hook manages **drag interactions** for a slider component, allowing users to navigate slides by dragging left or right. The hook tracks the drag state, including the drag start, move, and end events. It returns:</p>\n<ul>\n  <li><code><b>dragOffset</b></code>: The current drag distance from the starting point.</li>\n  <li><code><b>isDragging</b></code>: Indicates if a drag is in progress.</li>\n</ul>\n<p>Example usage:</p>\n<pre><code>&lt;div\n  ref={refContainer}\n  className=&quot;slider-container&quot;\n  onMouseDown={handleDragStart}\n  onMouseMove={handleDragMove}\n  onMouseUp={handleDragEnd}\n  onTouchStart={handleDragStart}\n  onTouchMove={handleDragMove}\n  onTouchEnd={handleDragEnd}\n  style={{ transform: `translateX(${dragOffset}px)` }}\n&gt;\n  {/* Render slides here */}\n&lt;/div&gt;</code></pre>\n<p>This enables smooth **slide navigation** using drag events and **calculates the drag distance** to trigger the next or previous slide based on a threshold (e.g., 1/5 of the container width).</p>"
    },
    {
        "title": "Installation & Usage",
        "text": "<p>To set up the project, follow these steps:</p>\n<ol>\n  <li><strong>Clone the repository</strong>:\n    <code>git clone https://github.com/pirolab/react-fullwith-gallery.git</code></li>\n  <li><strong>Navigate into the project directory</strong>:\n    <code>cd react-fullwith-gallery-main</code></li>\n  <li><strong>Install dependencies with npm</strong>:\n    <code>npm install</code></li>\n  <li><strong>Start the development server</strong>:\n    <code>npm start</code></li>\n</ol>\n<p>Once the development server is running, visit <code>http://localhost:3006</code> to view the gallery in action.</p>\n<p>The project structure includes:</p>\n<ul>\n  <li><code><b>Navigation.js</b></code> and <code><b>Slider.js</b></code> for components.</li>\n  <li><code><b>useDataFetch</b></code>, <code><b>useSliderDrag</b></code>, and <code><b>useResizeObserver</b></code> as custom hooks.</li>\n  <li><code><b>sliderContext.js</b></code> for state management.</li>\n  <li><code><b>sliderData.json</b></code> for mock data to simulate API responses.</li>\n</ul>\n<p>For additional setup or configuration, refer to the project's documentation and scripts:</p>\n<ul>\n  <li><code>npm start</code>: Runs the app in development mode.</li>\n  <li><code>npm run build</code>: Builds the app for production.</li>\n  <li><code>npm test</code>: Runs tests (if configured).</li>\n</ul>"
    }
];

const App = () => {
    return (
        <>
            <div className="wrapper">
                <a className='git-link' href='https://github.com/pirolab/react-fullwith-gallery' target='_blank' rel='noopener noreferrer'>
                    <svg height="32" aria-hidden="true" viewBox="0 0 24 24" version="1.1" width="32" data-view-component="true">
                        <path d="M12.5.75C6.146.75 1 5.896 1 12.25c0 5.089 3.292 9.387 7.863 10.91.575.101.79-.244.79-.546 0-.273-.014-1.178-.014-2.142-2.889.532-3.636-.704-3.866-1.35-.13-.331-.69-1.352-1.18-1.625-.402-.216-.977-.748-.014-.762.906-.014 1.553.834 1.769 1.179 1.035 1.74 2.688 1.25 3.349.948.1-.747.402-1.25.733-1.538-2.559-.287-5.232-1.279-5.232-5.678 0-1.25.445-2.285 1.178-3.09-.115-.288-.517-1.467.115-3.048 0 0 .963-.302 3.163 1.179.92-.259 1.897-.388 2.875-.388.977 0 1.955.13 2.875.388 2.2-1.495 3.162-1.179 3.162-1.179.633 1.581.23 2.76.115 3.048.733.805 1.179 1.825 1.179 3.09 0 4.413-2.688 5.39-5.247 5.678.417.36.776 1.05.776 2.128 0 1.538-.014 2.774-.014 3.162 0 .302.216.662.79.547C20.709 21.637 24 17.324 24 12.25 24 5.896 18.854.75 12.5.75Z"></path>
                    </svg>
                    <span>Fork Me On Github</span>
                </a>
                <Slider />
            </div>
            <div style={{ padding: '30px', background: 'white', margin: '0 auto', maxWidth: '1340px' }}>
                {loremIpsumContent.map((section, index) => (
                    <section key={index}>
                        <h2 style={{ fontSize: '2.4rem' }}>{section.title}</h2>
                        <p style={{ fontSize: '1.6rem' }} dangerouslySetInnerHTML={{ __html: section.text }} />
                    </section>
                ))}
            </div>
        </>
    );
}

export default App;
