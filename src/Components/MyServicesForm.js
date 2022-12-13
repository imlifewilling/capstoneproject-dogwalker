import React, { useState } from "react";
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

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

    const taskList = ['Dog Walking', 'House Sitting', 'Dog Day Care'];

    debugger;

    return (
        <>
            <h1>Add a New Service Here</h1>
            <FormControl>
            <Box sx={{ m: '1', width: '300' }}>
                    <InputLabel>Services</InputLabel>
                    <Select
                    multiple
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
        </>
    );
};

export default MyServicesForm;