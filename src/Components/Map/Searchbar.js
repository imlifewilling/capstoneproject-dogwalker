
import React, { useState } from 'react';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import { Description } from '@mui/icons-material';

export default function Searchbar() {
  const [curlocaiton, setCurlocaiton ] = useState();
  console.log(curlocaiton)
  // useEffect(() => {

  // }, [])
  const {ready, 
    value, 
    setValue, 
    suggestions : {status, data}, 
    clearSuggestions}  = usePlacesAutocomplete();

  // console.log(status, data);

  const handleSelect = async (val) => {
    setValue(val, false);
    clearSuggestions();

    const results = await getGeocode({ address:val })
    const { lat, lng} = await getLatLng(results[0])
    setCurlocaiton({lat, lng})
  }


  return (
    <Combobox onSelect = { handleSelect }>
      <ComboboxInput
        className = 'combobox-input'
        value = {value}
        onChange = {e => setValue(e.target.value)}
        placeholder = 'Address or Zipcode'
      />
      <ComboboxPopover>
        <ComboboxList className = 'address-option'>
          {status === 'OK' && 
          data.map(({place_id, description}) => 
            <ComboboxOption 
              className = 'addressselect'
              key = {place_id} 
              value = {description} 
            />
          )
          }
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
}
