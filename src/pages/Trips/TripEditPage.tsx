import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, TextField, Button, Paper, Typography } from "@mui/material";
import { db } from "../../firebase/firebaseInit";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useAppSelector } from "../../hooks/reduxHooks";

const TripEditPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.auth.user);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchTrip = async () => {
            if (!id) return;
            const docRef = doc(db, "trips", id);
            const snap = await getDoc(docRef);

            if (snap.exists()) {
                const data = snap.data();
                if (data.ownerId !== user?.uid) {
                    navigate("/trips");
                    return;
                }
                setTitle(data.title || "");
                setDescription(data.description || "");
                setStartDate(data.startDate || "");
                setEndDate(data.endDate || "");
            }
        };
        fetchTrip();
    }, [id, user, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
            setError("Start date cannot be later than end date");
            return;
        }

        const docRef = doc(db, "trips", id!);
        await updateDoc(docRef, {
            title,
            description,
            startDate,
            endDate,
        });

        navigate(`/trips/${id}`);
    };

    return (
        <Paper sx={{ p: 4, maxWidth: 600, mx: "auto" }}>
            <Typography variant="h5" mb={2}>
                Edit Trip
            </Typography>

            <form onSubmit={handleSubmit}>
                <TextField
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                    required
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    fullWidth
                    multiline
                    rows={3}
                    sx={{ mb: 2 }}
                />
                <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                    <TextField
                        type="date"
                        label="Start Date"
                        InputLabelProps={{ shrink: true }}
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        type="date"
                        label="End Date"
                        InputLabelProps={{ shrink: true }}
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        fullWidth
                    />
                </Box>

                {error && (
                    <Typography color="error" sx={{ mb: 2 }}>
                        {error}
                    </Typography>
                )}

                <Button type="submit" variant="contained" fullWidth>
                    Save Changes
                </Button>
            </form>
        </Paper>
    );
};

export default TripEditPage;
