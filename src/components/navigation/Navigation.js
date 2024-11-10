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
                <div className="slider-nav">
                    <span className="image-count">{currentSlide + 1} of {data.length}</span>

                    <span className="slider-nav-prev" onClick={handlePrev}>
                        <MdOutlineArrowBackIos />
                    </span>

                    <ul className="bullet-nav">
                        {data.map((_, index) => (
                            <li
                                className={'bullet-nav-item ' + (index === currentSlide ? 'isActive' : '')}
                                key={index}
                                onClick={() => handleBullet(index)}
                            />
                        ))}
                    </ul>

                    <span className="slider-nav-next" onClick={handleNext}>
                        <MdOutlineArrowForwardIos />
                    </span>
                </div>
            )}
        </>
    );
};

export default Navigation;
