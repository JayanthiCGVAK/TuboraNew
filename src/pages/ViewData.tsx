import { useState, useEffect } from "react";

import { Box, FormControl, InputLabel, Select, MenuItem, Toolbar, AppBar, Typography, Container } from "@mui/material";
import "../App.css";
import BSView from "./BSView";
import { importFiles, loadSchemaFiles } from "../utils/schemaUtils";

function App() {
    const [data, setData] = useState<any>([]);
    const [schema, setSchema] = useState<string>("");
    const [dropdownValues, setDropdownValues] = useState<any>([]);
    const [viewType, setViewType] = useState<string>("");
    // Used to get all the Json files from the data folder
    useEffect(() => {
        const fetchData = async () => {
            const dataFiles = await importFiles(
                require.context("../data", false, /\.json$/)
            );
            const inputData = await loadSchemaFiles(dataFiles);
            setViewType(inputData.defaultview);
            setDropdownValues(inputData.dropdownData);
            setData(inputData.bsData);
            setSchema(inputData.dropdownData[0]);
        };
        fetchData();
    }, []);

    return (
        <Container >
       
            <div className="app-header">
                <Box sx={{ minWidth: 240, marginRight: "1rem" }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                        Select the Business Object
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Select the Business Object"
                            value={schema}
                            onChange={(e) => setSchema(e.target.value)}
                        >
                            {dropdownValues?.map((dropdown: any, index: number) => (
                                <MenuItem key={index} value={dropdown}>
                                    {dropdown}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

            </div>
            <BSView
                viewData={data?.[schema]?.data}
                schemaData={data?.[schema]?.schema}
                viewMode={viewType}
            />
        </Container>
    );
}

export default App;
