import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const MySnackbar = ({ open, onClose, message, severity }) => {
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
            <MuiAlert
                elevation={6}
                variant="filled"
                onClose={onClose}
                severity={severity}
            >
                {message}
            </MuiAlert>
        </Snackbar>
    );
};

export default MySnackbar;
