import { createSlice } from '@reduxjs/toolkit';
import axios from '../app/connector';

const initialState = {
    routes: [],
    loading: false,
    data: [],
    pageInfo: {},
};

export const routeSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setRoutes: (state, action) => {
            state.routes = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setData: (state, action) => {
            state.data = action.payload;
        },
        setPageInfo: (state, action) => {
            state.pageInfo = action.payload;
        }
    }
});

export const { setRoutes, setLoading, setData, setPageInfo } = routeSlice.actions;

export const showRoutes = (params) => async (dispatch) => {
    dispatch(setLoading(true));
    const resp = await axios.get('/api/routes', { params });
    dispatch(setData(resp.data.data));
    dispatch(setPageInfo(resp.data.meta));
    dispatch(setLoading(false));
};

export const storeRoute = (data) => async (dispatch) => {
    dispatch(setLoading(true));
    const promise = new Promise(resolve => {
        resolve(axios.post('/api/routes', data));
    });
    promise.then(response => {
        dispatch(setRoutes, response.data);
        dispatch(setLoading(false));
    });
    return promise;
};

export default routeSlice.reducer;