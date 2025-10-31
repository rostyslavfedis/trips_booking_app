import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { createTrip } from "../../features/trips/tripsThunks";
import { useNavigate } from "react-router-dom";

const TripCreatePage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useAppSelector((s) => s.auth.user);

    const today = new Date().toISOString().split("T")[0];

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (startDate && endDate && startDate > endDate) {
            setError("Start date cannot be later than end date");
            return;
        }
        if (!title.trim()) {
            setError("Title is required");
            return;
        }
        if (!description.trim()) {
            setError("Description is required");
            return;
        }
        setError("");
        await dispatch(
            createTrip({ title, description, startDate, endDate, ownerId: user?.uid || "" })
        );
        navigate("/trips");
    };

    return (
        <Box sx={{ maxWidth: 500, mx: "auto" }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
                Create a new trip
            </Typography>
            <TextField
                label="Title"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                sx={{ mb: 2 }}
            />
            <TextField
                label="Description"
                fullWidth
                multiline
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                sx={{ mb: 2 }}
            />
            <TextField
                label="Start Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                sx={{ mb: 2 }}
                inputProps={{ min: today }}
            />
            <TextField
                label="End Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                sx={{ mb: 2 }}
                inputProps={{ min: today }}
            />
            {error && (
                <Typography color="error" sx={{ mb: 2 }}>
                    {error}
                </Typography>
            )}
            <Button variant="contained" onClick={handleSubmit}>
                Save
            </Button>
        </Box>
    );
};

export default TripCreatePage;
