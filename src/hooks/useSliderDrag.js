// hooks/useSliderDrag.js
import { useState, useRef } from "react";

export const useSliderDrag = (containerWidth, currentSlide, dataLength, dispatch) => {
    const [isDragging, setIsDragging] = useState(false);
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
        const clientX = e.clientX || (e.touches && e.touches[0]?.clientX);
        if (clientX === undefined) return;

        const deltaX = clientX - startPos.current.x;
        setDragOffset(deltaX);
    };

    const handleDragEnd = () => {
        if (!isDragging) return;
        setIsDragging(false);
        if (Math.abs(dragOffset) > containerWidth / 5) {
            if (dragOffset < 0 && currentSlide < dataLength - 1) {
                dispatch({ type: "NEXT" });
            } else if (dragOffset > 0 && currentSlide > 0) {
                dispatch({ type: "PREV" });
            }
        }
        setDragOffset(0);
    };

    return {
        dragOffset,
        isDragging,
        handleDragStart,
        handleDragMove,
        handleDragEnd,
    };
};
