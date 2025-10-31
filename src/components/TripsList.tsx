import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { fetchUserTrips } from "../features/trips/tripsThunks";
import { useNavigate } from "react-router-dom";

export const TripsList: React.FC = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(s => s.auth.user);
    const trips = useAppSelector(s => s.trips.items);
    const status = useAppSelector(s => s.trips.status);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) dispatch(fetchUserTrips(user.uid));
    }, [dispatch, user]);

    return (
        <div>
            <h2>Мої подорожі</h2>
            {status === "loading" && <p>Завантаження...</p>}
            <button onClick={() => navigate("/trips/new")}>Створити подорож</button>
            <ul>
                {trips.map(t => (
                    <li key={t.id}>
                        <strong>{t.title}</strong> {t.startDate && `| ${t.startDate}`}{" "}
                        <button onClick={() => navigate(`/trips/${t.id}`)}>Деталі</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
