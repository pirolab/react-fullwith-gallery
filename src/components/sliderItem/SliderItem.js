import React, { useEffect, useState } from 'react';
import { LazyLoadImage } from "react-lazy-load-image-component";

import "./SliderItem.scss";
import { getBgPositionX, getTransitionTime } from '../../helpers/helpers';
import { useSliderContext } from '../../context/sliderContext';
const SliderItem = (props) => {

    const {
        index,
        dragDir,
        dragOffset,
        dataLength,
        isDragging,
        isResizing,
        animationSpeed
    } = props;

    const { state } = useSliderContext();
    const { currentSlide, data } = state;
    const [delayedSlide, setDelayedSlide] = useState(null);
    const { title, subtitle, leadImage, hash, description } = data[index] || {};

    const tagsArray = hash.split(' ').map((tag) => tag.replace('#', ''));
    const isAtLeftLimit = dragDir === 'LTR' && currentSlide === 0;
    const isAtRightLimit = dragDir === 'RTL' && currentSlide >= (dataLength - 1);
    const restrictToBounds = isAtLeftLimit || isAtRightLimit;
    const transitionStyle = isDragging || isResizing
        ? "none"
        : getTransitionTime(index, currentSlide, dragOffset, isDragging);

    const itemClass = `slider__item ${index === delayedSlide ? 'isVisible' : ''}`;

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDelayedSlide(currentSlide);
            
        }, animationSpeed * 800);
    
        return () => clearTimeout(timeout);
    }, [currentSlide]);
    
    if (!data[index]) return null;

    return (
        <li className={itemClass}>
            <div
                className="slider__item-leadmedia"
                style={{
                    transform: `translateX(${getBgPositionX(index, currentSlide, dragOffset, restrictToBounds)})`,
                    transition: transitionStyle
                }}
            >
                <LazyLoadImage
                    src={leadImage}
                    alt={title}
                    width={1600}
                    height={1200}
                    className="slider__item-leadmedia-image"
                    placeholder={<span className="slider__loader"><b>loading...</b></span>}
                />
            </div>
            <div className="slider__item-content">
                <div className="slider__item-content-wrapper">
                    <h2 className="slider__item-content-title">{title}</h2>
                    <h3 className="slider__item-content-subtitle">{subtitle}</h3>
                    <p class="slider__item-content-description">{description}</p>
                    <div className="slider__item-content-hash">
                        {tagsArray.map((tag) => (
                            <a
                                className="slider__item-content-hash-link"
                                key={tag}
                                href={`https://x.com/hashtag/${tag}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <span>#{tag}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </li>
    );
};

export default SliderItem;
