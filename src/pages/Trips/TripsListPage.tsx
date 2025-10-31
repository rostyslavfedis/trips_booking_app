import React, { useEffect } from "react";
import { Grid, Typography, CircularProgress, Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { fetchUserTrips, deleteTrip } from "../../features/trips/tripsThunks";
import TripCard from "../../components/TripCard";
import { useNavigate } from "react-router-dom";
import {Trip} from "../../types";


const TripsListPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { items, status } = useAppSelector((state) => state.trips);
    const user = useAppSelector((state) => state.auth.user);

    useEffect(() => {
        if (user?.uid) {
            dispatch(fetchUserTrips(user.uid));
        }
    }, [dispatch, user?.uid]);

    const handleDelete = (id: string) => {
        dispatch(deleteTrip(id));
    };

    if (status === "loading") return <CircularProgress />;

    return (
        <div>
            <Typography variant="h4" sx={{ mb: 2 }}>
                My Trips
            </Typography>

            <Button
                variant="contained"
                sx={{ mb: 2 }}
                onClick={() => navigate("/trips/new")}
            >
                Create Trip
            </Button>

            <Grid container spacing={2}>
                {items
                    .filter((trip): trip is Trip => !!trip.id) // Type Guard: залишаємо тільки ті з id
                    .map((trip) => (
                        <Grid
                            key={String(trip.id)} // перетворюємо id в string
                        >
                            <TripCard trip={trip} onDelete={handleDelete} />
                        </Grid>
                    ))}
            </Grid>
        </div>
    );
};

export default TripsListPage;