import React, { useEffect } from "react";
import { Grid, Typography, CircularProgress, Tooltip, IconButton } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { fetchUserTrips, deleteTrip } from "../../features/trips/tripsThunks";
import TripCard from "../../components/TripCard";
import {Link, useNavigate } from "react-router-dom";
import {Trip} from "../../types";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import AddCircleIcon from "@mui/icons-material/AddCircle";


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
           < div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <Typography variant="h4" sx={{ fontWeight: 600, display: "flex", alignItems: "center", gap: 1 }}>
                <TravelExploreIcon color="primary" />
                My Trips
            </Typography>

            <Tooltip title="Create new trip">
                <IconButton
                    color="primary"
                    component={Link}
                    to="/trips/new"
                    sx={{ fontSize: 28 }}
                >
                    <AddCircleIcon fontSize="inherit" />
                </IconButton>
            </Tooltip>
           </div>
            <Grid container spacing={2}>
                {items
                    .filter((trip): trip is Trip => !!trip.id)
                    .map((trip) => (
                        <Grid
                            key={String(trip.id)}
                        >
                            <TripCard trip={trip} onDelete={handleDelete} />
                        </Grid>
                    ))}
            </Grid>
        </div>
    );
};

export default TripsListPage;