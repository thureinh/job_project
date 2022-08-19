import { createSlice } from '@reduxjs/toolkit';
import axios from '../app/connector';

const initialState = {
    selectedRoute: {
        from: {},
        to: {},
    },
    ticket: {},
    loading: false,
    data: [],
    pageInfo: {},
    paramsCache: {},
};

export const routeSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setSelectedRoute: (state, action) => {
            state.selectedRoute = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setData: (state, action) => {
            state.data = action.payload;
        },
        setPageInfo: (state, action) => {
            state.pageInfo = action.payload;
        },
        setTicket: (state, action) => {
            state.ticket = action.payload;
        },
        setParamsCache: (state, action) => {
            state.paramsCache = action.payload;
        }
    }
});

export const { setSelectedRoute, setLoading, setData, setPageInfo, setTicket, setParamsCache } = routeSlice.actions;

export const showRoutes = (params) => async (dispatch) => {
    dispatch(setLoading(true));
    const promise = await axios.get('/api/routes', { params });
    const response = promise.data;
    dispatch(setData(response.data));
    dispatch(setPageInfo(response.meta));
    dispatch(setLoading(false));
};

export const storeRoute = (data) => async (dispatch) => {
    dispatch(setLoading(true));
    const promise = new Promise(resolve => {
        resolve(axios.post('/api/routes', data));
    });
    promise.then(response => {
        dispatch(setData(response.data));
        dispatch(setLoading(false));
    });
    return promise;
};

export const getTicket = (data) => (dispatch) => {
    const promise = axios.post('/api/get-ticket', data);
    promise.then(response => {
        dispatch(setTicket(response.data));
    });
    return promise;
}

export default routeSlice.reducer;