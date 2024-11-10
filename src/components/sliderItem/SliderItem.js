import React from "react";
import "./SliderItem.scss";

const SliderItem = (props) => {
    const { index, currentSlide, slide } = props;
    const { title, subtitle, leadImage, hash } = slide;
    const tagsArray = hash.split(" ").map((tag) => tag.replace("#", ""));

    return (
        <>
            {slide && (
                <li className={`slider__item ${index === currentSlide ? "isVisible" : ""}`}>
                    <div
                        className={"slider__item-image"}
                        style={{ backgroundImage: `url(${leadImage})` }}
                    />
                    <div className={"slider__item-content"}>
                        <div className="slider__item-content-wrapper">
                            <h2 className="slider__item-content-title">{title}</h2>
                            <h3 className="slider__item-content-subtitle">{subtitle}</h3>
                            <div className="slider__item-content-hash">
                                {tagsArray.map((tag) => {
                                    const hashUrl = `https://x.com/hashtag/${tag}`;
                                    return (
                                        <a
                                            className="slider__item-content-hash-link"
                                            key={tag}
                                            href={hashUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <span>#{tag}</span>
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </li>
            )}
        </>
    );
};
export default SliderItem;
