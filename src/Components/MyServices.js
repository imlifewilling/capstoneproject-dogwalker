import React from "react";
import { useParams } from "react-router-dom";

const MyServices = () => {
    const { id } = useParams();
    return (
        <h1>My Services {id}</h1>
    )
};

export default MyServices;