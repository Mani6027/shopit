import axios from 'axios';

import {
    ALL_PRODUCTS_REQUET, 
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    PRODUCT_DETAILS_REQUET,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    CLEAR_ERRORS
} from '../constants/productConstants'

export const getProducts = (currentPage=1) => async (dispatch) => {
    try{
        dispatch({
            type: ALL_PRODUCTS_REQUET
        })

        const {data} = await axios.get(`api/v1/products?page=${currentPage}`)

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


// Get product details
export const getProductDetails = (id) => async (dispatch) => {
    try{
        dispatch({
            type: PRODUCT_DETAILS_REQUET
        })

        const {data} = await axios.get(`/api/v1/product/${id}`)

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product
        })

    }catch(error){

        dispatch({  
            type: PRODUCT_DETAILS_FAIL,
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
