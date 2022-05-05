import { ProductState } from "./products.reducer"

export const addProductAction = (payload: ProductState) => {
    return {
        type: 'ADD_PRODUCT',
        payload,
    };
}

export const deleteProductAction = (payload: ProductState) => {
    return {
        type: 'DELETE_PRODUCT',
        payload,
    };
}