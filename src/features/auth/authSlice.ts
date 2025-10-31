import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {loginUser, logoutUser, registerUser} from "./authThunk";

type User = { uid: string; email: string };
type AuthState = {
    user: User | null;
    loading: boolean;
    error: string | null;
};

const initialState: AuthState = { user: null, loading: false, error: null };

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User | null>) {
            state.user = action.payload;
        },
        logout(state) {
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(logoutUser.fulfilled, (state) => {
            state.user = null;
        });
    },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
