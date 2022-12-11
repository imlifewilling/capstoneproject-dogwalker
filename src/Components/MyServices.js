import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MyServicesCard from './MyServicesCard';
import { Box } from "@mui/material";

const MyServices = () => {
    const { id } = useParams();
    const { auth, services } = useSelector(state=>state);
    
    const filteredServices = services.filter(service => service.userId===id);

    return (
        <>
            <h1>My Services {auth?.firstname}</h1>
            <Box sx={{display:'flex', flexDirection:'row', justifyContent: 'space-around'}}>
                <Box sx={{flex:'3'}}>
                    {
                        filteredServices.map((service, idx)=>{
                            return (
                                <MyServicesCard service={service} count={idx+1}/>
                            )
                        })
                    }
                </Box>
                <Box sx={{flex:'2'}}>
                    <h1>Form</h1>
                </Box>
            </Box>
        </>
    )
};

export default MyServices;