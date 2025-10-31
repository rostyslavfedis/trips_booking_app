import {createSlice} from "@reduxjs/toolkit";
import {
    fetchPlaces,
    addPlace,
    updatePlace,
    deletePlace,
} from "./placesThunks";
import {Place} from "../../types";

interface PlacesState {
    items: Place[];
    loading: boolean;
    error: string | null;
}

const initialState: PlacesState = {
    items: [],
    loading: false,
    error: null,
};

const placesSlice = createSlice({
    name: "places",
    initialState,
    reducers: {
        clearPlaces: (state) => {
            state.items = [];
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // 🔹 FETCH
            .addCase(fetchPlaces.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPlaces.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchPlaces.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // 🔹 ADD
            .addCase(addPlace.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })

            // 🔹 UPDATE
            .addCase(updatePlace.fulfilled, (state, action) => {
                const {id, data} = action.payload;
                const index = state.items.findIndex((p) => p.id === id);
                if (index !== -1) {
                    state.items[index] = {...state.items[index], ...data};
                }
            })

            // 🔹 DELETE
            .addCase(deletePlace.fulfilled, (state, action) => {
                state.items = state.items.filter((p) => p.id !== action.payload);
            });
    },
});

export const {clearPlaces} = placesSlice.actions;
export default placesSlice.reducer;
