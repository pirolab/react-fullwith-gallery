import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useDataFetch } from '../hooks/useDataFetch';

const SliderContext = createContext();

export const useSlider = () => useContext(SliderContext);

const sliderReducer = (state, action) => {
    switch (action.type) {
        case 'NEXT':
            return {
                ...state,
                currentSlide: (state.currentSlide + 1) % state.data.length,
            };
        case 'PREV':
            return {
                ...state,
                currentSlide: (state.currentSlide - 1 + state.data.length) % state.data.length,
            };
        case 'BULLET':
            return {
                ...state,
                currentSlide: action.index % state.data.length,
            };
        case 'SET_DATA':
            return {
                ...state,
                data: action.payload,
            };
        default:
            return state;
    }
};

export const SliderProvider = ({ children }) => {
    const { data, error } = useDataFetch('./sliderData.json');

    const initialState = {
        data: [],
        currentSlide: 0,
    };

    const [state, dispatch] = useReducer(sliderReducer, initialState);

    useEffect(() => {
        if (data) {
            dispatch({ type: 'SET_DATA', payload: data });
        }
    }, [data]);

    if (error) {
        return <div>Error loading data: {error.message}</div>;
    }

    return (
        <SliderContext.Provider value={{ state, dispatch }}>
            {children}
        </SliderContext.Provider>
    );
};
