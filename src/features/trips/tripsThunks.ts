import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase/firebaseInit";
import {
    collection,
    query,
    where,
    getDocs,
    doc,
    updateDoc,
    deleteDoc,
    addDoc,
    serverTimestamp,
    getDoc,
} from "firebase/firestore";
import {Trip} from "../../types";

export const createTrip = createAsyncThunk(
    "trips/create",
    async (trip: Omit<Trip, "id" | "createdAt" | "updatedAt">) => {
        const newTrip = {
            ...trip,
            collaborators: trip.collaborators || [],
            createdAt: serverTimestamp(),
        };
        const ref = await addDoc(collection(db, "trips"), newTrip);
        const snap = await getDoc(ref);
        return { id: ref.id, ...(snap.data() as Omit<Trip, "id">) };
    }
);

export const fetchUserTrips = createAsyncThunk("trips/fetchUserTrips", async (uid: string) => {
    const tripsRef = collection(db, "trips");

    const qOwner = query(tripsRef, where("ownerId", "==", uid));
    const qCollab = query(tripsRef, where("collaborators", "array-contains", uid));

    const [ownerSnap, collabSnap] = await Promise.all([getDocs(qOwner), getDocs(qCollab)]);

    const trips: Trip[] = [];

    ownerSnap.forEach((d) => {
        const data = d.data() as Omit<Trip, "id">; // виключаємо id
        trips.push({ ...data, id: d.id }); // додаємо id останнім
    });

    collabSnap.forEach((d) => {
        const data = d.data() as Omit<Trip, "id">;
        if (!trips.some((t) => t.id === d.id)) {
            trips.push({ ...data, id: d.id });
        }
    });

    return trips;
});

export const updateTrip = createAsyncThunk(
    "trips/update",
    async ({ id, updates }: { id: string; updates: Partial<Trip> }) => {
        const ref = doc(db, "trips", id);
        await updateDoc(ref, { ...updates, updatedAt: serverTimestamp() });
        return { id, updates };
    }
);

export const deleteTrip = createAsyncThunk("trips/delete", async (id: string) => {
    await deleteDoc(doc(db, "trips", id));
    return id;
});