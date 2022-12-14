import React, { useState } from "react";
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { TextField, Button } from "@mui/material";
import axios from 'axios';
import { addService } from "../store/service";
import { useDispatch } from "react-redux";

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

const MyServicesForm = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const [input, setInput] = useState({
        task: [],
        serviceDescription: '',
        serviceDogsize: '',
        price: '',
        availability: [],
    });

    function getStyles(name, personName, theme) {
        return {
          fontWeight:
            personName.indexOf(name) === -1
              ? theme.typography.fontWeightRegular
              : theme.typography.fontWeightMedium,
        };
    };

    const handleChange = (event) => {
        const {
          target: { value },
        } = event;

        // console.log(event.target.name)

        setInput(
          // On autofill we get a stringified value.
          {...input, [event.target.name]: typeof value === 'string' ? value.split(',') : value}
        );
    };

    const handleSingleChange = (event) => {
        const {
          target: { value },
        } = event;

        // console.log(event.target.name)

        setInput(
          // On autofill we get a stringified value.
          {...input, [event.target.name]: value}
        );
    };

    const submitService = async() => {
        // const token = window.localStorage.getItem('token');
        // const response = await axios.post('/api/fetchdata/service', input, {
        //     headers: {
        //         authorization: token
        //     }});
        dispatch(addService(input));
    };
    
    const taskList = ['Dog Walking', 'House Sitting', 'Dog Day Care'];
    const availabilityList = ['Morning', 'Afternoon', 'Evening', 'Before Dark', 'Any Time'];
    const dogSizeList = ['Small', 'Medium', 'Large', 'Giant', 'Any Size'];

    return (
        <>
            <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
                <h1>Add a New Service Here</h1>
                <FormControl>
                <Box sx={{ m: '1', width: '100%' }}>
                        <InputLabel htmlFor="services">Services</InputLabel>
                        <Select
                        multiple
                        id='services'
                        name='task'
                        value={input.task}
                        onChange={handleChange}
                        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: "0.5" }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                            </Box>
                        )}
                        // MenuProps={MenuProps}
                        sx={{width:'90%', m:'10'}}
                        >
                        {taskList.map((name) => (
                            <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(name, input.task, theme)}
                            >
                            {name}
                            </MenuItem>
                        ))}
                        </Select>
                </Box>
                </FormControl>

                <TextField
                    id="price"
                    label="Price $"
                    name='price'
                    multiline
                    maxRows={4}
                    value={input.price}
                    onChange={handleSingleChange}
                    sx={{width:'90%', m:'10'}}
                />

                <FormControl fullWidth>
                    <InputLabel id="Dog Size">Service Dog Size</InputLabel>
                    <Select
                    labelId="Dog Size"
                    id="demo-simple-select"
                    value={input.serviceDogsize}
                    name="serviceDogsize"
                    onChange={handleSingleChange}
                    sx={{width:'90%', m:'10'}}
                    >
                        {dogSizeList.map(size => {
                            return (<MenuItem key={size} value={size}>{size}</MenuItem>)
                        })}
                    </Select>
                </FormControl>

                <FormControl>
                <Box sx={{ m: '1', width: '100%' }}>
                        <InputLabel htmlFor="availability">Availability</InputLabel>
                        <Select
                        multiple
                        id='availability'
                        name='availability'
                        value={input.availability}
                        onChange={handleChange}
                        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: "0.5" }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                            </Box>
                        )}
                        // MenuProps={MenuProps}
                        sx={{width:'90%', m:'10'}}
                        >
                        {availabilityList.map((name) => (
                            <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(name, input.availability, theme)}
                            >
                            {name}
                            </MenuItem>
                        ))}
                        </Select>
                </Box>
                </FormControl>
                <TextField
                    sx={{m:'5', lineHeight:'3', width:'90%'}}
                    id="outlined-required"
                    label="Description"
                    multiline
                    rows={4}
                    name='serviceDescription'
                    onChange={handleSingleChange}
                    value={input.serviceDescription}
                />
                <Button 
                    variant="contained"
                    onClick={submitService}
                    disabled={input.task.length === 0 ? true
                        :input.price.length === 0 ? true
                        :input.availability.length === 0 ? true
                        :input.serviceDescription.length === 0 ? true
                        :input.serviceDogsize.length === 0 ? true
                        :false}
                    sx={{width:'90%', m:'10'}}
                >
                Add Service</Button>
            </Box>
        </>
    );
};

export default MyServicesForm;