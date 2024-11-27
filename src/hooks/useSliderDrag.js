// hooks/useSliderDrag.js
import { useState, useRef } from "react";
import { ANIMATION_DURATION } from './../constants/constants';

export const useSliderDrag = (containerWidth, currentSlide, dataLength, dispatch) => {
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState(0);
    const startPos = useRef({ x: 0, y: 0 });
    const lastDragOffset = useRef(0);
    const isDragEndDelay = useRef(false);
    
    const trashHold = containerWidth / 6;

    const handleDragStart = (e) => {
        if (isDragEndDelay.current) return;
        setIsDragging(true);
        const clientX = e.clientX || e.touches[0].clientX;
        const clientY = e.clientY || e.touches[0].clientY;
        startPos.current = { x: clientX, y: clientY };
        setDragOffset(0);
        dispatch({ type: "DRAG", eventType: 'drag' });
    };

    const handleDragMove = (e) => {
        if (!isDragging) return;

        const clientX = e.clientX || (e.touches && e.touches[0]?.clientX);
        if (clientX === undefined) return;

        const deltaX = clientX - startPos.current.x;
        if (Math.abs(deltaX - lastDragOffset.current) > 2) {
            lastDragOffset.current = deltaX;
            setDragOffset(deltaX);
        }
    };

    const handleDragEnd = () => {
        if (!isDragging) return;

        setIsDragging(false);
        if (Math.abs(dragOffset) > trashHold) {
            if (dragOffset < 0 && currentSlide < dataLength - 1) {
                dispatch({ type: "NEXT" });
            } else if (dragOffset > 0 && currentSlide > 0) {
                dispatch({ type: "PREV" });
            }
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
