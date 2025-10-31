import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase/firebaseInit";
import {
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    updateDoc,
    doc,
    query,
    where,
    orderBy,
} from "firebase/firestore";
import {Place} from "../../types";

export const fetchPlaces = createAsyncThunk("places/fetchPlaces", async (tripId: string) => {
    const q = query(
        collection(db, "places"),
        where("tripId", "==", tripId),
        orderBy("dayNumber", "asc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Place[];
});

export const addPlace = createAsyncThunk(
    "places/addPlace",
    async (place: Omit<Place, "id">) => {
        const docRef = await addDoc(collection(db, "places"), place);
        return { id: docRef.id, ...place };
    }
);

export const updatePlace = createAsyncThunk("places/updatePlace", async (place: any) => {
    const placeRef = doc(db, "places", place.id);
    await updateDoc(placeRef, place);
    return place;
});

export const deletePlace = createAsyncThunk("places/deletePlace", async (id: string) => {
    await deleteDoc(doc(db, "places", id));
    return id;
});
