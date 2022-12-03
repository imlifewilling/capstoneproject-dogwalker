import { Box } from "@mui/material";
import React from "react";

const Service = () => {
    return (
        <>
            <h1>Service Page</h1>
            <Box sx={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', height:'100vh'}}>
                <Box key={'filter'} sx={{border: 'black solid 1px'}}>
                    <h1>Filter</h1>
                </Box>
                <Box key={'service list'} sx={{border: 'black solid 1px'}}>
                    <h1>Service List</h1>
                </Box>
                <Box key={'map'} sx={{border: 'black solid 1px'}}>
                    <h1>Map</h1>
                </Box>
            </Box>
        </>
    );
};

export default Service;