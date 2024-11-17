// components/SliderList.js
import React from "react";
import SliderItem from "../sliderItem/SliderItem";

const SliderList = (props) => {
    const {
        data, 
        currentSlide, 
        dragOffset, 
        containerWidth, 
        isDragging, 
        isResizing,
        dragDir
    } = props;

    const slidePosition = -(containerWidth * currentSlide) + dragOffset;
    
    return (
        <ul
        className="slider__list"
        style={{
            width: containerWidth * data.length,
            transform: `translateX(${slidePosition}px)`,
            transition: isDragging || isResizing ? "none" : "transform .8s ease"
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
            />
        ))}
    </ul>
    );
};

export default SliderList;
