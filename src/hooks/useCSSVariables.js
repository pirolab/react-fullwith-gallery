import { useEffect } from 'react';

export const useCSSVariables = (ref, sizeConfig) => {
    useEffect(() => {
        const root = ref.current;
        root.style.setProperty('--slider-max-width', sizeConfig.maxWidth);
        root.style.setProperty('--slider-height-mobile', sizeConfig.heightMobile);
        root.style.setProperty('--slider-min-height-mobile', sizeConfig.minHeightMobile);
        root.style.setProperty('--slider-height', sizeConfig.height);
        root.style.setProperty('--slider-min-height', sizeConfig.minHeight);
        root.style.setProperty('--slider-border-radius', sizeConfig.borderRadius);
    }, [ref, sizeConfig]);
};
