import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
    Box,
    Typography,
    Button,
    Paper,
    CircularProgress,
    Divider,
} from "@mui/material";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseInit";
import { useAppSelector } from "../../hooks/reduxHooks";

const TripDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [trip, setTrip] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const user = useAppSelector((state) => state.auth.user);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTrip = async () => {
            if (!id) return;
            const docRef = doc(db, "trips", id);
            const snap = await getDoc(docRef);
            if (snap.exists()) setTrip({ id: snap.id, ...snap.data() });
            setLoading(false);
        };
        fetchTrip();
    }, [id]);

    const handleDelete = async () => {
        if (!trip || !user || trip.ownerId !== user.uid) return;
        await deleteDoc(doc(db, "trips", trip.id));
        navigate("/trips");
    };

    if (loading) return <CircularProgress />;

    if (!trip) return <Typography>Trip not found</Typography>;

    const isOwner = user && trip.ownerId === user.uid;

    return (
        <Paper sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom>{trip.title}</Typography>
            {trip.description && (
                <Typography sx={{ mb: 2 }}>{trip.description}</Typography>
            )}
            <Divider sx={{ my: 2 }} />
            {trip.startDate && trip.endDate && (
                <Typography color="text.secondary">
                    {trip.startDate} — {trip.endDate}
                </Typography>
            )}

            {isOwner && (
                <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
                    <Button
                        variant="contained"
                        component={Link}
                        to={`/trips/${trip.id}/edit`}
                    >
                        Edit
                    </Button>
                    <Button variant="outlined" color="error" onClick={handleDelete}>
                        Delete
                    </Button>
                </Box>
            )}
        </Paper>
    );
};

export default TripDetailsPage;
