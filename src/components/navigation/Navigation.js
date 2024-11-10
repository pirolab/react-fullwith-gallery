import React from 'react';
import { useSlider } from '../../context/sliderContext';
import { MdOutlineArrowForwardIos, MdOutlineArrowBackIos } from 'react-icons/md';

import './Navigation.scss';

const Navigation = () => {
    const { state, dispatch } = useSlider();
    const { data, currentSlide } = state;

    const handleNext = () => {
        dispatch({ type: 'NEXT', dataLength: data.length });
    };

    const handlePrev = () => {
        dispatch({ type: 'PREV', dataLength: data.length });
    };

    const handleBullet = (index) => {
        dispatch({ type: 'BULLET', index, dataLength: data.length });
    };

    return (
        <>
            {data && (
                <div className="slider__nav">
                    <span className="slider__nav-image-count">{currentSlide + 1} of {data.length}</span>

                    <button className="slider__nav-prev" onClick={handlePrev}>
                        <MdOutlineArrowBackIos />
                    </button>

                    <ul className="slider__nav-bullet">
                        {data.map((_, index) => (
                            <li
                                className={'slider__nav-bullet-item ' + (index === currentSlide ? 'isActive' : '')}
                                key={index}
                                onClick={() => handleBullet(index)}
                            />
                        ))}
                    </ul>

                    <button className="slider__nav-next" onClick={handleNext}>
                        <MdOutlineArrowForwardIos />
                    </button>
                </div>
            )}
        </>
    );
};

export default Navigation;
