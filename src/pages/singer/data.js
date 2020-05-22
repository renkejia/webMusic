import React, { useReducer, createContext } from 'react'
import { fromJS } from 'immutable'

export const CategoryDataContext = createContext({});

export const CHANGE_CATEGORY = 'singers/CHANGE_CATEGORY';
export const CHANGE_ALPHA = 'singers/CHANGE_ALPHA';

// reducer纯函数
const reducer = (state, action) => {
    switch (action.type) {
        case CHANGE_CATEGORY:
            return state.set('category', action.data);
        case CHANGE_ALPHA:
            return state.set('alpha', state.data);
        default:
            return state
    }
}

// provider 组件
export const Data = props => {
    // useReducer 的第二个参数中传入初始值
    const [data, dispatch] = useReducer(reducer, fromJS({
        Category: '',
        alpha: '',
    }));
    return (
        <CategoryDataContext.Provider value={{data, dispatch}}>
            {props.children}
        </CategoryDataContext.Provider>
    )
}