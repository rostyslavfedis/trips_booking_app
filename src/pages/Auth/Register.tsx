// src/features/auth/Register.tsx
import React, { useState } from "react";
import { Button, TextField, Typography, Box, Paper, CircularProgress, Link } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { registerUser } from "../../features/auth/authThunk";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { loading, error } = useAppSelector((s) => s.auth);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password || password !== confirm) return;
        const res = await dispatch(registerUser({ email, password }));
        if (registerUser.fulfilled.match(res)) navigate("/trips");
    };

    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", bgcolor: "#f9f9f9" }}>
            <Paper sx={{ p: 4, width: 360, boxShadow: 3, borderRadius: 3 }}>
                <Typography variant="h5" align="center" mb={3}>
                    Реєстрація
                </Typography>

                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Email"
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Пароль"
                        type="password"
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Підтвердити пароль"
                        type="password"
                        margin="normal"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                    />

                    {error && (
                        <Typography color="error" variant="body2" mt={1}>
                            {error}
                        </Typography>
                    )}

                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : "Зареєструватися"}
                    </Button>

                    <Typography variant="body2" align="center">
                        Вже маєте акаунт?{" "}
                        <Link onClick={() => navigate("/login")} sx={{ cursor: "pointer" }}>
                            Увійти
                        </Link>
                    </Typography>
                </form>
            </Paper>
        </Box>
    );
};

export default Register;
