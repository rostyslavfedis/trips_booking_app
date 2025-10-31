import React from "react";
import {AppBar, Toolbar, Typography, Button, Box} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import LogoutButton from "./LogoutButton";
import {useAppSelector} from "../hooks/reduxHooks";

const Navbar: React.FC = () => {
    const user = useAppSelector((state) => state.auth.user);
    const navigate = useNavigate();

    return (
        <AppBar
            position="sticky"
            color="transparent"
            elevation={1}
            sx={{mb: 3, borderBottom: "1px solid #e0e0e0"}}
        >
            <Toolbar
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 700,
                        cursor: "pointer",
                        color: "primary.main",
                    }}
                    onClick={() => navigate("/")}
                >
                    Travel Planner
                </Typography>

                <Box sx={{display: "flex", alignItems: "center", gap: 2}}>
                    <Button
                        component={Link}
                        to="/trips"
                        color="primary"
                        sx={{
                            fontWeight: 600,
                            textTransform: "none",
                            fontSize: "1rem",
                            "&:hover": {color: "primary.dark", transform: "scale(1.05)"},
                            transition: "0.2s",
                        }}
                    >
                        Trips
                    </Button>

                    {user && <LogoutButton/>}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
