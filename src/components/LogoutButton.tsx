import React from "react";
import {Button} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import {useAppDispatch} from "../hooks/reduxHooks";
import {useNavigate} from "react-router-dom";
import {logoutUser} from "../features/auth/authThunk";

const LogoutButton: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await dispatch(logoutUser());
        navigate("/login");
    };

    return (
        <Button
            variant="outlined"
            color="error"
            startIcon={<LogoutIcon/>}
            onClick={handleLogout}
            sx={{
                textTransform: "none",
                borderRadius: 2,
                fontWeight: 500,
                "&:hover": {backgroundColor: "#ffebee"},
            }}
        >
            Logout
        </Button>
    );
};

export default LogoutButton;
