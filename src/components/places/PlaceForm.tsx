import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";

interface PlaceFormProps {
    onSubmit: (data: { locationName: string; notes?: string; dayNumber: number }) => void;
}

const PlaceForm: React.FC<PlaceFormProps> = ({ onSubmit }) => {
    const [locationName, setLocationName] = useState("");
    const [notes, setNotes] = useState("");
    const [dayNumber, setDayNumber] = useState<number>(1);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (dayNumber < 1) return alert("Day number must be at least 1");
        onSubmit({ locationName, notes, dayNumber });
        setLocationName("");
        setNotes("");
        setDayNumber(1);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 2 }}>
            <TextField
                label="Location"
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                required
            />
            <TextField
                label="Notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
            />
            <TextField
                label="Day"
                type="number"
                value={dayNumber}
                onChange={(e) => setDayNumber(Number(e.target.value))}
                inputProps={{ min: 1 }}
                required
            />
            <Button type="submit" variant="contained">
                Add Place
            </Button>
        </Box>
    );
};

export default PlaceForm;
