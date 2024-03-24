import * as React from "react";
import { useState, useEffect, useRef } from "react";
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
import Chip from "@mui/material/Chip";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import MySnackbar from "@/Item/MySnackbar";
import ContentDialog from "@/Item/ContentDialog";
import Toast from "@/Item/Toast";

const columns = [
    { id: "id", label: "ID", minWidth: 20 },
    { id: "title", label: "Tên", minWidth: 170 },
    { id: "categories", label: "Categories", minWidth: 120 },
    { id: "prompt", label: "Prompt", minWidth: 100 },
    { id: "models", label: "Models", minWidth: 100 },
    { id: "description", label: "Description", minWidth: 100 },
    { id: "placeholder", label: "Placeholder", minWidth: 100 },

    { id: "status", label: "Trạng thái", minWidth: 100 },
    { id: "action", label: "Thao Tác", minWidth: 100 },
];
const Prompts = ({ auth }) => {
    const [prompts, setPrompts] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [reload, setReload] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [formData, setFormData] = useState({
        id: null,
        title: "",
        prompt: "",
        categoris: "",
        models: "",
        description: "",
        status: true,
    });
    const [models, setModels] = useState([]);
    const [categories, setCategories] = useState([]);
    const label = { inputProps: { "aria-label": "Size switch demo" } };
    const [open, setOpen] = useState(false);
    const [scroll, setScroll] = useState("paper");
    const [selectedContent, setSelectedContent] = useState("");

    const handleClickOpen = (scrollType, value) => () => {
        setOpen(true);
        setScroll(scrollType);
        setSelectedContent(value);
    };

    const handleClose = () => {
        setOpen(false);
    };
    // =================================================================
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("");

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const handleSnackbarOpen = (Message, Severity) => {
        setSnackbarOpen(true);
        setSnackbarMessage(Message); // Sử dụng state để lưu nội dung của MuiAlert
        setSnackbarSeverity(Severity);
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setSnackbarOpen(false);
    };
    // =================================================================
    const [openToast, setOpenToast] = useState(false);

    const handleClickOpenToast = (promptID) => {
        setOpenToast(true);
    };

    const handleCloseToast = () => {
        setOpenToast(false);
    };

    // =================================================================

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleDialogOpen = (prompt = null) => {
        setFormData(
            prompt || {
                id: null,
                title: "",
                prompt: "",
                categories: "",
                models: "",
                description: "",
                status: true,
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

    const handleSubmitPrompt = () => {
        const promptData = {
            ...formData,
            // Chuyển đổi 'status' trước khi gửi dữ liệu
            status: formData.status ? 1 : 0,
            models: [modelName.join(", ")],
            categories: [categoryName.join(", ")],
        };

        const apiURL = formData.id
            ? `https://api.maychu.dev/MstarCorp2/public/api/prompts/update/${formData.id}`
            : "https://api.maychu.dev/MstarCorp2/public/api/prompts/create";

        const method = formData.id ? axios.put : axios.post;

        method(apiURL, promptData, {
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                console.log(
                    formData.id
                        ? "Prompts updated successfully"
                        : "Prompts added successfully",
                    response.data
                );

                handleDialogClose();
                handleSnackbarOpen("successfully!", "success");

                setReload(!reload);
            })
            .catch((error) => {
                console.error("Error processing Prompts:", error);
                handleSnackbarOpen("Error!", "error");
            });
    };

    const handleDeletePrompt = (promptId) => {
        axios
            .delete(
                `https://api.maychu.dev/MstarCorp2/public/api/prompts/delete/${promptId}`
            )
            .then(() => {
                console.log("Prompt deleted successfully");
                handleSnackbarOpen("Deleted status successfully!", "success");
                setReload(!reload);
            })
            .catch((error) => {
                console.error("Error deleting user:", error);
                handleSnackbarOpen("Error deleted status!", "error");
            });
    };
    const handleEditClick = (promptId) => {
        setModelName([]); // Đặt lại trạng thái modelName để tránh giữ giá trị từ lần sửa đổi trước
        setCategoryName([]);
        axios
            .get(`https://api.maychu.dev/MstarCorp2/public/api/prompts/find/${promptId}`)
            .then((response) => {
                const promptData = response.data.data;
                const stringWithoutBrackets = promptData.models.replace(
                    /\[|\]|"/g,
                    ""
                );
                const arrayFromCommaSeparated =
                    stringWithoutBrackets.split(",");
                const finalArray = arrayFromCommaSeparated.map((item) =>
                    item.trim()
                );
                setModelName(finalArray);
                //==================================
                const stringWithoutBracketsCategories =
                    promptData.categories.replace(/\[|\]|"/g, "");
                const arrayFromCommaSeparatedCategories =
                    stringWithoutBracketsCategories.split(",");
                const finalArrayCategories =
                    arrayFromCommaSeparatedCategories.map((item) =>
                        item.trim()
                    );
                setCategoryName(finalArrayCategories);
                //====================================
                handleDialogOpen({
                    id: promptData.id,
                    title: promptData.title,
                    prompt: promptData.prompt,
                    models: promptData.models,
                    categories: promptData.categories,
                    description: promptData.description,
                    placeholder: promptData.placeholder,
                    status: promptData.status === 1,
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
            status: checked ? 1 : 0,
        };

        const apiURL = `https://api.maychu.dev/MstarCorp2/public/api/prompts/update/${promptId}`;

        const method = axios.put;

        method(apiURL, promptData, {
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                console.log(
                    "Prompts updated successfully",
                    response.data.data.status
                );
                if (response.data.data.status)
                    handleSnackbarOpen(
                        "updated status active successfully!",
                        "success"
                    );
                // Truyền nội dung cụ thể vào hàm
                else
                    handleSnackbarOpen(
                        "updated status inactive successfully!",
                        "success"
                    );
            })
            .catch((error) => {
                x;
                console.error("Error processing Prompts:", error);
                handleSnackbarOpen("Error updated status!", "error");
            });
    };
    const [modelName, setModelName] = React.useState([]);
    const handleChangeMultipleModel = (event) => {
        const { options } = event.target;
        const value = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        setModelName(value);
    };
    const [categoryName, setCategoryName] = React.useState([]);
    const handleChangeMultipleCategory = (event) => {
        const { options } = event.target;
        const value = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        setCategoryName(value);
    };

    useEffect(() => {
        fetch("https://api.maychu.dev/MstarCorp2/public/api/prompts/list")
            .then((response) => response.json())
            .then((data) => {
                setPrompts(data["data"]);
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
            });

        axios
            .get("https://api.maychu.dev/MstarCorp2/public/api/models/list")
            .then((response) => {
                setModels(response.data.data);
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
            });
        axios
            .get("https://api.maychu.dev/MstarCorp2/public/api/categories/list")
            .then((response) => {
                setCategories(response.data.data);
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
            });
    }, [reload]);

    // Hàm render Chips cho cột "models"
    const renderModelChips = (modelsString) => {
        const cleanedString = modelsString.replace(/[\[\]"]/g, "");

        // Phân tách chuỗi thành mảng các phần tử
        const categoriesArray = cleanedString
            .split(",")
            .map((item) => item.trim());

        // Trả về một mảng các Chip được tạo từ từng phần tử của categoriesArray
        return categoriesArray.map((category, index) => (
            <Chip
                key={index}
                label={category}
                color="info"
                style={{ margin: 2 }}
            />
        ));
    };

    // Sử dụng hàm decodeCategories trong renderChips
    const renderChips = (categoriesString) => {
        const cleanedString = categoriesString.replace(/[\[\]"]/g, "");

        // Phân tách chuỗi thành mảng các phần tử
        const categoriesArray = cleanedString
            .split(",")
            .map((item) => item.trim());

        // Trả về một mảng các Chip được tạo từ từng phần tử của categoriesArray
        return categoriesArray.map((category, index) => (
            <Chip
                key={index}
                label={category}
                color="secondary"
                style={{ margin: 2 }}
            />
        ));
    };

    return (
        <>
            <MySnackbar
                open={snackbarOpen}
                onClose={handleSnackbarClose}
                message={snackbarMessage}
                severity={snackbarSeverity}
            />

            <Dialog
                open={dialogOpen}
                onClose={handleDialogClose}
                style={{ textAlign: "center" }}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>
                    {formData.id ? "Thay đổi Prompt" : "Thêm Prompt"}
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
                            id="title"
                            name="title"
                            label="Tiêu đề"
                            variant="outlined"
                            value={formData.title}
                            onChange={handleFormChange}
                        />
                        <TextField
                            required
                            id="prompt"
                            name="prompt"
                            label="Prompt"
                            variant="outlined"
                            value={formData.prompt}
                            onChange={handleFormChange}
                            multiline
                            rows={8}
                        />
                        <TextField
                            required
                            id="description"
                            name="description"
                            label="Mô tả"
                            variant="outlined"
                            value={formData.description}
                            onChange={handleFormChange}
                            multiline
                            rows={3}
                        />
                        <TextField
                            required
                            id="placeholder"
                            name="placeholder"
                            label="place holder"
                            variant="outlined"
                            value={formData.placeholder}
                            onChange={handleFormChange}
                            multiline
                            rows={3}
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
                            label="Trạng Thái Prompt"
                        />

                        <FormControl
                            sx={{ m: 1, minWidth: 120, maxWidth: 600 }}
                        >
                            <InputLabel shrink htmlFor="select-multiple-native">
                                Models
                            </InputLabel>
                            <Select
                                multiple
                                native
                                name="models"
                                value={modelName}
                                onChange={handleChangeMultipleModel}
                                label="Models"
                                inputProps={{
                                    id: "select-multiple-native",
                                }}
                            >
                                {models.map((model) => (
                                    <option key={model.id} value={model.name}>
                                        {model.name}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl
                            sx={{ m: 1, minWidth: 120, maxWidth: 600 }}
                        >
                            <InputLabel shrink htmlFor="select-multiple-native">
                                Categories
                            </InputLabel>
                            <Select
                                multiple
                                native
                                name="categories"
                                value={categoryName}
                                onChange={handleChangeMultipleCategory}
                                label="Categories"
                                inputProps={{
                                    id: "select-multiple-categories",
                                }}
                            >
                                {categories.map((category) => (
                                    <option
                                        key={category.id}
                                        value={category.name}
                                    >
                                        {category.name}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={handleSubmitPrompt}
                        >
                            {formData.id ? "Cập nhật Prompt" : "Tạo Prompt"}
                        </Button>
                    </Stack>
                </DialogContent>
            </Dialog>
            <Head title="Quản Lí Prompts" />
            <Topbar user={auth.user}>
                <Paper sx={{ width: "100%", overflow: "hidden" }}>
                    <Typography
                        variant="h4"
                        component="div"
                        sx={{ padding: 2, fontWeight: "bold" }}
                    >
                        Quản lý Prompt
                    </Typography>

                    <Button
                        onClick={() => handleDialogOpen()}
                        startIcon={<AddIcon />}
                        style={{ float: "right" }}
                    >
                        Thêm Prompt
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
                                {prompts.length > 0 ? (
                                    prompts
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
                                                            "categories"
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
                                                                    {renderChips(
                                                                        value
                                                                    )}
                                                                </TableCell>
                                                            );
                                                        } else if (
                                                            column.id ===
                                                            "models"
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
                                                                    {renderModelChips(
                                                                        value
                                                                    )}
                                                                </TableCell>
                                                            );
                                                        } else if (
                                                            column.id ===
                                                            "prompt"
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
                                                                    <Button
                                                                        onClick={handleClickOpen(
                                                                            "paper",
                                                                            value
                                                                        )}
                                                                        variant="contained"
                                                                        startIcon={
                                                                            <ContentPasteIcon />
                                                                        }
                                                                    >
                                                                        Content
                                                                    </Button>

                                                                    <ContentDialog
                                                                        open={
                                                                            open
                                                                        }
                                                                        handleClose={
                                                                            handleClose
                                                                        }
                                                                        scroll={
                                                                            scroll
                                                                        }
                                                                        selectedContent={
                                                                            selectedContent
                                                                        }
                                                                    />
                                                                </TableCell>
                                                            );
                                                        } else if (
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
                                                                                handleClickOpenToast(
                                                                                    row.id
                                                                                )
                                                                            }
                                                                        >
                                                                            <DeleteIcon />
                                                                        </IconButton>
                                                                        <Toast
                                                                            open={
                                                                                openToast
                                                                            }
                                                                            handleClose={
                                                                                handleCloseToast
                                                                            }
                                                                            handleAccept={() => {
                                                                                handleCloseToast();
                                                                                handleDeletePrompt(
                                                                                    row.id
                                                                                );
                                                                            }}
                                                                        />
                                                                    </Stack>
                                                                </TableCell>
                                                            );
                                                        } else if (
                                                            column.id ===
                                                            "status"
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
                                                                            1
                                                                                ? true
                                                                                : false
                                                                        }
                                                                    />
                                                                </TableCell>
                                                            );
                                                        } else {
                                                            return (
                                                                <TableCell
                                                                    key={
                                                                        column.id
                                                                    }
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
                                                        }
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
                        count={prompts.length}
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

export default Prompts;
