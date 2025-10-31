import { createSlice } from "@reduxjs/toolkit";
import { createTrip, fetchUserTrips, updateTrip, deleteTrip } from "./tripsThunks";
import {Trip} from "../../types";

interface TripsState {
    items: Trip[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: TripsState = {
    items: [],
    status: "idle",
    error: null,
};

const tripsSlice = createSlice({
    name: "trips",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserTrips.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchUserTrips.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload;
            })
            .addCase(fetchUserTrips.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message ?? null;
            })
            .addCase(createTrip.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(updateTrip.fulfilled, (state, action) => {
                const index = state.items.findIndex((t) => t.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = { ...state.items[index], ...action.payload.updates };
                }
            })
            .addCase(deleteTrip.fulfilled, (state, action) => {
                state.items = state.items.filter((t) => t.id !== action.payload);
            });
    },
});

export default tripsSlice.reducer;
