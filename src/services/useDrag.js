import { useState, useRef } from "react";

const useDrag = (onChangeSlide) => {
    const refContainer = useRef();
    const refList = useRef();
    const [dimensions, setDimensions] = useState({ width: 0 });
    const startX = useRef(0);
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState(0);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        startX.current = e.clientX;
        setDragOffset(0);
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
            const currentX = e.clientX;
            const dragDistance = currentX - startX.current;
            setDragOffset(dragDistance);
        }
    };

    const handleMouseUp = () => {
        if (!isDragging) return;
        setIsDragging(false);

        const threshold = dimensions.width / 3;

        if (Math.abs(dragOffset) > threshold) {
            if (dragOffset < 0) {
                onChangeSlide("NEXT");
            } else {
                onChangeSlide("PREV");
            }
        }
        setDragOffset(0);
    };

    const handleMouseLeave = () => {
        if (isDragging) {
            handleMouseUp();
        }
    };

    return {
        refContainer,
        refList,
        dimensions,
        setDimensions,
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
        handleMouseLeave,
        isDragging,
        dragOffset,
    };
};

export default useDrag;
