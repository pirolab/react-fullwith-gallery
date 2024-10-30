import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import data from "../../mock/sliderData.json";
import Navigation from "../navigation/Navigation";
import SliderItem from "../sliderItem/SliderItem";
import "./Slider.scss";

const Slider = () => {
    const navigation = useSelector((state) => state.navigation);
    const { currentSlide } = navigation;
    const dispatch = useDispatch();

    const refContainer = useRef();
    const [containerWidth, setContainerWidth] = useState(0);
    const startX = useRef(0);
    const startY = useRef(0);
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState(0);

    const handleDragStart = (e) => {
        setIsDragging(true);
        startX.current = e.clientX || e.touches[0].clientX;
        startY.current = e.clientY || e.touches[0].clientY;
        setDragOffset(0);
    };

    const handleDragMove = (e) => {
        if (!isDragging) return;

        const currentX = e.clientX || e.touches[0].clientX;
        const currentY = e.clientY || e.touches[0].clientY;

        const deltaX = currentX - startX.current;
        const deltaY = Math.abs(currentY - startY.current);
        if (Math.abs(deltaX) > deltaY) {
            setDragOffset(deltaX);
        }
    };

    const handleDragEnd = (e) => {
        if (!isDragging) return;

        setIsDragging(false);

        const threshold = containerWidth / 5;

        if (Math.abs(dragOffset) > threshold) {
            
            if (dragOffset < 0 && currentSlide < data.length - 1) {
                dispatch({ type: 'NEXT', dataLength: data.length });
            } else if (dragOffset > 0 && currentSlide > 0) {
                dispatch({ type: 'PREV', dataLength: data.length });
            }
        }

        setDragOffset(0);
    };

    const handleMouseLeave = () => {
        if (isDragging) {
            handleDragEnd();
        }
    };

    useEffect(() => {
        const updateDimensions = () => {
            if (refContainer.current) {
                setContainerWidth(refContainer.current.offsetWidth);
            }
        };

        updateDimensions();
        window.addEventListener("resize", updateDimensions);
        return () => {
            window.removeEventListener("resize", updateDimensions);
        };
    }, []);

    return (
        <div
            className="slider"
            ref={refContainer}
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
            style={{
                cursor: isDragging ? "grabbing" : "grab",
                touchAction: isDragging ? "none" : "pan-y",
            }}
        >
            {data && data.length > 0 ? (
                <>
                    <ul
                        className="slider-list vh100"
                        style={{
                            width: containerWidth * data.length,
                            transform: `translateX(calc(-${containerWidth * currentSlide}px + ${dragOffset}px))`,
                            transition: isDragging ? "none" : "transform .6s ease",
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
