import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MyServicesCard from './MyServicesCard';
import { Box } from "@mui/material";
import MyServicesForm from "./MyServicesForm";

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
                                <MyServicesCard key={idx} service={service} count={idx+1}/>
                            )
                        })
                    }
                </Box>
                <Box sx={{flex:'2'}}>
                    <MyServicesForm />
                </Box>
            </Box>
        </>
    )
};

export default MyServices;