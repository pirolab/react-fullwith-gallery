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
    const refList = useRef();
    const [dimensions, setDimensions] = useState({ width: 0 });
    const startX = useRef(0);

    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState(0);

    const handleDragStart = (e) => {
        setIsDragging(true);
        startX.current = e.clientX;
        setDragOffset(0);
    };

    const handleDragMove = (e) => {
        if (isDragging) {
            const currentX = e.clientX;
            const dragDistance = currentX - startX.current;
            setDragOffset(dragDistance);
        }
    };

    const handleDragEnd = () => {
        if (!isDragging) return;

        setIsDragging(false);

        const threshold = dimensions.width / 3;

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
                setDimensions({ width: refContainer.current.offsetWidth });
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
            style={{ cursor: isDragging ? "grabbing" : "grab" }}
        >
            {data && data.length > 0 ? (
                <>
                    <ul
                        className="slider-list vh100"
                        ref={refList}
                        style={{
                            width: dimensions.width && data.length
                                ? `${dimensions.width * data.length}px`
                                : "auto",
                            transform: `translateX(calc(-${dimensions.width * currentSlide}px + ${dragOffset}px))`,
                            transition: isDragging ? "none" : "transform 0.3s ease",
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
