import { useState, useRef } from "react";
import { ANIMATION_DURATION } from './../constants/constants';

export const useSliderDrag = (containerWidth, currentSlide, dataLength, dispatch) => {
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState(0);
    const startPos = useRef({ x: 0, y: 0 });
    const lastDragOffset = useRef(0);
    const isDragEndDelay = useRef(false);
    const trashHold = containerWidth / 6;
    const slider = document.querySelector('.slider__nav-bullet');
    const slides = document.querySelectorAll('.slider__nav-bullet-item');

    const scrollToActiveSlide = (slider, activeSlide) => {
        if (!slider || !activeSlide) return;
        const parentWidth = slider.offsetWidth;  // Larghezza del contenitore
        const childWidth = activeSlide.offsetWidth;  // Larghezza della slide attiva
        const childPosition = activeSlide.offsetLeft;  // Posizione della slide nel carosello
        const scrollOffset = childPosition - (parentWidth - childWidth) / 2;
        slider.scrollLeft = scrollOffset;
    };
    
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

        if (Math.abs(deltaX - lastDragOffset.current) > 0.25) { 
            lastDragOffset.current = deltaX;
            setDragOffset(deltaX);
        }
    };

    const handleDragEnd = () => {
        if (!isDragging) return;
        let activeSlide = '';
        setIsDragging(false);
    
        if (Math.abs(dragOffset) > trashHold) {
            if (dragOffset < 0 && currentSlide < dataLength - 1) {
                activeSlide = slides[currentSlide + 1];
                dispatch({ type: "NEXT" });
            } else if (dragOffset > 0 && currentSlide > 0) {
                activeSlide = slides[currentSlide - 1];
                dispatch({ type: "PREV" });
            }
        }
    
        if (slider && activeSlide) {
            scrollToActiveSlide(slider, activeSlide);
        }
    
        setDragOffset(0);
        lastDragOffset.current = 0;
        isDragEndDelay.current = true;
    
        setTimeout(() => {
            isDragEndDelay.current = false;
        }, ANIMATION_DURATION);
    };
    

    return {
        dragOffset,
        isDragging,
        handleDragStart,
        handleDragMove,
        handleDragEnd,
    };
};
