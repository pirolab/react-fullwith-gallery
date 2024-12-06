import { useState, useEffect, useRef } from 'react';
import { LazyLoadImage } from "react-lazy-load-image-component";

import { useSliderContext } from '../../context/sliderContext';
import { TiArrowLeft, TiArrowRight } from "react-icons/ti";
import {
    calculateAnimationSpeed,
    getScrollOffset,
    calculateStyles,
    scrollToSlide
} from '../../helpers/helpers';
import { TIMEOUT_FACTOR } from '../../constants/constants';

import './Navigation.scss';

const Navigation = () => {
    const { state, dispatch } = useSliderContext();
    const { data, currentSlide, eventType, limit } = state;
    const refItem = useRef(null);
    const animationSpeed = calculateAnimationSpeed(eventType, (limit / 2.5));
    const [isDelayedActive, setIsDelayedActive] = useState(true);
    const [leftStyle, setLeftStyle] = useState(0);
    const [maxWidth, setMaxWidth] = useState(0);

    const handleNext = () => {
        dispatch({
            type: 'NEXT',
            dataLength: data.length,
            limit: 1
        });
        dispatch({ type: "DRAG", eventType: 'drag' });
        const nextIndex = Math.min(currentSlide + 1, refItem.current.children.length - 1);
        scrollToSlide(nextIndex, refItem);
    };

    const handlePrev = () => {
        dispatch({
            type: 'PREV',
            dataLength: data.length,
            limit: 1
        });
        dispatch({ type: "DRAG", eventType: 'drag' });
        const prevIndex = Math.max(currentSlide - 1, 0);
        scrollToSlide(prevIndex, refItem);
    };

    const handleBullet = (index) => {
        if (index < 0 || index >= data.length) return;
        dispatch({
            type: 'THUMB',
            index,
            dataLength: data.length,
            limit: Math.abs(currentSlide - index),
            eventType: 'thumb'
        });
        setIsDelayedActive(false);

        if (refItem.current) {
            const targetChild = refItem.current.children[index];
            if (targetChild) {
                refItem.current.scrollLeft = getScrollOffset(refItem.current, targetChild);
            }
        }
    };

    useEffect(() => {
        const timeoutDuration = animationSpeed * TIMEOUT_FACTOR;
        const timer = setTimeout(() => {
            setIsDelayedActive(true);
        }, timeoutDuration);

        return () => clearTimeout(timer);
    }, [currentSlide, animationSpeed]);

    useEffect(() => {
        const handleWheel = (e) => {
            if (refItem.current) {
                const scrollableWidth = refItem.current.scrollWidth - refItem.current.clientWidth;

                if (scrollableWidth <= 0) return;
                e.preventDefault();
                const scrollStep = data.length > 0 ? maxWidth / data.length : 0;
                const scrollAmount = e.deltaY > 0 ? scrollStep : -scrollStep;
                const newScrollLeft = refItem.current.scrollLeft + scrollAmount;

                refItem.current.scrollLeft = Math.max(0, Math.min(newScrollLeft, scrollableWidth));
            }
        };

        const navElement = refItem.current;
        if (navElement) {
            navElement.addEventListener('wheel', handleWheel, { passive: false });
        }

        return () => {
            if (navElement) {
                navElement.removeEventListener('wheel', handleWheel);
            }
        };
    }, [maxWidth, data.length]);


    useEffect(() => {
        const { maxWidth, leftStyle } = calculateStyles(refItem, currentSlide, data.length);
        setMaxWidth(maxWidth);
        setLeftStyle(leftStyle);
    }, [currentSlide, data.length]);

    return (
        <>
            <span className="slider__nav-image-count">{currentSlide + 1} of {data.length}</span>
            {data && (
                <div className="slider__nav">
                    <ul className="slider__nav-thumbs" ref={refItem}>
                        {data.map((item, index) => (
                            <li key={index}
                                tabIndex={0}
                                role="button"
                                aria-label={`Navigate to slide ${index + 1}`}
                                className={
                                    'slider__nav-thumbs-item ' +
                                    (isDelayedActive && index === currentSlide ? 'isActive' : '')
                                }
                                onClick={() => handleBullet(index)}
                            >
                                <LazyLoadImage
                                    src={item.leadImage}
                                    alt={item.title}
                                    width={90}
                                    height={60}
                                    placeholder={<span className="slider__loader slider__loader--small"><b>loading...</b></span>}
                                    className="slider__nav-thumbs-item-image"
                                />
                            </li>
                        ))}
                        <li className='slider__nav-thumbs-item isProgress'
                            style={{
                                left: leftStyle,
                                transition: `left ${animationSpeed}s cubic-bezier(0.25, 1, 0.5, 1)`,

                            }}
                        />
                    </ul>
                </div>
            )}
            <button
                className={`slider__nav-prev ${state.currentSlide === 0 ? 'isDisabled' : ''}`}
                onClick={handlePrev}
            >
                <TiArrowLeft />
            </button>
            <button
                className={`slider__nav-next ${state.currentSlide === state.data.length - 1 ? 'isDisabled' : ''}`}
                onClick={handleNext}
            >
                <TiArrowRight />
            </button>
        </>
    );
};

export default Navigation;
