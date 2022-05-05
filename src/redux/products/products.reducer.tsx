export interface ProductState {
    name: string,
    price: string,
    description: string,
    image: any,
};

interface InitialStateInterface {
    productList: ProductState[],
};

const INITIAL_STATE: InitialStateInterface = {
    productList: [],
};

const reducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case 'ADD_PRODUCT':
            return {
                ...state,
                productList: [
                    ...state.productList, 
                    action.payload
                ],
            };
        case 'DELETE_PRODUCT':
            return {
                ...state,
                productList: state.productList.filter((i, idx) => idx !== action.payload),
            };
        default:
            return state;
    }
};

export default reducer;
