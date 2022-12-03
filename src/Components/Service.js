import React from "react";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import ServiceCard from "./ServiceCard";


const Service = () => {
    const { services } = useSelector(state=>state);

    return (
        <>
            <h1>Service Page</h1>
            <Box sx={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', height:'100vh'}}>
                <Box key={'filter'} sx={{border: 'black solid 1px'}}>
                    <h1>Filter</h1>
                </Box>
                <Box key={'service list'} sx={{border: 'black solid 1px'}}>
                    <h1>Service List</h1>
                    <ServiceCard />
                    <pre>{JSON.stringify(services,null,2)}</pre>
                </Box>
                <Box key={'map'} sx={{border: 'black solid 1px'}}>
                    <h1>Map</h1>
                </Box>
            </Box>
        </>
    );
};

export default Service;