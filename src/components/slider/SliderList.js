// components/SliderList.js
import React from 'react';
import SliderItem from "../sliderItem/SliderItem";

const SliderList = (props) => {
    const {
        data,
        currentSlide,
        dragOffset,
        containerWidth,
        isDragging,
        isResizing,
        dragDir,
        limit
    } = props;

    const slidePosition = -(containerWidth * currentSlide) + dragOffset;
    const speedLimit = 0.6 + ((Number(limit) / 10) * 2);
    
    return (
        <ul
            className="slider__list"
            style={{
                width: containerWidth * data.length,
                transform: `translateX(${slidePosition}px)`,
                transition: isDragging || isResizing 
                    ? "none" 
                    : `transform ${speedLimit}s cubic-bezier(0.25, 1, 0.5, 1)`
            }}
        >
            {data.map((slide, index) => (
                <SliderItem
                    key={index}
                    slide={slide}
                    index={index}
                    currentSlide={currentSlide}
                    dragOffset={dragOffset}
                    dataLength={data.length}
                    dragDir={dragDir}
                    isDragging={isDragging}
                />
            ))}
        </ul>
    );
};

export default SliderList;
