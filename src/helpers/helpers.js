export const calculateAnimationSpeed = (eventType, limit) => {
    return eventType === 'thumb'
        ? 0.6 + (Number(limit) / 10) * 4
        : 1;
};
export const getBgPositionX = (index, current, offset, limit) => {
    if (limit) return 'center';
    return index === current
        ? `${Math.round(offset * -1 / 6)}px`
        : `${Math.round(- offset * -1 / 6)}px`;
};


export const getTransitionTime = (index, current, isDragging) => {
    return isDragging
        ? 'none'
        : `all 0.6s ${index === current && !isDragging
            ? '0.1s'
            : '1s'}`
};

export const getScrollOffset = (parent, child) => {
    const parentWidth = parent.clientWidth;
    const childWidth = child.offsetWidth;
    return child.offsetLeft - (parentWidth - childWidth) / 2;
};


export const calculateStyles = (ref, currentSlide, dataLength) => {
    if (ref && ref.current) {
        const computedStyle = window.getComputedStyle(ref.current);
        const gap = parseFloat(computedStyle.gap || 0);
        const offsetLeft = parseFloat(computedStyle.paddingLeft || 0);

        const firstLi = ref.current.children[1];
        if (firstLi) {
            const liWidth = parseFloat(window.getComputedStyle(firstLi).width || 0);
            return {
                maxWidth: (liWidth + gap) * dataLength + 10,
                leftStyle: `${currentSlide * (liWidth + gap) + offsetLeft}px`
            };
        }
    }
    return { maxWidth: 0, leftStyle: '0px' };
};

export const scrollToSlide = (index, refItem) => {
    if (refItem.current) {
        const children = refItem.current.children;
        const targetChild = children[index];
        if (targetChild) {
            const containerWidth = refItem.current.clientWidth;
            const childWidth = targetChild.offsetWidth;
            const scrollOffset = targetChild.offsetLeft - (containerWidth / 2) + (childWidth / 2);

            return refItem.current.scrollLeft = scrollOffset;

        }
    }
};

export const scrollToActiveSlide = (slider, activeSlide) => {
    if (!slider || !activeSlide) return;
    const parentWidth = slider.offsetWidth;
    const childWidth = activeSlide.offsetWidth;
    const childPosition = activeSlide.offsetLeft;
    const scrollOffset = childPosition - (parentWidth - childWidth) / 2;

    slider.scrollLeft = scrollOffset;
};