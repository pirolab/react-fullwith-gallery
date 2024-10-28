import React from "react";
import './SliderItem.scss'
import Button from "../button/Button";

 const SliderItem = (props) => {
    const {index, currentSlide, slide} = props;
    const {
        imageRocket,
        imageRock,
        subtitle,
        bgImage,
        title,
        hash,
        cta
    } = slide
    return (

        <React.Fragment>
            {slide && (
                <li className={'slider-item ' + (index === currentSlide ? 'vh100 isVisible' : 'isHidden')}>
                    <div className={'left-image'}
                         style={{background: `url(${imageRock}) bottom/cover no-repeat`}}/>
                    <div className={'slider-item--bg'}
                         style={{background: `url(${bgImage}) bottom/cover no-repeat`}}/>
                    <div className={'rocket_block'}>
                        <div className="rocket_block-wrapper">
                            <h2 className="rocket_block-wrapper-subtitle">{subtitle}</h2>
                            <div className="rocket_block-wrapper-hash">
                                <span>{hash}</span>
                            </div>
                        </div>
                    </div>
                    <div className="slider-grid">
                        <div className={'logo'}
                             style={{background: 'url(./images/logo.svg) center/contain no-repeat'}}/>
                        <h1 className={'title'}>
                            {title}
                        </h1>
                        <Button index={index} currentSlide={currentSlide} cta={cta}/>

                    </div>
                    <div className={'right-image'}
                         style={{background: `url(${imageRocket}) center/cover no-repeat`}}/>
                </li>
            )}
        </React.Fragment>
    );
}
export default SliderItem;