import React from "react";
import "./SliderItem.scss";

const SliderItem = (props) => {
    const { index, currentSlide, slide } = props;
    const { title, subtitle, leadImage, hash } = slide;
    const tagsArray = hash.split(" ").map((tag) => tag.replace("#", ""));

    return (
        <>
            {slide && (
                <li
                    className={
                        "slider-item " + (index === currentSlide ? "isVisible" : "")
                    }
                >
                    <div
                        className={"slider-item__lead-media"}
                        style={{ background: `url(${leadImage}) bottom/cover no-repeat` }}
                    />
                    <div className={"rocket_block"}>
                        <div className="rocket_block-wrapper">
                            <h2 className="rocket_block-wrapper-title">{title}</h2>
                            <h3 className="rocket_block-wrapper-subtitle">{subtitle}</h3>
                            <div className="rocket_block-wrapper-hash">
                                {tagsArray.map((tag) => {
                                    const hashUrl = `https://x.com/hashtag/${tag}`;
                                    return (
                                        <a
                                            className="rocket_block-wrapper-hash--link"
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
