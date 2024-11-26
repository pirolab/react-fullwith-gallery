import { useEffect } from 'react';

export const useTouchEvents = (
    refContainer,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
    setIsTouchStart
) => {
    useEffect(() => {
        const container = refContainer.current;

        const handleTouchStart = (e) => {
            const touch = e.touches[0];
            e.target.dataset.startX = touch.clientX;
            e.target.dataset.startY = touch.clientY;
            handleDragStart(e);
            setIsTouchStart(true);
        };

        const handleTouchMove = (e) => {
            const touch = e.touches[0];
            const startX = parseFloat(e.target.dataset.startX || 0);
            const startY = parseFloat(e.target.dataset.startY || 0);
            const deltaX = touch.clientX - startX;
            const deltaY = touch.clientY - startY;

            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                e.preventDefault();
            }
            handleDragMove(e);
        };

        const handleTouchEnd = (e) => {
            delete e.target.dataset.startX;
            delete e.target.dataset.startY;
            handleDragEnd(e);
            setIsTouchStart(false);
        };

        container.addEventListener('touchstart', handleTouchStart);
        container.addEventListener('touchmove', handleTouchMove);
        container.addEventListener('touchend', handleTouchEnd);

        return () => {
            container.removeEventListener('touchstart', handleTouchStart);
            container.removeEventListener('touchmove', handleTouchMove);
            container.removeEventListener('touchend', handleTouchEnd);
        };
    }, [refContainer, handleDragStart, handleDragMove, handleDragEnd, setIsTouchStart]);
};
