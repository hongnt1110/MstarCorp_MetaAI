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
    IconButton,
    Stack,
    Typography,
    TextField,
} from "@mui/material";
import Topbar from "@/Layouts/NavBar";
import { Head } from "@inertiajs/react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import FilterModel from "../Components/Filter/FilterModel";

const columns = [
    { id: "name", label: "Model", minWidth: 600 },
    // { id: "color", label: "Màu sắc", minWidth: 120 },
    { id: "action", label: "Thao Tác", minWidth: 90 },
];

const Models = ({ auth }) => {
    const [models, setModels] = useState([]);
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
    const handleDialogOpen = (model = null) => {
        setFormData(
            model || {
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

    const handleSubmitModel = () => {
        const modelData = {
            ...formData,
        };
        const apiURL = formData.id
            ? `https://api.maychu.dev/MstarCorp2/public/api/models/update/${formData.id}`
            : "https://api.maychu.dev/MstarCorp2/public/api/models/create";

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
                `https://api.maychu.dev/MstarCorp2/public/api/models/delete/${modelId}`
            )
            .then(() => {
                console.log("model deleted successfully");
                setReload(!reload);
            })
            .catch((error) => {
                console.error("Error deleting model:", error);
            });
    };
    const handleEditClick = (modelId) => {
        axios
            .get(
                `https://api.maychu.dev/MstarCorp2/public/api/models/find/${modelId}`
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
        fetch("https://api.maychu.dev/MstarCorp2/public/api/models/list")
            .then((response) => response.json())
            .then((data) => {
                setModels(data["data"]);
            })
            .catch((error) => {
                console.error("Error fetching model data:", error);
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
                            label="Tên Model"
                            variant="outlined"
                            value={formData.name}
                            onChange={handleFormChange}
                        />
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={handleSubmitModel}
                        >
                            {formData.id ? "Cập nhật Model" : "Tạo Model"}
                        </Button>
                    </Stack>
                </DialogContent>
            </Dialog>
            <Head title="Quản Lí Catgory" />
            <Topbar user={auth.user}>
                <Paper sx={{ width: "100%", overflow: "hidden" }}>
                    <Typography
                        variant="h4"
                        component="div"
                        sx={{ padding: 2, fontWeight: "bold" }}
                    >
                        Quản lý Model
                    </Typography>
                    <Button
                        onClick={() => handleDialogOpen()}
                        startIcon={<AddIcon />}
                        style={{ float: "right" }}
                    >
                        Thêm Model
                    </Button>
                    <Typography sx={{ marginBottom: 3 }}>
                        <FilterModel />
                    </Typography>
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
                                {models.length > 0 ? (
                                    models
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
                        count={models.length}
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

export default Models;
