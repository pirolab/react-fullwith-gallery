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

    const tagsArray = hash.split(" ").map((tag) => tag.replace("#", ""));
    const isAtLeftLimit = dragDir === 'LTR' && currentSlide === 0;
    const isAtRightLimit = dragDir === 'RTL' && currentSlide >= (dataLength - 1);
    const restrictToBounds = isAtLeftLimit || isAtRightLimit;
    const itemClass = `slider__item ${index === currentSlide ? "isVisible" : ""}`;

    const getBgPositionX = (i, current, offset, limit) => {
        if (limit) return '0';
        return i === current
            ? `${offset * -1 / 2}px`
            : `${-offset * -1 / 6}px`;
    };

    const getTransitionTime = (i, current, isDragging) => {
        return isDragging
            ? 'none'
            : `all .6s ${i === current && !isDragging
                ? '.2s'
                : '.8s'}`
    };

    if (!slide) return null;

    return (
        <li className={itemClass}>
            <div
                className="slider__item-image"
                style={{
                    backgroundImage: `url(${leadImage})`,
                    backgroundPositionX: getBgPositionX(index, currentSlide, dragOffset, restrictToBounds),
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
