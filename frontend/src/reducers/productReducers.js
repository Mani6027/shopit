import {
    ALL_PRODUCTS_REQUET, 
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    CLEAR_ERRORS,
    PRODUCT_DETAILS_REQUET,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL
} from '../constants/productConstants'

export const productsReducer = (state = {products: []}, action) => {
    switch(action.type) {
        case ALL_PRODUCTS_REQUET:
            return {
                loading: true,
                products: []
            }

        case ALL_PRODUCTS_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.productsCount
            }

        case ALL_PRODUCTS_FAIL:
            return {
                loading: false,
                products: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
                
            }

        default:
        return state;
    }
}


export const productDetailReducer = (state = {product: {}}, action) => {
    switch(action.type) {
        case PRODUCT_DETAILS_REQUET:
            return {
                ...state,
                loading: true
            }
        case PRODUCT_DETAILS_SUCCESS:
            return{
                loading: false,
                product: action.payload
            }
        case PRODUCT_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
                
            }
        default:
            return state;
    }
}
