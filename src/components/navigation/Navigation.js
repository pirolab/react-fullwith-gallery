import React from 'react';
import { useSlider } from '../../context/sliderContext';
import { TiArrowLeft , TiArrowRight} from "react-icons/ti";
import { calculateAnimationSpeed } from '../../helper';

import './Navigation.scss';

const Navigation = () => {
    const { state, dispatch } = useSlider();
    const { data, currentSlide,  eventType, limit  } = state;
    const slidePositionPercentage = currentSlide * data.length; 
    const slideOffset = (currentSlide * 1) / data.length;
    const leftStyle = `calc(${slidePositionPercentage}% + ${slideOffset}rem)`;
    const animationSpeed = calculateAnimationSpeed(eventType, limit);

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
                        <li className='slider__nav-bullet-item isProgress' 
                            style={{
                                left: leftStyle,
                                transition: `left ${animationSpeed}s cubic-bezier(0.25, 1, 0.5, 1)`
                        }}/>
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
