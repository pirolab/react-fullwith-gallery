// components/SliderList.js
import React from 'react';
import SliderItem from "../sliderItem/SliderItem";
import { useSlider } from '../../context/sliderContext';

const SliderList = (props) => {
    const {
        dragOffset,
        containerWidth,
        isDragging,
        isResizing,
        dragDir
    } = props;

    const { state } = useSlider();
    const { eventType, limit, currentSlide, data } = state;
    const slidePosition = -(containerWidth * currentSlide) + dragOffset;
    const animationSpeed = eventType === 'bullet'
        ? 0.6 + ((Number(limit) / 10) * 4)
        : 1.6;

    return (
        <ul
            className="slider__list"
            style={{
                width: containerWidth * data.length,
                transform: `translateX(${slidePosition}px)`,
                transition: isDragging || isResizing
                    ? "none"
                    : `transform ${animationSpeed}s cubic-bezier(0.25, 1, 0.5, 1)`
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
