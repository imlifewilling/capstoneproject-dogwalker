import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MyServicesCard from './MyServicesCard';
import { Box, Grid } from "@mui/material";
import MyServicesForm from "./MyServicesForm";

const MyServices = () => {
    const { id } = useParams();
    const { auth, services } = useSelector(state=>state);
    
    const filteredServices = services.filter(service => service.userId===id);

    return (
        <>
            <h1>My Services For: {auth?.firstname} {auth?.lastname}</h1>
            <Box sx={{display:'flex', flexDirection:'row', justifyContent: 'space-around'}}>
                <Box sx={{flex:'3'}}>
                    <Grid item md={7} key={'service list'} sx={{ maxHeight: '80vh', overflow: 'auto'}}>
                    {
                        filteredServices.map((service, idx)=>{
                            return (
                                <MyServicesCard key={idx} service={service} count={idx+1}/>
                            )
                        })
                    }
                    </Grid>
                </Box>
                <Box sx={{flex:'2', m:'5'}}>
                    <MyServicesForm />
                </Box>
            </Box>
        </>
    )
};

export default MyServices;