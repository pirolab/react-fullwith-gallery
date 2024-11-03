# React/Redux image gallery

Go see the 👉 [Demo](https://www.pirolab.it/react-fullwidth-gallery)

- react, redux 
- css animations 
- ready to fetch data with custom Hook => useDataFetch(url)

## useResizeObserver
The useResizeObserver hook provides a way to track and respond to the resizing of a specific DOM element.  
It returns the current width of the element and an isResizing state, which can be useful for triggering visual adjustments during a resize event.

### Usage
This hook takes a ref to a DOM element as an argument and listens for resize events on the window.  
Whenever the window is resized, it updates the width of the referenced element and sets isResizing to true for a brief period.
```
import { useRef } from "react";
import { useResizeObserver } from "./hooks/useResizeObserver";

const ResponsiveComponent = () => {
  const containerRef = useRef(null);
  const { containerWidth, isResizing } = useResizeObserver(containerRef);

  return (
    <div ref={containerRef} style={{ width: "100%" }}>
      <p>Current container width: {containerWidth}px</p>
      {isResizing && <p>Resizing...</p>}
    </div>
  );
};
```

## useSliderDrag
The useSliderDrag hook manages drag interactions for a slider component, allowing users to navigate slides by dragging left or right.  
It tracks the drag state and calculates the offset to determine slide changes.

### Key Features:
- **Drag Tracking**: Detects drag start, movement, and end to calculate drag direction and distance.  
- **Slide Navigation**: Triggers next or previous slide based on the drag distance threshold (1/5 of container width).  
- **Event Handlers**: Returns handleDragStart, handleDragMove, and handleDragEnd functions for handling drag events.  

### Returned Values:
 - **dragOffset**: Current drag distance from the starting point.
 - **isDragging**: Indicates if a drag is in progress.


## Requirements

- **Node.js** version >= v21.6.2
- **npm** version >= 10.2.4

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/pirolab/react-fullwith-gallery.git

2. **Navigate into the project directory**
    ```bash
    cd react-redux-gallery

2. **Install dependencies**
    ```bash
    npm install

2. **Start the development server**
    ```bash
    npm start

Open http://localhost:3006 in your browser to view the app.

## Project Structure
- src/components: Contains the main components of the gallery.
- src/hooks: Houses the custom hooks
    - **useDataFetch** hook for asynchronous data fetching.
    - **useSliderDrag** hook for manages drag interactions
    - **useResizeObserver** hook to track and respond to the resizing
- src/actions: Configures Redux, with actions.
- src/reducers: Configures Redux, with  reducers
- src/sass: Holds the SCSS files.

## Available Scripts
- npm start: Runs the app in development mode.
- npm run build: Builds the app for production.
- npm test: Runs tests (if configured).

## License
**This project is licensed under the MIT License. See the LICENSE file for details.**