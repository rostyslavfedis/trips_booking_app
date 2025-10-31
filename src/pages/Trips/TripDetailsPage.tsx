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
import {
    doc,
    getDoc,
    deleteDoc,
    collection,
    query,
    where,
    orderBy,
    getDocs,
    addDoc,
    updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseInit";
import { useAppSelector } from "../../hooks/reduxHooks";
import { Place } from "../../types";
import { PlaceForm } from "../../components/places/PlaceForm";
import { PlaceList } from "../../components/places/PlaceList";
import {validateEmail} from "../../utils/validators";

const TripDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [trip, setTrip] = useState<any>(null);
    const [places, setPlaces] = useState<Place[]>([]);
    const [loading, setLoading] = useState(true);
    const [formVisible, setFormVisible] = useState(false);
    const [editingPlace, setEditingPlace] = useState<Place | null>(null);
    const [inviteEmail, setInviteEmail] = useState("");
    const [inviteError, setInviteError] = useState("");
    const [inviteSuccess, setInviteSuccess] = useState("");

    const user = useAppSelector((state) => state.auth.user);
    const navigate = useNavigate();

    const isOwner = user && trip && trip.ownerId === user.uid;
    const isCollaborator = user && trip?.collaborators?.includes(user.uid);

    // 🔹 Завантаження подорожі
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

    // 🔹 Завантаження місць
    useEffect(() => {
        const fetchPlaces = async () => {
            if (!id) return;
            const q = query(
                collection(db, "places"),
                where("tripId", "==", id),
                orderBy("dayNumber", "asc")
            );
            const snap = await getDocs(q);
            const data = snap.docs.map((d) => ({ id: d.id, ...d.data() })) as Place[];
            setPlaces(data);
        };
        fetchPlaces();
    }, [id]);

    const handleSubmitPlace = async (data: any) => {
        if (!id || !user) return;

        if (editingPlace) {
            await updateDoc(doc(db, "places", editingPlace.id), data);
            setPlaces((prev) =>
                prev.map((p) => (p.id === editingPlace.id ? { ...p, ...data } : p))
            );
        } else {
            const newPlace = {
                tripId: id,
                createdBy: user.uid,
                ...data,
            };
            const docRef = await addDoc(collection(db, "places"), newPlace);
            setPlaces((prev) => [...prev, { id: docRef.id, ...newPlace }]);
        }

        setFormVisible(false);
        setEditingPlace(null);
    };

    const handleSendInvite = () => {
        if (!inviteEmail.trim()) {
            setInviteError("Email cannot be empty");
            return;
        }

        if (!validateEmail(inviteEmail)) {
            setInviteError("Invalid email format");
            return;
        }

        if (inviteEmail === user?.email) {
            setInviteError("You cannot invite yourself");
            return;
        }

        if (trip?.collaborators?.includes(inviteEmail)) {
            setInviteError("This user is already a collaborator");
            return;
        }

        console.log(`Invite sent to: ${inviteEmail}`);
        setInviteSuccess(`Invitation sent to ${inviteEmail}`);
        setInviteEmail("");
        setInviteError("");
    };

    const handleDeletePlace = async (id: string) => {
        await deleteDoc(doc(db, "places", id));
        setPlaces((prev) => prev.filter((p) => p.id !== id));
    };

    if (loading) return <CircularProgress />;
    if (!trip) return <Typography>Trip not found</Typography>;

    return (
        <Paper sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom>
                {trip.title}
            </Typography>

            {trip.description && (
                <Typography sx={{ mb: 2 }}>{trip.description}</Typography>
            )}

            <Divider sx={{ my: 2 }} />

            {trip.startDate && trip.endDate && (
                <Typography color="text.secondary">
                    {trip.startDate} — {trip.endDate}
                </Typography>
            )}

            {(isOwner || isCollaborator) && (
                <>
                    <Divider sx={{ my: 3 }} />
                    <Typography variant="h5" sx={{ mb: 2 }}>
                       Places to visit
                    </Typography>

                    {formVisible ? (
                        <PlaceForm
                            tripId={trip.id}
                            initialData={editingPlace || undefined}
                            onSubmit={handleSubmitPlace}
                            onCancel={() => {
                                setFormVisible(false);
                                setEditingPlace(null);
                            }}
                        />
                    ) : (
                        <Button
                            variant="contained"
                            sx={{ mb: 3 }}
                            onClick={() => setFormVisible(true)}
                        >
                            Add place
                        </Button>
                    )}

                    <PlaceList
                        places={places}
                        onEdit={(place) => {
                            setEditingPlace(place);
                            setFormVisible(true);
                        }}
                        onDelete={handleDeletePlace}
                    />
                </>
            )}

            {isOwner && (
                <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
                    <Button
                        variant="contained"
                        component={Link}
                        to={`/trips/${trip.id}/edit`}
                    >
                        Edit trip
                    </Button>
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={async () => {
                            await deleteDoc(doc(db, "trips", trip.id));
                            navigate("/trips");
                        }}
                    >
                        Delete trip
                    </Button>
                </Box>
            )}

    {isOwner && (
        <Box sx={{ mt: 3, p: 2, border: "1px solid #ddd", borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
                Share with collaborators
            </Typography>
            <Box display="flex" gap={1} alignItems="center">
                <input
                    type="email"
                    placeholder="Email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    style={{ flex: 1, padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                />
                <Button variant="contained" onClick={handleSendInvite}>
                    Send Invite
                </Button>
            </Box>
            {inviteError && (
                <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                    {inviteError}
                </Typography>
            )}
            {inviteSuccess && (
                <Typography color="success.main" variant="body2" sx={{ mt: 1 }}>
                    {inviteSuccess}
                </Typography>
            )}
        </Box>
    )}
        </Paper>
    );
};

export default TripDetailsPage;
