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

export default loremIpsumContent;