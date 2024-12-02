import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useDataFetch } from '../hooks/';
import { LAYOUT_SIZE_CONFIG  } from '../constants/constants';

const SliderContext = createContext();

export const useSliderContext = () => useContext(SliderContext);

const sliderReducer = (state, action) => {
    switch (action.type) {
        case 'NEXT':
            return {
                ...state,
                currentSlide: Math.min(state.currentSlide + 1, state.data.length - 1),
                limit:  1
            };
        case 'PREV':
            return {
                ...state,
                currentSlide: Math.max(state.currentSlide - 1, 0),
                limit:  1
            };
        case 'DRAG':
            return {
                ...state,
                eventType: 'drag'
            };            
        case 'BULLET':
            return {
                ...state,
                currentSlide: action.index % state.data.length,
                limit:  Math.abs(state.currentSlide - action.index),
                eventType: 'bullet'
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

export const SliderProvider = ({ children, url }) => {
    const { data, error, isLoading } = useDataFetch(url);
    
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
    
    if (isLoading) {
        return <>
            <div className='slider'
                style={{
                    height: LAYOUT_SIZE_CONFIG.height
                }}
            >
                <span className="slider__loader">
                    <b>loading...</b>
                </span>
            </div>
        </>
    }

    if (error) {
        return (
            <div className='slider'>
                <h2 style={{color:'white', textAlign: 'center'}}>Error: <b>{error.message}</b></h2>
            </div>
        );
    }

    return (
        <SliderContext.Provider value={{ state, dispatch }}>
            {children}
        </SliderContext.Provider>
    );
};
