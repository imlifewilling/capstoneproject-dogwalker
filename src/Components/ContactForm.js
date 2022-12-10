import React, { useState } from "react";
import {
    FormControl,
    TextField,
    Box,
    Typography,
    Button
  } 
from "@mui/material";
import { useSelector } from "react-redux";
  

const ContactForm = () => {
    const {auth} = useSelector(state=>state);
    const [input, setInput] = useState({
        firstname: auth?.firstname,
        lastname: auth?.lastname,
        email: auth?.email,
        phone: auth?.phone,
        message: '',
    });

    console.log(auth)

    return (        
        <FormControl sx={{border: 'black 1px solid', borderRadius: '10px', margin:'10px', padding:'10px'}}>
            <Typography variant="h4">Contact Via Email Here</Typography>
            <Box sx={{display:'flex', flexDirection:'row'}}>
                <TextField
                    required
                    sx={{m:'3'}}
                    id="outlined-required"
                    label="First Name"
                    defaultValue={input.firstname}
                />
                <TextField
                    required
                    sx={{m:'3'}}
                    id="outlined-required"
                    label="Last Name"
                    defaultValue={input.lastname}
                />
            </Box>
            <TextField
                required
                sx={{m:'3'}}
                id="outlined-required"
                label="Email"
                defaultValue={input.email}
            />
            <TextField
                required
                sx={{m:'3', lineHeight:'3'}}
                id="outlined-required"
                label="Message"
                placeholder="Please Write Your Message Here"
                multiline
                rows={4}
                defaultValue={input.message}
            />
            <Button variant="contained">
                Send Via Email
            </Button>
            {/* {window.open('mailto:test@example.com')} */}


        </FormControl>
    )
};

export default ContactForm;

