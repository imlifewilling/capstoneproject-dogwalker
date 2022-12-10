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
  

const ContactForm = (props) => {
    const {auth} = useSelector(state=>state);
    const [input, setInput] = useState({
        firstname: auth?.firstname,
        lastname: auth?.lastname,
        email: auth?.email,
        phone: auth?.phone,
        message: '',
    });

    const inputChange = (ev) => {
        // console.log(ev.target.value)
        setInput({...input, [ev.target.name]: ev.target.value})
    }

    const submitEmail = () => {
        console.log(input)
        const body = (`FROM
            ${input.firstname} ${input.lastname}
            ${input.email}
            ${input.phone}
            \n${input.message}`
        );
        const subject = (`GOJI Contact Request From ${input.firstname} ${input.lastname}`);
        // console.log(body)
        window.open(`mailto:${props.email}?subject=${subject}&body=${encodeURIComponent(body)}`);
    };

    return (        
        <FormControl sx={{border: 'black 1px solid', borderRadius: '10px', margin:'10px', padding:'10px'}} onChange={inputChange}>
            <Typography variant="h4" sx={{marginBottom: '10'}}>Contact Via Email Here</Typography>
            <Box sx={{display:'flex', flexDirection:'row'}}>
                <TextField
                    required
                    sx={{m:'3'}}
                    id="outlined-required"
                    label="First Name"
                    name='firstname'
                    defaultValue={input.firstname}
                />
                <TextField
                    required
                    sx={{m:'3'}}
                    id="outlined-required"
                    label="Last Name"
                    name='lastname'
                    defaultValue={input.lastname}
                />
            </Box>
            <TextField
                required
                sx={{m:'3'}}
                id="outlined-required"
                label="Email"
                name='email'
                defaultValue={input.email}
            />
            <TextField
                required
                sx={{m:'3'}}
                id="outlined-required"
                label="Phone"
                name='phone'
                defaultValue={input.phone}
            />
            <TextField
                required
                sx={{m:'3', lineHeight:'3'}}
                id="outlined-required"
                label="Message"
                placeholder="Please Write Your Message Here"
                multiline
                rows={4}
                name='message'
                defaultValue={input.message}
            />
            <Button variant="contained" onClick={submitEmail}>
                Send Via Email
            </Button>
        </FormControl>
    )
};

export default ContactForm;

