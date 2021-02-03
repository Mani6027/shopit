import axios from 'axios';


import {
    ALL_PRODUCTS_REQUET, 
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    CLEAR_ERRORS
} from '../constants/productConstants'

export const getProduct = () => async (dispatch) => {
    try{
        dispatch({
            type: ALL_PRODUCTS_REQUET
        })

        const {data} = await axios.get('/api/v1/products')

        dispatch({
            type: ALL_PRODUCTS_SUCCESS,
            payload: data
        })

    }catch(error){

        dispatch({
            type: ALL_PRODUCTS_FAIL,
            payload: error.response.data.message
        })

    }
}

// Clear Errors
export const clearErrors = () => async (dispatch) =>{
    dispatch({
        type: CLEAR_ERRORS
    })
}
