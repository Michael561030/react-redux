
import {takeLatest, put, call} from 'redux-saga/effects'

// actionTypes
const LOAD_PRODUCT_ASYNC = 'LOAD_PRODUCT_ASYNC';
const LOAD_SUCCESS = 'LOAD_SUCCESS';
const LOAD_FAILURE = 'LOAD_FAILURE';
const LOAD_REQUEST = 'LOAD_REQUEST';
const SET_INPUT_VALUE = 'SET_INPUT_VALUE';

export const initialState = {
    products: null,
    loading: false,
    error: null,
    inputValue: '',
    categoriesList: null
};
// Reducer
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case LOAD_SUCCESS:
            const uniqueCategories = [...new Set(action.payload.map(item => item.bsr_category))];
            uniqueCategories.unshift('all');
            return {
                ...state,
                loading: false,
                products: action.payload ? action.payload : null,
                categoriesList: uniqueCategories,
                error: null,
            };
        case LOAD_FAILURE:
            return {
                ...state,
                loading: false,
                products: null,
                error: action.error
            };
        case SET_INPUT_VALUE:
            return {
                ...state,
                inputValue: action.payload,
            };
        default:
            return state;
    }
}


// Saga
export function* fetchProductsSaga() {
    try {
        yield put(requestForProducts());
        const products = yield call(() => {
                return fetch("http://localhost:3001/products.json")
                    .then(res => res.json())
                    .then(
                        (result) => (result.hasOwnProperty('products') && result.products)
                    )
            }
        );
        yield put(requestProductSuccess(products));
    } catch (error) {
        yield put(requestProductError());
    }
}
export function* watchRequest() {
    yield takeLatest(LOAD_PRODUCT_ASYNC, fetchProductsSaga);
}

// Action Creators
export const requestProduct = () => {
    return { type: 'LOAD_PRODUCT_ASYNC' }
};

export const requestForProducts = () => ({
    type: LOAD_REQUEST
});


export const requestProductSuccess = (products) => {
    return { type: 'LOAD_SUCCESS', payload: products}
};


export const requestProductError = () => {
    return { type: 'LOAD_FAILURE' }
};


export const onInputSearch = (value) => ({
    type: SET_INPUT_VALUE,
    payload: value
});
