import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase/firebaseInit";
import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    updateDoc,
    query,
    where,
    orderBy,
} from "firebase/firestore";
import {Place, PlacesState} from "../../types";

const initialState: PlacesState = {
    places: [],
    loading: false,
    error: null,
};

export const fetchPlaces = createAsyncThunk(
    "places/fetchPlaces",
    async (tripId: string) => {
        const q = query(
            collection(db, "places"),
            where("tripId", "==", tripId),
            orderBy("dayNumber", "asc")
        );
        const snapshot = await getDocs(q);
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Place[];
    }
);

export const addPlace = createAsyncThunk(
    "places/addPlace",
    async (place: Omit<Place, "id">) => {
        const docRef = await addDoc(collection(db, "places"), place);
        return { id: docRef.id, ...place };
    }
);

export const updatePlace = createAsyncThunk(
    "places/updatePlace",
    async (place: Place | any) => {
        const placeRef = doc(db, "places", place.id);
        await updateDoc(placeRef, place);
        return place;
    }
);

export const deletePlace = createAsyncThunk(
    "places/deletePlace",
    async (id: string) => {
        await deleteDoc(doc(db, "places", id));
        return id;
    }
);

const placesSlice = createSlice({
    name: "places",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPlaces.fulfilled, (state, action) => {
                state.places = action.payload;
            })
            .addCase(addPlace.fulfilled, (state, action) => {
                state.places.push(action.payload);
            })
            .addCase(updatePlace.fulfilled, (state, action) => {
                const index = state.places.findIndex((p) => p.id === action.payload.id);
                if (index !== -1) state.places[index] = action.payload;
            })
            .addCase(deletePlace.fulfilled, (state, action) => {
                state.places = state.places.filter((p) => p.id !== action.payload);
            });
    },
});

export default placesSlice.reducer;
