import {createAsyncThunk} from "@reduxjs/toolkit";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../firebase/firebaseInit";
import {signOut} from "firebase/auth";

export const registerUser = createAsyncThunk(
    "auth/register",
    async ({email, password}: { email: string; password: string }, {rejectWithValue}) => {
        try {
            const userCred = await createUserWithEmailAndPassword(auth, email, password);
            return {uid: userCred.user.uid, email: userCred.user.email!};
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

export const loginUser = createAsyncThunk(
    "auth/login",
    async ({email, password}: { email: string; password: string }, {rejectWithValue}) => {
        try {
            const userCred = await signInWithEmailAndPassword(auth, email, password);
            return {uid: userCred.user.uid, email: userCred.user.email!};
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
    await signOut(auth);
    return null;
});
