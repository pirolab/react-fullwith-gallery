export const calculateAnimationSpeed = (eventType, limit) => {
    return eventType === 'bullet'
        ? 0.6 + (Number(limit) / 10) * 4
        : 1;
};
export const getBgPositionX = (i, current, offset, limit) => {
    if (limit) return 'center';
    return i === current
        ? `${Math.round(offset * -1 / 6)}px`
        : `${Math.round(-offset * -1 / 6)}px`;
};


export const getTransitionTime = (i, current, isDragging) => {
    return isDragging
        ? 'none'
        : `all 0.6s ${i === current && !isDragging
            ? '0.1s'
            : '1s'}`
};
