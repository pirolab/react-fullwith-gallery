import React, { useEffect, useRef, useState } from 'react';
import { useContextSlider } from '../../context/sliderContext';
import { 
    useSliderDrag,
    useResizeObserver,
    useCSSVariables,
    useTouchEvents
} from '../../hooks';

import Navigation from '../navigation/Navigation';
import SliderList from './SliderList';

import { LAYOUT_SIZE_CONFIG  } from '../../constants/constants';

import './Slider.scss';

const Slider = () => {
    const { state, dispatch } = useContextSlider();
    const { currentSlide, data } = state;

    const refContainer = useRef();
    const refSlider = useRef();

    const { containerWidth, isResizing } = useResizeObserver(refContainer);
    const [dragDir, setDragDir] = useState('');
    const { dragOffset, isDragging, handleDragStart, handleDragMove, handleDragEnd } =
        useSliderDrag(containerWidth, currentSlide, data.length, dispatch, refSlider);

    const [isTouchStart, setIsTouchStart] = useState(false);

    useEffect(() => {
        const newDragDir = dragOffset < 0 ? 'RTL' : dragOffset > 0 ? 'LTR' : '';
        setDragDir(newDragDir);
    }, [dragOffset]);

    useCSSVariables(refSlider, LAYOUT_SIZE_CONFIG);
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
                {data.length > 0 && <Navigation />}
            </div>
        </>
    );
};

export default Slider;
