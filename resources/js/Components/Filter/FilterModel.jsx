import * as React from "react";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

const filterOptions = createFilterOptions({
    matchFrom: "start",
    stringify: (option) => option.name,
});

export default function FilterModel() {
    const [models, setModels] = useState([]);

    useEffect(() => {
        fetch("https://api.maychu.dev/MstarCorp2/public/api/models/list")
            .then((response) => response.json())
            .then((data) => {
                setModels(data["data"]);
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
            });
    }, []);
    return (
        <Autocomplete
            id="filter-demo"
            options={models}
            getOptionLabel={(option) => option.name}
            filterOptions={filterOptions}
            sx={{ width: 300, marginLeft: 2 }}
            renderInput={(params) => <TextField {...params} label="Lọc theo Model" />}
        />
    );
}
