import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Button } from '@mui/material';
export default function RowRadioButtonsGroup(props) {
    const [value, setValue] = React.useState('Low');
    const levelChange = (event)=>{
        setValue(event.target.value);
        props.onUpdate(props.value,event.target.value);
    }
    return (
      <FormControl>
        <FormLabel id="demo-row-radio-buttons-group-label">{props.value.label}</FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          value={value}
          onChange={levelChange}
        >
          <FormControlLabel value="Low" control={<Radio />} label="Low" />
          <FormControlLabel value="Medium" control={<Radio />} label="Medium" />
          <FormControlLabel value="High" control={<Radio />} label="High" />
          <Button onClick={()=>{props.onDelete(props.value.label)}}>Delete</Button>
        </RadioGroup>
      </FormControl>
    );
  }