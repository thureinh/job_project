import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    me: {},
    status: 'Hello Redux',
}

export const asyncLogin = createAsyncThunk(
    'login/attempt',
    async () => {
        await axios.get('/sanctum/csrf-cookie')
        return {}
    }
)

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        changeStatus: (state, action) => {
            if (state.status !== initialState.status)
                state.status = initialState.status
            else
                state.status = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(asyncLogin.fulfilled, (state, action) => {
            state.status = JSON.stringify(action.payload)
        })
    },
})

export const selectStatus = (state) => state.login.status

export const { changeStatus } = loginSlice.actions

export default loginSlice.reducer