import React from "react";
import { Box } from "@mui/material";
import PlaceItem from "./PlaceItem";
import {Place} from "../../types";


interface PlaceListProps {
    places: Place[];
    onEdit: (place: Place) => void;
    onDelete: (id: string) => void;
    canEdit: boolean;
}

const PlaceList: React.FC<PlaceListProps> = ({ places, onEdit, onDelete, canEdit }) => {
    return (
        <Box sx={{ mt: 3 }}>
            {places.map((place) => (
                <PlaceItem
                    key={place.id}
                    place={place}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    canEdit={canEdit}
                />
            ))}
        </Box>
    );
};

export default PlaceList;
