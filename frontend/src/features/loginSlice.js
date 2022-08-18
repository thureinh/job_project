import { createSlice } from '@reduxjs/toolkit';
import axios from '../app/connector';

const initialState = {
    sent: false,
    user: localStorage.getItem('user-info') || {},
    status: '',
};

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setStatus: (state, action) => {
            state.status = action.payload;
        },
        setSent: (state, action) => {
            state.sent = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        clearUser: (state) => {
            localStorage.removeItem('user-info');
            state.user = {};
        }
    },
});

export const selectSent = (state) => state.login.sent;
export const selectUser = (state) => state.login.user;
export const selectStatus = (state) => state.login.status;

export const { setStatus, setSent, setUser, clearUser } = loginSlice.actions;

export const loginAsync = (userObj) => async (dispatch) => {
    dispatch(setSent(true));
    await axios.get('/sanctum/csrf-cookie').then(async () => {
        await axios.post('/login', userObj)
            .then(response => {
                localStorage.setItem('user-info', response.data);
                dispatch(setUser(response.data));
            })
            .catch(error => {
                if (error.response.status === 401) {
                    dispatch(setStatus('failed'));
                    dispatch(clearUser());
                }
            });
    })
    dispatch(setSent(false));
};

export const logoutAsync = () => async (dispatch) => {
    await axios.get('/sanctum/csrf-cookie').then(async rest => {
        await axios.post('/logout');
        dispatch(clearUser());
    })
}

export default loginSlice.reducer;