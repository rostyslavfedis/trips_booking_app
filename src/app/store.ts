import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import tripsReducer from "../features/trips/tripsSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        trips: tripsReducer,
    },
    // middleware: (getDefault) => getDefault(), // додай якщо потрібно
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
