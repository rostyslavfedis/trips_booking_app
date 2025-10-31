// src/features/auth/Login.tsx
import React, { useState } from "react";
import { Button, TextField, Typography, Box, Paper, CircularProgress, Link } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { loginUser } from "../../features/auth/authThunk";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { loading, error } = useAppSelector((s) => s.auth);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) return;
        const res = await dispatch(loginUser({ email, password }));
        if (loginUser.fulfilled.match(res)) navigate("/trips");
    };

    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", bgcolor: "#f9f9f9" }}>
            <Paper sx={{
                p: 4,
                width: "100%",
                maxWidth: 400,
                display: "flex",
                flexDirection: "column",
                gap: 2
            }}>
                <Typography variant="h5" align="center" mb={3}>
                    Вхід у систему
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
                        {loading ? <CircularProgress size={24} /> : "Увійти"}
                    </Button>

                    <Typography variant="body2" align="center">
                        Немає акаунта?{" "}
                        <Link onClick={() => navigate("/register")} sx={{ cursor: "pointer" }}>
                            Зареєструватися
                        </Link>
                    </Typography>
                </form>
            </Paper>
        </Box>
    );
};

export default Login;
