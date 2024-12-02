// components/SliderList.js
import React, { useEffect, useState } from 'react';
import SliderItem from "../sliderItem/SliderItem";
import { useSliderContext } from '../../context/sliderContext';
import { calculateAnimationSpeed } from '../../helpers/helpers';

const SliderList = (props) => {
    const {
        dragOffset,
        containerWidth,
        isDragging,
        isResizing,
        dragDir
    } = props;

    const { state } = useSliderContext();
    const { eventType, limit, currentSlide, data } = state;
    const slidePosition = -(containerWidth * currentSlide) + dragOffset;
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const animationSpeed = calculateAnimationSpeed(eventType, limit / 2);

    const transitionStyle = isDragging || isResizing
        ? "none"
        : `transform ${animationSpeed}s ${isMobile ? 'ease' : 'cubic-bezier(0.25, 1, 0.5, 1)'}`;

    return (
        <ul
            className="slider__list"
            style={{
                width: containerWidth * data.length,
                transform: `translateX(${slidePosition}px)`,
                transition: transitionStyle,
            }}
        >
            {data.map((slide, index) => (
                <SliderItem
                    key={index}
                    index={index}
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
