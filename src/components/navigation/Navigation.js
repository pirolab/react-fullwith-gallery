import { useState, useEffect, useRef } from 'react';
import { useContextSlider } from '../../context/sliderContext';
import { TiArrowLeft, TiArrowRight } from "react-icons/ti";
import {
    calculateAnimationSpeed,
    getScrollOffset,
    calculateStyles,
    scrollToSlide
} from '../../helpers/helpers';
import { TIMEOUT_FACTOR  } from '../../constants/constants';

import './Navigation.scss';

const Navigation = () => {
    const { state, dispatch } = useContextSlider();
    const { data, currentSlide, eventType, limit } = state;
    const refItem = useRef(null);
    const animationSpeed = calculateAnimationSpeed(eventType, (limit / 2.5));
    const [isDelayedActive, setIsDelayedActive] = useState(false);
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
            type: 'BULLET',
            index,
            dataLength: data.length,
            limit: Math.abs(currentSlide - index),
            eventType: 'bullet'
        });

        if (refItem.current) {
            const targetChild = refItem.current.children[index];
            if (targetChild) {
                refItem.current.scrollLeft = getScrollOffset(refItem.current, targetChild);
            }
        }
    };

    useEffect(() => {
        if (isDelayedActive) {
            setIsDelayedActive(false);
        }
    
        const timeoutDuration = animationSpeed * TIMEOUT_FACTOR;
            const timer = setTimeout(() => {
            setIsDelayedActive(true);
        }, timeoutDuration);
    
        return () => clearTimeout(timer);
    }, [currentSlide, animationSpeed, isDelayedActive]);
    

    useEffect(() => {
        const handleWheel = (e) => {
            if (refItem.current) {
                e.preventDefault();
                const scrollStep = data.length > 0 ? maxWidth / data.length : 0;
                const scrollAmount = e.deltaY > 0 ? scrollStep : -scrollStep;
                refItem.current.scrollLeft += scrollAmount;
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
                    <ul className="slider__nav-bullet" ref={refItem}>
                        {data.map((item, index) => (
                            <li key={index}
                                tabIndex={0}
                                role="button"
                                aria-label={`Navigate to slide ${index + 1}`}
                                style={{ background: `url(${item.thumbnail}) center/cover no-repeat` }}
                                className={
                                    'slider__nav-bullet-item ' +
                                    (isDelayedActive && index === currentSlide ? 'isActive' : '')
                                }
                                onClick={() => handleBullet(index)}
                            />
                        ))}
                        <li className='slider__nav-bullet-item isProgress'
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
