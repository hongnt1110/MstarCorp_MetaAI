import * as React from "react";
import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button, IconButton, Stack, Typography } from "@mui/material";
import Topbar from "@/Layouts/NavBar";
import { Head } from "@inertiajs/react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const columns = [
    { id: "subcription", label: "Subcription", minWidth: 170 },
    { id: "price", label: "Giá tiền", minWidth: 120 },
    { id: "description", label: "Mô tả", minWidth: 120 },
    { id: "action", label: "Thao Tác", minWidth: 100 },
];

const Subcription = ({auth}) => {
    const [subcription, setSubcription] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        fetch("https://api.maychu.dev/MstarCorp2/public/api/users/list")
            .then((response) => response.json())
            .then((data) => {
                setSubcription(data["data"]);
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
            });
    }, []);

    return (
        <>
            <Head title="Quản Lí Subcription" />
            <Topbar user={auth.user}>
                <Paper sx={{ width: "100%", overflow: "hidden" }}>
                    <Typography
                        variant="h4"
                        component="div"
                        sx={{ padding: 2, fontWeight: "bold"  }}
                    >
                        Quản lý Subcription
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
                                            sx={{ fontWeight: "bold",  }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {subcription.length > 0 ? (
                                    subcription
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
                                                                        <IconButton aria-label="edit">
                                                                            <EditIcon />
                                                                        </IconButton>

                                                                        <IconButton aria-label="delete">
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
                        count={subcription.length}
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

export default Subcription;
