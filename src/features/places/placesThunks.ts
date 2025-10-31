import {createAsyncThunk} from "@reduxjs/toolkit";
import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    getDocs,
    query,
    where,
    orderBy,
} from "firebase/firestore";
import {db} from "../../firebase/firebaseInit";
import {NewPlace, Place} from "../../types";
import {auth} from "../../firebase/firebaseInit";


export const fetchPlaces = createAsyncThunk<Place[], string>(
    "places/fetchPlaces",
    async (tripId, {rejectWithValue}) => {
        try {
            const q = query(
                collection(db, "places"),
                where("tripId", "==", tripId),
                orderBy("dayNumber", "asc")
            );
            const snapshot = await getDocs(q);
            return snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as Place[];
        } catch (error) {
            console.error("Error fetching places:", error);
            return rejectWithValue("Failed to fetch places");
        }
    }
);

// 🟢 Додати нове місце
export const addPlace = createAsyncThunk<Place, NewPlace>(
    "places/addPlace",
    async (newPlace, {rejectWithValue}) => {
        try {
            const user = auth.currentUser;
            if (!user) throw new Error("Unauthorized");

            const docRef = await addDoc(collection(db, "places"), {
                ...newPlace,
                createdBy: user.uid,
            });

            return {id: docRef.id, createdBy: user.uid, ...newPlace};
        } catch (error) {
            console.error("Error adding place:", error);
            return rejectWithValue("Failed to add place");
        }
    }
);

// 🟡 Оновити місце
export const updatePlace = createAsyncThunk<
    { id: string; data: Partial<Place> },
    { id: string; data: Partial<Place> }
>("places/updatePlace", async ({id, data}, {rejectWithValue}) => {
    try {
        const ref = doc(db, "places", id);
        await updateDoc(ref, data);
        return {id, data};
    } catch (error) {
        console.error("Error updating place:", error);
        return rejectWithValue("Failed to update place");
    }
});

// 🔴 Видалити місце
export const deletePlace = createAsyncThunk<string, string>(
    "places/deletePlace",
    async (id, {rejectWithValue}) => {
        try {
            await deleteDoc(doc(db, "places", id));
            return id;
        } catch (error) {
            console.error("Error deleting place:", error);
            return rejectWithValue("Failed to delete place");
        }
    }
);
