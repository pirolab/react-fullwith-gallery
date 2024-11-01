// components/SliderList.js
import React from "react";
import SliderItem from "../sliderItem/SliderItem";

const SliderList = ({ data, currentSlide, dragOffset, containerWidth, isDragging, isResizing }) => (
    <ul
        className="slider-list vh100"
        style={{
            width: containerWidth * data.length,
            transform: `translateX(calc(-${containerWidth * currentSlide}px + ${dragOffset}px))`,
            transition: isDragging || isResizing ? "none" : "transform 1.2s ease",
        }}
    >
        {data.map((slide, index) => (
            <SliderItem key={index} slide={slide} index={index} currentSlide={currentSlide} />
        ))}
    </ul>
);

export default SliderList;
