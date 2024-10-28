import React from "react";
import { MdOutlineArrowForwardIos, MdOutlineArrowBackIos   } from "react-icons/md";

import './Navigation.scss'
import {useDispatch} from "react-redux";
import {prev, next, bullet} from "../../actions";

const Navigation = (props) => {
    const {data, currentSlide} = props;
    const dispatch = useDispatch()
    
    return (
        <>
            {data && (
                <div className="slider-nav">

                    <span className="image-count">{currentSlide + 1} of {data.length}</span>

                    <span className="slider-nav-prev"
                          onClick={() => {dispatch(prev(data.length));}}><MdOutlineArrowBackIos  /></span>
                    <ul className="bullet-nav">
                        {data.map((element, index) => {
                            return (
                                <li className={'bullet-nav-item ' + (index === currentSlide ? 'isActive' : '')}
                                    key={index}
                                    onClick={() => {dispatch(bullet(index, data.length));}}/>
                            );
                        })}
                    </ul>
                    <span className="slider-nav-next"
                          onClick={() => {dispatch(next(data.length));}}><MdOutlineArrowForwardIos /></span>
                </div>

            )}
        </>
    );
}
export default Navigation;