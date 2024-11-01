import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import data from "../../mock/sliderData.json";
import Navigation from "../navigation/Navigation";
import SliderItem from "../sliderItem/SliderItem";
import "./Slider.scss";

const Slider = () => {
    const { currentSlide } = useSelector((state) => state.navigation);
    const dispatch = useDispatch();

    const refContainer = useRef();
    const [containerWidth, setContainerWidth] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [dragOffset, setDragOffset] = useState(0);

    const startPos = useRef({ x: 0, y: 0 });

    const handleDragStart = (e) => {
        setIsDragging(true);
        const clientX = e.clientX || e.touches[0].clientX;
        const clientY = e.clientY || e.touches[0].clientY;
        startPos.current = { x: clientX, y: clientY };
        setDragOffset(0);
    };

    const handleDragMove = (e) => {
        if (!isDragging) return;

        const clientX = e.clientX || e.touches[0].clientX;
        const clientY = e.clientY || e.touches[0].clientY;
        const deltaX = clientX - startPos.current.x;
        const deltaY = Math.abs(clientY - startPos.current.y);

        if (Math.abs(deltaX) > deltaY) {
            setDragOffset(deltaX);
        }
    };

    const handleDragEnd = () => {
        if (!isDragging) return;
        setIsDragging(false);
        setIsResizing(false)
        if (Math.abs(dragOffset) > containerWidth / 5) {
            if (dragOffset < 0 && currentSlide < data.length - 1) {
                dispatch({ type: "NEXT", dataLength: data.length });
            } else if (dragOffset > 0 && currentSlide > 0) {
                dispatch({ type: "PREV", dataLength: data.length });
            }
        }
        setDragOffset(0);
    };

    const updateDimensions = () => {
        if (refContainer.current) {
            setIsResizing(true);
            setContainerWidth(refContainer.current.offsetWidth);
        }
    };

    useEffect(() => {
        updateDimensions();
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

    useEffect(() => {
        const handleTransitionEnd = () => setIsResizing(false);
        const sliderList = refContainer.current.querySelector(".slider-list");

        if (sliderList) {
            sliderList.addEventListener("transitionend", handleTransitionEnd);
        }
        return () => {
            if (sliderList) {
                sliderList.removeEventListener("transitionend", handleTransitionEnd);
            }
        };
    }, []);

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
        <div
            className="slider"
            ref={refContainer}
            {...attachDragEvents}
            style={{
                cursor: isDragging ? "grabbing" : "grab",
                touchAction: isDragging ? "none" : "pan-y",
            }}
        >
            {data.length > 0 ? (
                <>
                    <ul
                        className="slider-list vh100"
                        style={{
                            width: containerWidth * data.length,
                            transform: `translateX(calc(-${containerWidth * currentSlide}px + ${dragOffset}px))`,
                            transition: isDragging || isResizing ? "none" : "transform .6s ease",
                        }}
                    >
                        {data.map((slide, index) => (
                            <SliderItem
                                currentSlide={currentSlide}
                                slide={slide}
                                key={index}
                                index={index}
                            />
                        ))}
                    </ul>
                    <Navigation currentSlide={currentSlide} data={data} />
                </>
            ) : (
                <span className="main_loader" />
            )}
        </div>
    );
};

export default Slider;
