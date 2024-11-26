// hooks/useResizeObserver.js
import { useState, useEffect } from "react";

export const useResizeObserver = (ref) => {
    const [containerWidth, setContainerWidth] = useState(0);
    const [isResizing, setIsResizing] = useState(false)
    useEffect(() => {
        const updateWidth = () => {
            setIsResizing(true);
            if (ref.current) {
                setContainerWidth(ref.current.offsetWidth)
            }
            setTimeout(() => setIsResizing(false), 100);
        };
        
        updateWidth();
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
    }, [ref]);

    return { containerWidth, isResizing };
};
