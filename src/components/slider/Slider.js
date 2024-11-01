// Slider.js
import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import data from "../../mock/sliderData.json";
import Navigation from "../navigation/Navigation";
import SliderList from "./SliderList";
import { useSliderDrag } from "../../hooks/useSliderDrag";
import { useResizeObserver } from "../../hooks/useResizeObserver";
import "./Slider.scss";

const Slider = () => {
    const { currentSlide } = useSelector((state) => state.navigation);
    const dispatch = useDispatch();
    const refContainer = useRef();

    const { containerWidth, isResizing } = useResizeObserver(refContainer);

    const {
        dragOffset,
        isDragging,
        handleDragStart,
        handleDragMove,
        handleDragEnd,
    } = useSliderDrag(containerWidth, currentSlide, data.length, dispatch);

    const attachDragEvents = {
        onMouseDown: handleDragStart,
        onMouseMove: handleDragMove,
        onMouseUp: handleDragEnd,
        onMouseLeave: handleDragEnd,
        onTouchStart: handleDragStart,
        onTouchMove: handleDragMove,
        onTouchEnd: handleDragEnd,
    };

    return (
        <div className="slider">

            {data.length > 0 ? (
                <>
                    <div
                        className="slider-wrapper"
                        ref={refContainer}
                        {...attachDragEvents}
                        style={{
                            cursor: isDragging ? "grabbing" : "grab",
                            touchAction: isDragging ? "none" : "pan-y",
                        }}
                    >
                        <SliderList
                            data={data}
                            currentSlide={currentSlide}
                            dragOffset={dragOffset}
                            containerWidth={containerWidth}
                            isDragging={isDragging}
                            isResizing={isResizing}
                        />
                    </div>
                    <Navigation currentSlide={currentSlide} data={data} />
                </>
            ) : (
                <span className="main_loader" />
            )}

        </div>
    );
};

export default Slider;
