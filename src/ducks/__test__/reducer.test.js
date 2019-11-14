import {put, takeLatest} from 'redux-saga/effects';
import reducer from '../index';
import * as i from '../index';



import {fetchProductsSaga} from '../index';

const LOAD_PRODUCT_ASYNC = 'LOAD_PRODUCT_ASYNC';
const LOAD_SUCCESS = 'LOAD_SUCCESS';
const LOAD_FAILURE = 'LOAD_FAILURE';
const LOAD_REQUEST = 'LOAD_REQUEST';
const SET_INPUT_VALUE = 'SET_INPUT_VALUE';

//Test Reducer
describe('TEST reducer', () => {
    // const api = fetch("http://localhost:3001/products.json")
    //     .then(res => res.json());

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(i.initialState)
    })
    it('PRODUCT_GET_REQUEST after situation without errorMsg', () => {
        const action = {
            type: LOAD_REQUEST,
        };

        expect(reducer(i.initialState, action)).toEqual({
            ...i.initialState,
            loading: true,
            error: null,
        })
    });
    it('PRODUCT_GET_REQUEST after error', () => {
        const initialStateWithError = {
            products: null,
            loading: true,
            error: 'Unknown error',
        };

        const action = {
            type: LOAD_REQUEST,
        };

        expect(reducer(initialStateWithError, action)).toEqual({
            ...initialStateWithError,
            loading: true,
            error: null,
        })
    });
    it('PRODUCT_GET_SUCCESS', () => {
        const action = {
            type: LOAD_SUCCESS,
            payload: [1, 2, 3],
        };

        expect(reducer(i.initialState, action)).toEqual({
            ...i.initialState,
            loading: false,
            products: action.payload,
            categoriesList: ['all', undefined]
        })
    })


});
//Test Actions
describe('Test actions', () => {
    it('requestProduct(): should create an action to async loading', () => {
        const expectedAction = {
            type: LOAD_PRODUCT_ASYNC,
        };
        expect(i.requestProduct()).toEqual(expectedAction)
    });
    it('requestForProducts(): should create an action to set loading', () => {
        const expectedAction = {
            type: LOAD_REQUEST,
        };
        expect(i.requestForProducts()).toEqual(expectedAction)
    });
    it('requestProductSuccess(): should create an action to loading products' , () => {
        const products =  {
            '1' : 'sports',
            '2' : 'home&kitchen'
        };
        const expectedAction = {
            type: LOAD_SUCCESS,
            payload: products
        };
        expect(i.requestProductSuccess(products)).toEqual(expectedAction)
    });
    it('requestProductError(): should create an action to loading request is error', () => {
        const expectedAction = {
            type: LOAD_FAILURE,
        };
        expect(i.requestProductError()).toEqual(expectedAction)
    });
    it('onInputSearch(): should create an action to search in input field', () => {
        const expectedAction = {
            type: SET_INPUT_VALUE,
            payload: 'sports'
        };
        expect(i.onInputSearch('sports')).toEqual(expectedAction)
    });

});

describe('Test Saga', () => {
    global.fetch = require ('jest-fetch-mock');

    it('should dispatch action "LOAD_PRODUCT_ASYNC" ', ()=> {
        const generator = i.watchRequest();
        expect(generator.next().value)
            .toEqual(takeLatest(LOAD_PRODUCT_ASYNC, fetchProductsSaga));
        expect(generator.next().done).toBeTruthy();
    });
    it('should dispatch action "create" with result from fetch Product API', () => {
        const mockResponse = undefined;
        const generator = fetchProductsSaga();

        expect(generator.next().value).toEqual(put({type: LOAD_REQUEST}));
        expect(generator.next().value.type).toEqual("CALL");
        expect(generator.next(mockResponse).value).toEqual(put({type: LOAD_SUCCESS, payload: undefined}));
        expect(generator.next().done).toBeTruthy()
    })
});
