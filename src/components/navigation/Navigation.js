import React from 'react';
import { useSlider } from '../../context/sliderContext';
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";

import './Navigation.scss';

const Navigation = () => {
    const { state, dispatch } = useSlider();
    const { data, currentSlide } = state;

    const handleNext = () => {
        dispatch({ 
            type: 'NEXT', 
            dataLength: data.length, 
            limit: 1
        });
        dispatch({ type: "DRAG", eventType: 'drag' });
    };

    const handlePrev = () => {
        dispatch({ 
            type: 'PREV', 
            dataLength: data.length, 
            limit: 1
        });
        dispatch({ type: "DRAG", eventType: 'drag' });
    };

    const handleBullet = (index) => {
        dispatch({ 
            type: 'BULLET', 
            index, 
            dataLength: data.length, 
            limit: (Math.abs(currentSlide - index)), 
            eventType: 'bullet'
        })
    };

    return (
        <>
            <span className="slider__nav-image-count">{currentSlide + 1} of {data.length}</span>
            {data && (
                <div className="slider__nav">
                    <ul className="slider__nav-bullet">
                        {data.map((_, index) => (
                            <li
                                className={'slider__nav-bullet-item ' + (index === currentSlide ? 'isActive' : '')}
                                key={index}
                                onClick={() => handleBullet(index)}
                            />
                        ))}
                    </ul>
                </div>
            )}
            <button className="slider__nav-prev" onClick={handlePrev}>
                <SlArrowLeft />
            </button>
            <button className="slider__nav-next" onClick={handleNext}>
                <SlArrowRight />
            </button>
        </>
    );
};

export default Navigation;
