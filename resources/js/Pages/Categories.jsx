import * as React from "react";
import { useState, useEffect } from "react";
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
import Topbar from "@/Layouts/NavBar";
import { Head } from "@inertiajs/react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
// import FilterCategories from "../Components/Filter/FilterCategories";

const columns = [
    { id: "name", label: "Categories", minWidth: 600 },
    // { id: "color", label: "Màu sắc", minWidth: 120 },
    { id: "action", label: "Thao Tác", minWidth: 100 },
];

const Categories = ({ auth }) => {
    const [categories, setCategories] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [reload, setReload] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [formData, setFormData] = useState({
        id: null,
        name: "",
    });
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleDialogOpen = (Categories = null) => {
        setFormData(
            Categories || {
                id: null,
                name: "",
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
    const handleSubmit = () => {
        const modelData = {
            ...formData,
        };
        const apiURL = formData.id
            ? `https://api.maychu.dev/MstarCorp2/public/api/categories/update/${formData.id}`
            : "https://api.maychu.dev/MstarCorp2/public/api/categories/create";

        const method = formData.id ? axios.put : axios.post;

        method(apiURL, modelData, {
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                console.log(
                    formData.id
                        ? "Model updated successfully"
                        : "Model added successfully",
                    response.data
                );
                handleDialogClose();
                setReload(!reload);
            })
            .catch((error) => {
                console.error("Error processing model:", error);
            });
    };

    const handleDeleteModel = (modelId) => {
        axios
            .delete(
                `https://api.maychu.dev/MstarCorp2/public/api/categories/delete/${modelId}`
            )
            .then(() => {
                console.log("model deleted successfully");
                setReload(!reload);
            })
            .catch((error) => {
                console.error("Error deleting model:", error);
            });
    };
    const handleEditClick = (userId) => {
        axios
            .get(
                `https://api.maychu.dev/MstarCorp2/public/api/categories/find/${userId}`
            )
            .then((response) => {
                const modelData = response.data.data;
                handleDialogOpen({
                    id: modelData.id,
                    name: modelData.name,
                });
            })
            .catch((error) => {
                console.error("Error fetching user details:", error);
            });
    };
    useEffect(() => {
        fetch("https://api.maychu.dev/MstarCorp2/public/api/categories/list")
            .then((response) => response.json())
            .then((data) => {
                setCategories(data["data"]);
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
                    {formData.id ? "Thay đổi thông tin Model" : "Thêm Model"}
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
                            label="Tên Category"
                            variant="outlined"
                            value={formData.name}
                            onChange={handleFormChange}
                        />
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={handleSubmit}
                        >
                            {formData.id ? "Cập nhật Category" : "Tạo Category"}
                        </Button>
                    </Stack>
                </DialogContent>
            </Dialog>
            <Head title="Quản Lí Category" />
            <Topbar user={auth.user}>
                <Paper sx={{ width: "100%", overflow: "hidden" }}>
                    <Typography
                        variant="h4"
                        component="div"
                        sx={{ padding: 2, fontWeight: "bold" }}
                    >
                        Quản lý Category
                    </Typography>
                    <Button
                        onClick={() => handleDialogOpen()}
                        startIcon={<AddIcon />}
                        style={{ float: "right" }}
                    >
                        Thêm Category
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
                                {categories.length > 0 ? (
                                    categories
                                        .slice(
                                            page * rowsPerPage,
                                            page * rowsPerPage + rowsPerPage
                                        )
                                        .map((row) => {
                                            return (
                                                <TableRow
                                                    hover
                                                    role="checkbox"
                                                    tabIndex={-1}
                                                    key={row.id}
                                                >
                                                    {columns.map((column) => {
                                                        const value =
                                                            row[column.id];
                                                        if (
                                                            column.id ===
                                                            "action"
                                                        ) {
                                                            return (
                                                                <TableCell
                                                                    key={
                                                                        column.id
                                                                    }
                                                                    align={
                                                                        column.align
                                                                    }
                                                                >
                                                                    <Stack
                                                                        direction="row"
                                                                        spacing={
                                                                            1
                                                                        }
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
                                                                                handleDeleteModel(
                                                                                    row.id
                                                                                )
                                                                            }
                                                                        >
                                                                            <DeleteIcon />
                                                                        </IconButton>
                                                                    </Stack>
                                                                </TableCell>
                                                            );
                                                        }
                                                        return (
                                                            <TableCell
                                                                key={column.id}
                                                                align={
                                                                    column.align
                                                                }
                                                            >
                                                                {column.format &&
                                                                typeof value ===
                                                                    "number"
                                                                    ? column.format(
                                                                          value
                                                                      )
                                                                    : value}
                                                            </TableCell>
                                                        );
                                                    })}
                                                </TableRow>
                                            );
                                        })
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={columns.length}
                                            align="center"
                                        >
                                            No data.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 50, 75, 100]}
                        component="div"
                        count={categories.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Topbar>
        </>
    );
};

export default Categories;
