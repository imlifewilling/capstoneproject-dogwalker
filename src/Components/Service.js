import React from "react";
import { Box, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import ServiceCard from "./ServiceCard";


const Service = () => {
    const { services } = useSelector(state=>state);

    return (
        <>
            <h1>Service Page</h1>
            {/* <Grid sx={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', height:'100vh'}}> */}
            <Grid container>
                <Grid item md={2} key={'filter'} sx={{border: 'black solid 1px'}}>
                    <h1>Filter</h1>
                </Grid>
                <Grid item md={7} key={'service list'} sx={{border: 'black solid 1px'}}>
                    <h1>Service List</h1>

                    {
                        services.map(service => {
                            return <ServiceCard key={service.id} service={service}/>
                        })
                    }
                </Grid>
                <Grid item md={3} key={'map'} sx={{border: 'black solid 1px'}}>
                    <h1>Map</h1>
                </Grid>
            </Grid>
        </>
    );
};

export default Service;