import React, { useEffect, useRef, useState } from 'react';
import { useSlider } from '../../context/sliderContext';
import Navigation from '../navigation/Navigation';
import SliderList from './SliderList';
import { useSliderDrag } from '../../hooks/useSliderDrag';
import { useResizeObserver } from '../../hooks/useResizeObserver';
import { useCSSVariables } from '../../hooks/useCSSVariables';
import { useTouchEvents } from '../../hooks/useTouchEvents';

import './Slider.scss';

const Slider = () => {
    const { state, dispatch } = useSlider();
    const { currentSlide, data, sizeConfig } = state;

    const refContainer = useRef();
    const refSlider = useRef();

    const { containerWidth, isResizing } = useResizeObserver(refContainer);
    const [dragDir, setDragDir] = useState('');
    const { dragOffset, isDragging, handleDragStart, handleDragMove, handleDragEnd } =
        useSliderDrag(containerWidth, currentSlide, data.length, dispatch);

    const [isTouchStart, setIsTouchStart] = useState(false);

    useEffect(() => {
        const newDragDir = dragOffset < 0 ? 'RTL' : dragOffset > 0 ? 'LTR' : '';
        setDragDir(newDragDir);
    }, [dragOffset]);

    useCSSVariables(refSlider, sizeConfig);
    useTouchEvents(refContainer, handleDragStart, handleDragMove, handleDragEnd, setIsTouchStart);

    const attachDragEvents = {
        onMouseDown: handleDragStart,
        onMouseMove: handleDragMove,
        onMouseUp: handleDragEnd,
        onMouseLeave: handleDragEnd,
        onTouchStart: handleDragStart,
        onTouchMove: handleDragMove,
        onTouchEnd: handleDragEnd,
    };

    return (
        <>
            <div className="slider" ref={refSlider}>
                <div
                    className="slider__wrapper"
                    ref={refContainer}
                    {...attachDragEvents}
                    style={{
                        cursor: isDragging ? 'grabbing' : 'grab',
                        touchAction: isTouchStart ? 'none' : 'pan-y',
                    }}
                >
                    {data.length > 0 && (
                        <SliderList
                            dragOffset={dragOffset}
                            containerWidth={containerWidth}
                            isDragging={isDragging}
                            isResizing={isResizing}
                            dragDir={dragDir}
                        />
                    )}
                </div>
            </div>
            {data.length > 0 && <Navigation />}
        </>
    );
};

export default Slider;
