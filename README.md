# React/Redux Image Gallery

Go see the 👉 [Demo](https://www.pirolab.it/react-fullwidth-gallery)
[gallery.webm](https://github.com/user-attachments/assets/9fb19194-f8a6-4776-ae9d-c02ab29bed0c)

[![Watch the video](https://www.pirolab.it/react-fullwidth-gallery/images/gallery_ss.png)](https://www.pirolab.it/react-fullwidth-gallery/images/gallery.webm.mob)
- React, Redux
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

This hook takes a ref to a DOM element as an argument and listens for resize events on the window.  
Whenever the window is resized, it updates the width of the referenced element and sets isResizing to true for a brief period.

## useSliderDrag

The useSliderDrag hook manages drag interactions for a slider component, allowing users to navigate slides by dragging left or right.  
It tracks the drag state and calculates the offset to determine slide changes.
### Usage
To use the useSliderDrag hook, follow these steps:
- **Import the Hook**: Import the useSliderDrag hook in your component.
- **Setup State and Dispatch**: Ensure you have the necessary state values and a dispatch function from your Redux store.
- **Create a Container Reference**: Use a ref to reference the slider container in your component.
- **Integrate Drag Handlers**: Attach the drag event handlers returned by the hook to the slider element.
```
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSliderDrag } from "./hooks/useSliderDrag";

const SliderComponent = () => {
    const dispatch = useDispatch();
    const currentSlide = useSelector((state) => state.currentSlide);
    const dataLength = useSelector((state) => state.dataLength);
    const containerWidth = 600; // Example width

    const {
        dragOffset,
        isDragging,
        handleDragStart,
        handleDragMove,
        handleDragEnd,
    } = useSliderDrag(containerWidth, currentSlide, dataLength, dispatch);

    return (
        <div
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
   cd react-redux-gallery

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

- **src/actions**: Configures Redux, with actions.
    - index.js => actions [NEXT, PREV, BULLET]
- **src/components**: Contains the main components of the gallery.
    - **loader**
        - Loader.js
        - Loader.scss
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
- **src/hooks**: Houses the custom hooks.
    - **useDataFetch** hook for asynchronous data fetching.
    - **useSliderDrag** hook for managing drag interactions.
    - **useResizeObserver** hook to track and respond to resizing.
- **mock**: Just to give an idea of the data structure; use **useDataFetch** to fetch API.
    - sliderData.json
- **src/reducers**: Configures Redux, with reducers.
    - index.js => combineReducers (for future implementation)
    - navigation.js => navigationReducer
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
