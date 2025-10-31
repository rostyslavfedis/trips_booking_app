import React, {useState, useEffect} from "react";
import {
    TextField,
    Button,
    Box,
    Stack,
    Paper,
    Typography,
} from "@mui/material";
import {NewPlace, Place} from "../../types";

interface Props {
    initialData?: Place;
    onSubmit: (data: NewPlace | Place) => void;
    onCancel: () => void;
    tripId: string;
}

export const PlaceForm: React.FC<Props> = ({
                                               initialData,
                                               onSubmit,
                                               onCancel,
                                               tripId,
                                           }) => {
    const [formData, setFormData] = useState<NewPlace>({
        tripId,
        locationName: "",
        notes: "",
        dayNumber: 1,
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                tripId: initialData.tripId,
                locationName: initialData.locationName,
                notes: initialData.notes || "",
                dayNumber: initialData.dayNumber,
            });
        }
    }, [initialData]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "dayNumber" ? Number(value) : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <Paper
            elevation={3}
            sx={{
                p: 3,
                borderRadius: 3,
                maxWidth: 500,
                mx: "auto",
                mt: 2,
                mb: 2
            }}
        >
            <Typography variant="h6" fontWeight={600} gutterBottom>
                {initialData ? "Edit place" : "Add place"}
            </Typography>

            <Box component="form" onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    <TextField
                        label="Location Name"
                        name="locationName"
                        value={formData.locationName}
                        onChange={handleChange}
                        required
                        fullWidth
                    />
                    <TextField
                        label="Notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        multiline
                        rows={2}
                        fullWidth
                    />
                    <TextField
                        label="Day Number"
                        name="dayNumber"
                        type="number"
                        value={formData.dayNumber}
                        onChange={handleChange}
                        required
                        inputProps={{min: 1}}
                        fullWidth
                    />

                    <Box display="flex" justifyContent="flex-end" gap={2} mt={1}>
                        <Button variant="outlined" color="inherit" onClick={onCancel}>
                            Back
                        </Button>
                        <Button variant="contained" color="primary" type="submit">
                            {initialData ? "UPDATE" : "ADD"}
                        </Button>
                    </Box>
                </Stack>
            </Box>
        </Paper>
    );
};
