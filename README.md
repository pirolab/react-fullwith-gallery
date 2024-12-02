# React Fullwidth Image Gallery

Go see the 👉 [Demo](https://www.pirolab.it/react-fullwidth-gallery) & [Codepen](https://codepen.io/pirolab/full/yLmrZNQ)

[react-fullwidth-gallery.webm](https://github.com/user-attachments/assets/9871c0cd-b23b-4227-b436-2a59509c1bd8)

- React
- CSS animations
- Ready to fetch data with custom Hook => useDataFetch(url)

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
### Usage
To use the useSliderDrag hook, follow these steps:
- **Import the Hook**: Import the useSliderDrag hook in your component.
- **Setup State and Dispatch**: Ensure you have the necessary state values and a dispatch function from your context provider.
- **Create a Container Reference**: Use a ref to reference the slider container in your component.
- **Integrate Drag Handlers**: Attach the drag event handlers returned by the hook to the slider element.
```
import React, { useRef } from 'react';
import { useSliderDrag } from "./hooks/useSliderDrag";
import { useResizeObserver } from '../../hooks/useResizeObserver';
const SliderComponent = () => {
    const { state, dispatch } = useSliderContext();
    const { currentSlide, data } = state;
    const refContainer = useRef();
    const { containerWidth, isResizing } = useResizeObserver(refContainer);

    const {
        dragOffset,
        isDragging,
        handleDragStart,
        handleDragMove,
        handleDragEnd,
    } = useSliderDrag(containerWidth, currentSlide, dataLength, dispatch);

    return (
        <div
            ref={refContainer}
            className="slider-container"
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
            style={{ transform: `translateX(${dragOffset}px)` }}
        >
        {/* Render your slides here */}
        { /* Example slide rendering logic */ }
        </div>
    );
};

export default SliderComponent;
```  

### Key Features:

- **Drag Tracking**: Detects drag start, movement, and end to calculate drag direction and distance.
- **Slide Navigation**: Triggers the next or previous slide based on the drag distance threshold (1/5 of the container width).
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

   ```

2. **Navigate into the project directory**

   ```bash
   cd react-fullwith-gallery-main

   ```

3. **Install dependencies**

   ```bash
   npm install

   ```

4. **Start the development server**
   ```bash
   npm start
   ```

Open http://localhost:3006 in your browser to view the app.

## Project Structure

- **src/components**: Contains the main components of the gallery.
    - **navigation**
        - Navigation.js
        - Navigation.scss
    - **slider**
        - Slider.js
        - Slider.scss
    - **sliderItem**
        - SliderItem.js
        - SliderList.js
        - SliderItem.scss
- **src/context**
    - sliderContext.js
- **src/hooks**: Houses the custom hooks.
    - **useDataFetch** hook for asynchronous data fetching.
    - **useSliderDrag** hook for managing drag interactions.
    - **useResizeObserver** hook to track and respond to resizing.
- **mock**: Just to give an idea of the data structure; use **useDataFetch** to fetch API.
    - sliderData.json
- **src/sass**: Some CSS stuff to use and reuse 😁
    - animations.scss
    - mediaQueries.scss
    - variables.scss

## Available Scripts

- npm start: Runs the app in development mode.
- npm run build: Builds the app for production.
- npm test: Runs tests (if configured).

## License

**This project is licensed under the MIT License. See the LICENSE file for details.**
