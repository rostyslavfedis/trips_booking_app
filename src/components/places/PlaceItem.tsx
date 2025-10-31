import React from "react";
import { Card, CardContent, Typography, IconButton, Box, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {Place} from "../../types";

interface PlaceItemProps {
    place: Place;
    onEdit: (place: Place) => void;
    onDelete: (id: string) => void;
    canEdit: boolean;
}

const PlaceItem: React.FC<PlaceItemProps> = ({ place, onEdit, onDelete, canEdit }) => {
    return (
        <Card sx={{ mb: 2, borderRadius: 3, boxShadow: 2 }}>
            <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box>
                    <Typography variant="h6">
                        Day {place.dayNumber}: {place.locationName}
                    </Typography>
                    {place.notes && (
                        <Typography variant="body2" color="text.secondary">
                            {place.notes}
                        </Typography>
                    )}
                </Box>

                {canEdit && (
                    <Box>
                        <Tooltip title="Edit">
                            <IconButton color="primary" onClick={() => onEdit(place)}>
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                            <IconButton color="error" onClick={() => onDelete(place.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
};

export default PlaceItem;
