import React from "react";
import {Card, CardContent, CardActions, Typography, Button, Box} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../hooks/reduxHooks";
import {Trip} from "../types";

interface Props {
    trip: Trip;
    onDelete?: (id: string) => void;
}

const TripCard: React.FC<Props> = ({trip, onDelete}) => {
    const navigate = useNavigate();
    const user = useAppSelector((s) => s.auth.user);
    const isOwner = user?.uid === trip.ownerId;

    return (
        <Card
            sx={{
                p: 2,
                borderRadius: 3,
                boxShadow: 2,
                transition: "0.3s",
                "&:hover": {transform: "scale(1.02)"},
            }}
        >
            <CardContent>
                <Typography variant="h6" sx={{fontWeight: 600}}>
                    {trip.title}
                </Typography>
                {trip.description && (
                    <Typography variant="body2" sx={{mt: 1, color: "text.secondary"}}>
                        {trip.description}
                    </Typography>
                )}
                <Box sx={{mt: 1}}>
                    {trip.startDate && trip.endDate && (
                        <Typography variant="caption" color="text.secondary">
                            {trip.startDate} → {trip.endDate}
                        </Typography>
                    )}
                </Box>
            </CardContent>
            <CardActions>
                <Button onClick={() => navigate(`/trips/${trip.id}`)}>Details</Button>
                {isOwner && (
                    <>
                        <Button color="primary" onClick={() => navigate(`/trips/${trip.id}/edit`)}>
                            Edit
                        </Button>
                        <Button color="error" onClick={() => trip.id && onDelete?.(trip.id)}>
                            Delete
                        </Button>
                    </>
                )}
            </CardActions>
        </Card>
    );
};

export default TripCard;
