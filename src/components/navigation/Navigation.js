import { useState, useEffect, useRef } from 'react';
import { useSlider } from '../../context/sliderContext';
import { TiArrowLeft, TiArrowRight } from "react-icons/ti";
import { calculateAnimationSpeed } from '../../helpers/helpers';

import './Navigation.scss';

const Navigation = () => {
    const { state, dispatch } = useSlider();
    const { data, currentSlide, eventType, limit } = state;
    const refItem = useRef(null);
    const animationSpeed = calculateAnimationSpeed(eventType, (limit / 2.5));
    const [isDelayedActive, setIsDelayedActive] = useState(false);
    const [leftStyle, setLeftStyle] = useState(0);
    const [maxWidth, setMaxWidth] = useState(0);

    const scrollToSlide = (index) => {
        if (refItem.current) {
            const children = refItem.current.children;
            const targetChild = children[index];
            if (targetChild) {
                const containerWidth = refItem.current.clientWidth;
                const childWidth = targetChild.offsetWidth;
                const scrollOffset = targetChild.offsetLeft - (containerWidth / 2) + (childWidth / 2);
                refItem.current.scrollTo({
                    left: scrollOffset,
                    behavior: 'smooth'
                });
            }
        }
    };

    const handleNext = () => {
        dispatch({
            type: 'NEXT',
            dataLength: data.length,
            limit: 1
        });
        dispatch({ type: "DRAG", eventType: 'drag' });
        const nextIndex = Math.min(currentSlide + 1, refItem.current.children.length - 1);
        scrollToSlide(nextIndex);
    };
    
    const handlePrev = () => {
        dispatch({
            type: 'PREV',
            dataLength: data.length,
            limit: 1
        });
        dispatch({ type: "DRAG", eventType: 'drag' });
        const prevIndex = Math.max(currentSlide - 1, 0);
        scrollToSlide(prevIndex);
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
            const currentChild = refItem.current.children[index];
            if (currentChild) {
                const parentWidth = refItem.current.clientWidth;
                const childWidth = currentChild.offsetWidth;
                const childPosition = currentChild.offsetLeft; 
                const scrollOffset = childPosition - (parentWidth - childWidth) / 2; 
                refItem.current.scrollTo({
                    left: scrollOffset,
                    behavior: 'smooth'
                });
            }
        }
    };
    
    useEffect(() => {
        setIsDelayedActive(false);
        const timeoutDuration = animationSpeed * 800;
        const timer = setTimeout(() => {
            setIsDelayedActive(true);
        }, timeoutDuration);
        return () => clearTimeout(timer);
    }, [currentSlide, animationSpeed]);

    useEffect(() => {
        const handleWheel = (e) => {
            if (refItem.current) {
                e.preventDefault();
                const scrollAmount = e.deltaY > 0 ? (maxWidth / data.length) : -(maxWidth / data.length);
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
        if (refItem.current) {
            const computedStyleUl = window.getComputedStyle(refItem.current);
            const gap = parseFloat(computedStyleUl.gap);
            const offsetLesft = parseFloat(computedStyleUl.paddingLeft);
            const firstLi = refItem.current.children[1];
            if (firstLi) {
                const computedStyleLi = window.getComputedStyle(firstLi);
                const liWidth = parseFloat(computedStyleLi.width);
                const slidePosition = currentSlide * (liWidth + gap);
                setMaxWidth((liWidth + gap) * data.length + 10);
                setLeftStyle(`${slidePosition + offsetLesft}px`);
            }
        }
    }, [currentSlide, data.length]);

    return (
        <>
            <span className="slider__nav-image-count">{currentSlide + 1} of {data.length}</span>
            {data && (
                <div className="slider__nav">
                    <ul className="slider__nav-bullet" ref={refItem}>
                        {data.map((item, index) => (
                            <li key={index}
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
                                transition: `left ${animationSpeed}s cubic-bezier(0.25, 1, 0.5, 1)`
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
