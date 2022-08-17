import { createSlice } from '@reduxjs/toolkit';
import axios from '../app/connector';

const initialState = {
    sent: false,
    user: {}
};

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        toggleSent: (state) => {
            state.sent = !state.sent;
        },
        setSent: (state, action) => {
            state.sent = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        clearUser: (state) => {
            state.user = {};
        }
    },
});

export const selectSent = (state) => state.login.sent;
export const selectUser = (state) => state.login.user;

export const { toggleSent, setSent, setUser, clearUser } = loginSlice.actions;

export const loginAsync = (userObj) => async (dispatch) => {
    dispatch(setSent(true));
    await axios.get('/sanctum/csrf-cookie').then(async () => {
        await axios.post('/login', userObj)
            .then(response => {
                dispatch(setUser(response.data));
            })
            .catch(error => {
                if (error.response.status === 401) {
                    dispatch(clearUser());
                }
            });
    })
    dispatch(setSent(false));
};

export default loginSlice.reducer;