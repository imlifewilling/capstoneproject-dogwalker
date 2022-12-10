import React, { useState } from "react";
import {
    FormControl,
    TextField
  } 
from "@mui/material";
  

const ContactForm = () => {
    const {auth} = useState(state=>state);
    return (        
        <FormControl>
            <h1>FORM HERE</h1>
            <TextField
            required
            id="outlined-required"
            label="First Name"
            defaultValue={auth?.firstname}
            />
            <TextField
            required
            id="outlined-required"
            label="Last Name"
            defaultValue={auth?.lastname}
            />
            {window.open('mailto:test@example.com')}


        </FormControl>
    )
};

export default ContactForm;

