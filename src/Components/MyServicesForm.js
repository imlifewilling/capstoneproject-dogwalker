import React, { useState } from "react";
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { TextField } from "@mui/material";

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
    const theme = useTheme();
    const [input, setInput] = useState({
        task: [],
        description: '',
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
    

    const taskList = ['Dog Walking', 'House Sitting', 'Dog Day Care'];

    const availabilityList = ['Morning', 'Afternoon', 'Evening', 'Before Dark', 'Any Time'];

    const dogSizeList = ['Small', 'Medium', 'Large', 'Giant', 'Any Size'];


    console.log(input)

    return (
        <>
            <h1>Add a New Service Here</h1>
            <FormControl>
            <Box sx={{ m: '1', width: '300' }}>
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
                    sx={{width:'500'}}
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
            />

            <FormControl fullWidth>
                <InputLabel id="Dog Size">Service Dog Size</InputLabel>
                <Select
                labelId="Dog Size"
                id="demo-simple-select"
                value={input.serviceDogsize}
                name="serviceDogsize"
                onChange={handleSingleChange}
                >
                    {dogSizeList.map(size => {
                        return (<MenuItem key={size} value={size}>{size}</MenuItem>)
                    })}
                </Select>
            </FormControl>

            <FormControl>
            <Box sx={{ m: '1', width: '300' }}>
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
                    sx={{width:'500'}}
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
        </>
    );
};

export default MyServicesForm;