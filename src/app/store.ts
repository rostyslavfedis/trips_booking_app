import {configureStore} from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import tripsReducer from "../features/trips/tripsSlice";
import placesReducer from "../features/places/placesSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        trips: tripsReducer,
        places: placesReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
