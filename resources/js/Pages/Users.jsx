import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    IconButton,
    MenuItem,
    Select,
    Stack,
    Typography,
    TextField,
    Switch,
    InputLabel,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Toolbar from "@mui/material/Toolbar";
import Topbar from "@/Layouts/NavBar";
import SearchIcon from "@mui/icons-material/Search";
import { Head } from "@inertiajs/react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

const columns = [
    { id: "id", label: "ID", minWidth: 8 },
    { id: "name", label: "Name", minWidth: 170 },
    { id: "email", label: "Email", minWidth: 120 },
    { id: "role", label: "Vai Trò", minWidth: 100 },
    { id: "status", label: "Trạng thái người dùng", minWidth: 100 },
    { id: "action", label: "Thao Tác", minWidth: 100 },
];

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#69696933",
    marginRight: theme.spacing(2),
    marginLeft: 0,
    [theme.breakpoints.up("sm")]: {
        width: "fit-content",
    },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "30ch",
        },
    },
}));

const Users = ({ auth }) => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [reload, setReload] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [formData, setFormData] = useState({
        id: null,
        name: "",
        email: "",
        password: "",
        status: true,
        role: "user",
    });
    const label = { inputProps: { "aria-label": "Size switch demo" } };

    const handleDialogOpen = (user = null) => {
        setFormData(
            user || {
                id: null,
                name: "",
                email: "",
                password: "",
                status: true,
                role: "user",
            }
        );
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSearchChange = (event) => {
        const searchInput = event.target.value;
        setSearchTerm(searchInput);
    };

    const handleSubmitUser = () => {
        const userData = {
            ...formData,
            // Chuyển đổi 'status' trước khi gửi dữ liệu
            status: formData.status ? "active" : "inactive",
        };

        const apiURL = formData.id
            ? `https://api.maychu.dev/MstarCorp2/public/api/users/update/${formData.id}`
            : "https://api.maychu.dev/MstarCorp2/public/api/users/create";

        const method = formData.id ? axios.put : axios.post;

        method(apiURL, userData, {
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                console.log(
                    formData.id
                        ? "User updated successfully"
                        : "User added successfully",
                    response.data
                );
                handleDialogClose();
                setReload(!reload);
            })
            .catch((error) => {
                console.error("Error processing user:", error);
            });
    };

    const handleDeleteUser = (userId) => {
        axios
            .delete(
                `https://api.maychu.dev/MstarCorp2/public/api/users/delete/${userId}`
            )
            .then(() => {
                console.log("User deleted successfully");
                setReload(!reload);
            })
            .catch((error) => {
                console.error("Error deleting user:", error);
            });
    };

    const handleEditClick = (userId) => {
        axios
            .get(
                `https://api.maychu.dev/MstarCorp2/public/api/users/find/${userId}`
            )
            .then((response) => {
                const userData = response.data.data;
                handleDialogOpen({
                    id: userData.id,
                    name: userData.name,
                    email: userData.email,
                    status: userData.status === "active",
                    role: userData.role,
                });
            })
            .catch((error) => {
                console.error("Error fetching user details:", error);
            });
    };
    const handleSwitchChange = (event, promptId) => {
        const checked = event.target.checked;
        console.log(promptId);
        const promptData = {
            // Chuyển đổi 'status' trước khi gửi dữ liệu
            id: promptId,
            status: checked ? "active" : "inactive",
        };

        const apiURL = `https://api.maychu.dev/MstarCorp2/public/api/users/update/${promptId}`;

        const method = axios.put;

        method(apiURL, promptData, {
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                console.log("Users updated successfully", response.data);
            })
            .catch((error) => {
                console.error("Error processing Users:", error);
            });
    };
    useEffect(() => {
        axios
            .get("https://api.maychu.dev/MstarCorp2/public/api/users/list")
            .then((response) => {
                setUsers(response.data.data);
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
            });
    }, [reload]);

    return (
        <>
            <Dialog
                open={dialogOpen}
                onClose={handleDialogClose}
                style={{ textAlign: "center" }}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>
                    {formData.id
                        ? "Thay đổi thông tin Người Dùng"
                        : "Thêm Người Dùng"}
                    <IconButton
                        onClick={handleDialogClose}
                        style={{ float: "right" }}
                    >
                        <CloseIcon color="primary" />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Stack spacing={2} margin={2}>
                        <TextField
                            required
                            id="name"
                            name="name"
                            label="Họ và Tên"
                            variant="outlined"
                            value={formData.name}
                            onChange={handleFormChange}
                        />
                        <TextField
                            required
                            id="email"
                            name="email"
                            label="Email"
                            variant="outlined"
                            value={formData.email}
                            onChange={handleFormChange}
                        />
                        <TextField
                            id="password"
                            name="password"
                            label="Mật Khẩu"
                            type="password"
                            variant="outlined"
                            value={formData.password}
                            onChange={handleFormChange}
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    name="status"
                                    id="status"
                                    checked={formData.status}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            status: e.target.checked,
                                        })
                                    }
                                />
                            }
                            label="Trạng Thái Người Dùng"
                        />
                        <FormControl fullWidth>
                            <InputLabel id="role-label">Vai Trò</InputLabel>
                            <Select
                                labelId="role-label"
                                id="role"
                                name="role"
                                value={formData.role}
                                label="Vai Trò"
                                onChange={handleFormChange}
                            >
                                <MenuItem value="user">Người Dùng</MenuItem>
                                <MenuItem value="admin">Administrator</MenuItem>
                                <MenuItem value="developers">Kỹ Thuật</MenuItem>
                            </Select>
                        </FormControl>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={handleSubmitUser}
                        >
                            {formData.id
                                ? "Cập nhật Người Dùng"
                                : "Tạo Người Dùng"}
                        </Button>
                    </Stack>
                </DialogContent>
            </Dialog>
            <Head title="Quản Lí Người Dùng" />
            <Topbar user={auth.user}>
                <Paper sx={{ width: "100%", overflow: "hidden" }}>
                    <Typography
                        variant="poster"
                        component="div"
                        sx={{ padding: 2, fontWeight: "bold" }}
                    >
                        Quản lý Người Dùng
                    </Typography>
                    <Typography sx={{ marginBottom: 3 }}>
                        <Toolbar sx={{ display: "flow" }}>
                            <Typography
                                sx={{
                                    fontWeight: "bold",
                                    fontSize: 14,
                                    marginBottom: 1,
                                }}
                            >
                                Tìm kiếm nhanh
                            </Typography>
                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Nội dung bạn muốn tìm…"
                                    inputProps={{ "aria-label": "search" }}
                                    onChange={handleSearchChange}
                                    value={searchTerm}
                                    sx={{ fontSize: 13 }}
                                />
                            </Search>
                        </Toolbar>
                    </Typography>
                    <Button
                        onClick={() => handleDialogOpen()}
                        startIcon={<AddIcon />}
                        style={{ float: "right" }}
                    >
                        Thêm Người dùng
                    </Button>
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{
                                                minWidth: column.minWidth,
                                            }}
                                            sx={{ fontWeight: "bold" }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users
                                    .slice(
                                        page * rowsPerPage,
                                        page * rowsPerPage + rowsPerPage
                                    )
                                    .filter((item) => {
                                        return searchTerm.toLowerCase() === ""
                                            ? item
                                            : item.name
                                                  .toLowerCase()
                                                  .includes(searchTerm);
                                    })
                                    .map((row) => (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={row.id}
                                        >
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                if (column.id === "action") {
                                                    return (
                                                        <TableCell
                                                            key={column.id}
                                                            align={column.align}
                                                        >
                                                            <Stack
                                                                direction="row"
                                                                spacing={1}
                                                            >
                                                                <IconButton
                                                                    aria-label="edit"
                                                                    onClick={() =>
                                                                        handleEditClick(
                                                                            row.id
                                                                        )
                                                                    }
                                                                >
                                                                    <EditIcon />
                                                                </IconButton>
                                                                <IconButton
                                                                    aria-label="delete"
                                                                    onClick={() =>
                                                                        handleDeleteUser(
                                                                            row.id
                                                                        )
                                                                    }
                                                                >
                                                                    <DeleteIcon />
                                                                </IconButton>
                                                            </Stack>
                                                        </TableCell>
                                                    );
                                                } else if (
                                                    column.id === "status"
                                                ) {
                                                    return (
                                                        <TableCell
                                                            key={column.id}
                                                            align={column.align}
                                                        >
                                                            <Switch
                                                                onChange={(
                                                                    event
                                                                ) =>
                                                                    handleSwitchChange(
                                                                        event,
                                                                        row.id
                                                                    )
                                                                }
                                                                {...label}
                                                                defaultChecked={
                                                                    value ===
                                                                    "active"
                                                                        ? true
                                                                        : false
                                                                }
                                                            />
                                                        </TableCell>
                                                    );
                                                }

                                                return (
                                                    <TableCell
                                                        key={column.id}
                                                        align={column.align}
                                                    >
                                                        {value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 50, 75, 100]}
                        component="div"
                        count={users.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={(event, newPage) => setPage(newPage)}
                        onRowsPerPageChange={(event) => {
                            setRowsPerPage(+event.target.value);
                            setPage(0);
                        }}
                    />
                </Paper>
            </Topbar>
        </>
    );
};

export default Users;
