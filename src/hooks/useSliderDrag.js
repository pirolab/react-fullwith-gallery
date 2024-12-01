import { useState, useRef, useEffect } from "react";
import { DRAG_ANIMATION_DELAY, RESIZE_FACTOR, DRAG_THRESHOLD } from './../constants/constants';
import { scrollToActiveSlide } from '../helpers/helpers';

export const useSliderDrag = (containerWidth, currentSlide, dataLength, dispatch, refSlider) => {
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState(0);
    const startPos = useRef({ x: 0, y: 0 });
    const lastDragOffset = useRef(0);
    const isDragEndDelay = useRef(false);
    const trashHold = containerWidth / RESIZE_FACTOR;

    const refSliderNav = useRef();
    const refSliderNavItems = useRef([]);

    useEffect(() => {
        if (!refSlider.current) return;
    
        const timeout = setTimeout(() => {
            const sliderNav = refSlider.current.querySelector('.slider__nav-bullet');
            const sliderNavItems = refSlider.current.querySelectorAll('.slider__nav-bullet-item');
            if (sliderNav && sliderNavItems.length > 0) {
                refSliderNav.current = sliderNav;
                refSliderNavItems.current = Array.from(sliderNavItems);
            } else {
                console.error("Elements not found");
            }
        }, 100);
    
        return () => clearTimeout(timeout);
    }, [refSlider.current]);
    

    const handleDragStart = (e) => {
        if (isDragEndDelay.current) return;

        setIsDragging(true);
        const clientX = e.clientX || e.touches[0].clientX;
        startPos.current = { x: clientX };
        setDragOffset(0);
        dispatch({ type: "DRAG", eventType: 'drag' });
    };

    const handleDragMove = (e) => {
        if (!isDragging) return;

        const clientX = e.clientX || (e.touches && e.touches[0]?.clientX);
        if (clientX === undefined) return;

        const deltaX = clientX - startPos.current.x;

        if (Math.abs(deltaX - lastDragOffset.current) > DRAG_THRESHOLD) {
            lastDragOffset.current = deltaX;
            setDragOffset((prevOffset) => {
                if (Math.abs(prevOffset - deltaX) > DRAG_THRESHOLD) {
                    return deltaX;
                }
                return prevOffset;
            });
        }
    };
    

    const handleDragEnd = () => {
        if (!isDragging) return;
        let activeSlide = '';
        setIsDragging(false);

        if (Math.abs(dragOffset) > trashHold) {
            if (dragOffset < 0 && currentSlide < dataLength - 1) {
                activeSlide = refSliderNavItems.current[currentSlide + 1];
                dispatch({ type: "NEXT" });
            } else if (dragOffset > 0 && currentSlide > 0) {
                activeSlide = refSliderNavItems.current[currentSlide - 1];
                dispatch({ type: "PREV" });
            }
        }

        if (refSliderNav.current && activeSlide) {
            scrollToActiveSlide(refSliderNav.current, activeSlide);
        }

        setDragOffset(0);
        lastDragOffset.current = 0;
        isDragEndDelay.current = true;

        setTimeout(() => {
            isDragEndDelay.current = false;
        }, DRAG_ANIMATION_DELAY);
    };

    return {
        sliderElements: refSliderNav.current,
        slideElements: refSliderNavItems.current,
        dragOffset,
        isDragging,
        handleDragStart,
        handleDragMove,
        handleDragEnd,
    };
};
