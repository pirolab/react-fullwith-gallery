import React from "react";
import "./SliderItem.scss";

const SliderItem = ({
    index,
    currentSlide,
    slide,
    dragOffset,
    dataLength,
    dragDir,
    isDragging
}) => {

    const {
        title,
        subtitle,
        leadImage,
        hash
    } = slide || {};

    const tagsArray = hash.split(' ').map((tag) => tag.replace('#', ''));
    const isAtLeftLimit = dragDir === 'LTR' && currentSlide === 0;
    const isAtRightLimit = dragDir === 'RTL' && currentSlide >= (dataLength - 1);
    const restrictToBounds = isAtLeftLimit || isAtRightLimit;
    const itemClass = `slider__item ${index === currentSlide ? 'isVisible' : ''}`;

    const getBgPositionX = (i, current, offset, limit) => {
        if (limit) return 'center';
        return i === current
            ? `${Math.round(offset * -1 / 6)}px`
            : `${Math.round(-offset * -1 / 6)}px`;
    };
    
    
    const getTransitionTime = (i, current, isDragging) => {
        return isDragging
            ? 'none'
            : `all 0.6s ${i === current && !isDragging
                ? '0.1s'
                : '2s'}`
    };

    if (!slide) return null;

    return (
        <li className={itemClass}>
            <div
                className="slider__item-image"
                style={{
                    backgroundImage: `url(${leadImage})`,
                    transform: `translateX(${getBgPositionX(index, currentSlide, dragOffset, restrictToBounds)})`,
                    transition: getTransitionTime(index, currentSlide, dragOffset, isDragging)

                }}
            />
            <div className="slider__item-content">
                <div className="slider__item-content-wrapper">
                    <h2 className="slider__item-content-title">{title}</h2>
                    <h3 className="slider__item-content-subtitle">{subtitle}</h3>
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
