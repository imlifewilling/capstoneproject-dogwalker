import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const MyServices = () => {
    const { id } = useParams();
    const { auth } = useSelector(state=>state);


    return (
        <h1>My Services {auth?.firstname}</h1>
    )
};

export default MyServices;