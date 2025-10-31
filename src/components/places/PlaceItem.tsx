import React from "react";
import {
    Card,
    CardContent,
    Typography,
    Button,
    Box,
} from "@mui/material";
import {Place} from "../../types";

interface Props {
    place: Place;
    onEdit: (place: Place) => void;
    onDelete: (id: string) => void;
}

export const PlaceItem: React.FC<Props> = ({place, onEdit, onDelete}) => {
    return (
        <Card
            variant="outlined"
            sx={{
                borderRadius: 3,
                mb: 2,
                transition: "0.3s",
                "&:hover": {
                    boxShadow: 4,
                    transform: "translateY(-2px)",
                },
            }}
        >
            <CardContent>
                <Typography variant="h6" fontWeight="600" gutterBottom>
                    Day {place.dayNumber}: {place.locationName}
                </Typography>

                {place.notes && (
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{mb: 2}}
                    >
                        {place.notes}
                    </Typography>
                )}

                <Box display="flex" gap={1}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => onEdit(place)}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => onDelete(place.id)}
                    >
                        Delete
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};
