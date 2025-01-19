import { useState, useEffect, useRef } from 'react';
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSliderContext } from '../../context/sliderContext';
import { TiArrowLeft, TiArrowRight } from "react-icons/ti";
import { FaCheck } from "react-icons/fa";

import {
    getScrollOffset,
    calculateStyles,
    scrollToSlide,
    useResizeScroll
} from '../../helpers/helpers';

import './Navigation.scss';

const Navigation = () => {
    const { state, dispatch } = useSliderContext();
    const { data, currentSlide } = state;
    const refItem = useRef(null);
    const [maxWidth, setMaxWidth] = useState(0);
    const [thumbsAlign, setTthumbsAlign] = useState('');

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

    useResizeScroll(refItem, currentSlide);

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

        if (refItem.current) {
            const targetChild = refItem.current.children[index];
            if (targetChild) {
                refItem.current.scrollLeft = getScrollOffset(refItem.current, targetChild);
            }
        }
    };

    const updateThumbsAlignment = () => {
        if (!refItem.current) return;
        const navThumbs = refItem.current;
        const navThumbsWidth = navThumbs.offsetWidth;
        const childrenCount = navThumbs.children.length;
        const gap = 5;
        const itemWidth = 120;
        const itemsWidth = (itemWidth * childrenCount) + (gap * (childrenCount - 1));
        itemsWidth > navThumbsWidth ? setTthumbsAlign('flex-start') :  setTthumbsAlign('');    
    };

    useEffect(() => {
        const handleResize = () => {
            updateThumbsAlignment();
        };
        updateThumbsAlignment();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [data.length]); 

    useEffect(() => {
        const cleanupListner = scrollToSlide(currentSlide, refItem);
        return cleanupListner;
    }, [currentSlide, refItem]);


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
        const { maxWidth } = calculateStyles(refItem, currentSlide, data.length);
        setMaxWidth(maxWidth);
    }, [currentSlide, data.length]);

    return (
        <>
            <span className="slider__nav-items-count">{currentSlide + 1}</span>
            {data && (
                <div className="slider__nav">
                    <ul className={`slider__nav-thumbs ${thumbsAlign}`} ref={refItem}>
                        {data.map((item, index) => (
                            <li key={index}
                                tabIndex={0}
                                role="button"
                                aria-label={`Navigate to slide ${index + 1}`}
                                className={`slider__nav-thumbs-item ${index === currentSlide ? 'isActive' : ''}`}
                                onClick={() => handleBullet(index)}
                            >
                                <LazyLoadImage
                                    src={item.thumbnail}
                                    alt={item.title}
                                    width={90}
                                    height={60}
                                    placeholder={<span className='slider__loader slider__loader--small'><b>loading...</b></span>}
                                    className="slider__nav-thumbs-item-image"
                                />
                                { index === currentSlide && <FaCheck /> }
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <button
                className={`slider__nav-prev ${state.currentSlide === 0 ? 'isDisabled' : ''}`}
                onClick={handlePrev}
                disabled={state.currentSlide === 0}
            >
                <img   
                    alt="prev slide" 
                    className='slider__nav-image' 
                    src={state.currentSlide > 0 ? data[currentSlide - 1].thumbnail : data[currentSlide]?.thumbnail} 
                />

                <TiArrowLeft />
                {state.currentSlide > 0 && (
                    <h4 className='slider__nav-title'> {data[currentSlide - 1].title }</h4>
                )}

                
            </button>
            <button
                className={`slider__nav-next ${state.currentSlide === state.data.length - 1 ? 'isDisabled' : ''}`}
                onClick={handleNext}
                disabled={state.currentSlide === state.data.length - 1}
            >
                <img   
                    alt="next slide" 
                    className='slider__nav-image' 
                    src={state.currentSlide < data.length - 1 ? data[currentSlide + 1].thumbnail : data[currentSlide]?.thumbnail} 
                />
                
                {state.currentSlide < data.length - 1 && (
                    <h4 className='slider__nav-title'>{data[currentSlide + 1].title }</h4>
                )}
                <TiArrowRight />
            </button>
        </>
    );
};

export default Navigation;
