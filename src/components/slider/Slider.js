import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useSlider } from '../../context/sliderContext';
import Navigation from '../navigation/Navigation';
import SliderList from './SliderList';
import { useSliderDrag } from '../../hooks/useSliderDrag';
import { useResizeObserver } from '../../hooks/useResizeObserver';
import './Slider.scss';

const Slider = () => {
    const { state, dispatch } = useSlider();
    const { currentSlide, data, sizeConfig } = state;
    const refContainer = useRef();
    const { containerWidth, isResizing } = useResizeObserver(refContainer);
    const [dragDir, setDragDir] = useState(false);
    const [isTouchStart, setisTouchStart] = useState(false);

    const {
        dragOffset,
        isDragging,
        handleDragStart,
        handleDragMove,
        handleDragEnd,
    } = useSliderDrag(containerWidth, currentSlide, data.length, dispatch);

    const handleTouchStart = useCallback((e) => {
        setisTouchStart(true);
        handleDragStart(e);
    }, [handleDragStart]);

    const handleTouchEnd = useCallback((e) => {
        setisTouchStart(false);
        handleDragEnd(e);
    }, [handleDragEnd]);

    useEffect(() => {
        setDragDir(prevDragDir => {
            const newDragDir = dragOffset < 0 ? 'RTL' : dragOffset > 0 ? 'LTR' : '';
            return prevDragDir !== newDragDir ? newDragDir : prevDragDir;
        });
    }, [dragOffset]);

    useEffect(() => {
        const container = refContainer.current;
        container.addEventListener('touchstart', handleTouchStart);
        container.addEventListener('touchend', handleTouchEnd);
        return () => {
            container.removeEventListener('touchstart', handleTouchStart);
            container.removeEventListener('touchend', handleTouchEnd);
        };
    }, [handleTouchStart, handleTouchEnd]);

    const attachDragEvents = {
        onMouseDown: handleDragStart,
        onMouseMove: handleDragMove,
        onMouseUp: handleDragEnd,
        onMouseLeave: handleDragEnd,
        onTouchStart: handleDragStart,
        onTouchMove: handleDragMove,
        onTouchEnd: handleDragEnd,
    };

    const styles = `
        .slider,
        .slider__item,
        .slider__item-image {
            height: ${sizeConfig.heightMobile};
            min-height: ${sizeConfig.minHeightMobile};
        }

        @media (min-width: 768px) {
            .slider,
            .slider__item,
            .slider__item-image {
                height: ${sizeConfig.height};
                min-height: ${sizeConfig.minHeight};
            }
        }
    `;
    
    return (
        <>
            <style>{styles}</style>
            <div className="slider">
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
                            data={data}
                            currentSlide={currentSlide}
                            dragOffset={dragOffset}
                            containerWidth={containerWidth}
                            isDragging={isDragging}
                            isResizing={isResizing}
                            dragDir={dragDir}
                        />
                    )}
                </div>
                {data.length > 0 && (
                    <Navigation currentSlide={currentSlide} data={data} />
                )}
            </div>
        </>
    );
};

export default Slider;
