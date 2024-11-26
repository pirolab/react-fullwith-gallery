import { useEffect } from 'react';

export const useCSSVariables = (refSlider, sizeConfig) => {
    useEffect(() => {
        const root = refSlider.current;
        root.style.setProperty('--slider-height-mobile', sizeConfig.heightMobile);
        root.style.setProperty('--slider-min-height-mobile', sizeConfig.minHeightMobile);
        root.style.setProperty('--slider-height', sizeConfig.height);
        root.style.setProperty('--slider-min-height', sizeConfig.minHeight);
    }, [refSlider, sizeConfig]);
};