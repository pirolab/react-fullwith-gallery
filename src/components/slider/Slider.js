import React, { useRef } from 'react';
import { useSlider } from '../../context/sliderContext';
import Navigation from '../navigation/Navigation';
import SliderList from './SliderList';
import { useSliderDrag } from '../../hooks/useSliderDrag';
import { useResizeObserver } from '../../hooks/useResizeObserver';
import './Slider.scss';

const Slider = () => {
    const { state, dispatch } = useSlider();
    const { currentSlide, data } = state;
    const refContainer = useRef();

    const { containerWidth, isResizing } = useResizeObserver(refContainer);
    const {
        dragOffset,
        isDragging,
        handleDragStart,
        handleDragMove,
        handleDragEnd,
    } = useSliderDrag(containerWidth, currentSlide, data.length, dispatch);

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
        <div className="slider">
            <div
                className="slider-wrapper"
                ref={refContainer}
                {...attachDragEvents}
                style={{
                    cursor: isDragging ? 'grabbing' : 'grab',
                    touchAction: isDragging ? 'none' : 'pan-y',
                }}
            >
                {data.length > 0 ? (
                    <SliderList
                        data={data}
                        currentSlide={currentSlide}
                        dragOffset={dragOffset}
                        containerWidth={containerWidth}
                        isDragging={isDragging}
                        isResizing={isResizing}
                    />
                ) : (
                    <span className="main_loader"/>
                )}
            </div>
            {data.length > 0 && (
                <Navigation currentSlide={currentSlide} data={data} />
            )}
        </div>
    );
};

export default Slider;
