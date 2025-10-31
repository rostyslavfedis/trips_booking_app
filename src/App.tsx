import React, { JSX } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAppSelector } from "./hooks/reduxHooks";
import Navbar from "./components/Navbar";
import TripsListPage from "./pages/Trips/TripsListPage";
import TripCreatePage from "./pages/Trips/TripCreatePage";
import TripDetailsPage from "./pages/Trips/TripDetailsPage";
import TripEditPage from "./pages/Trips/TripEditPage";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";


const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const user = useAppSelector((state) => state.auth.user);
    return user ? children : <Navigate to="/login" replace />;
};

const App = () => {
    return (<>
            <Navbar />
            <div style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
                <Routes>
                    <Route path="/login" element={<Login/>} />
                    <Route path="/register" element={<Register/>} />

                    <Route
                        path="/trips"
                        element={
                            <ProtectedRoute>
                                <TripsListPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/trips/new"
                        element={
                            <ProtectedRoute>
                                <TripCreatePage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/trips/:id"
                        element={
                            <ProtectedRoute>
                                <TripDetailsPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/trips/:id/edit"
                        element={
                            <ProtectedRoute>
                                <TripEditPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/" element={<Navigate to="/trips" />} />
                    <Route path="*" element={<h2>404 — Page not found</h2>} />
                </Routes>
            </div>
        </>
    );
};

export default App;
