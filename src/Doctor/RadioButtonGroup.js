import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Button } from '@mui/material';
import { transDescription } from './Certificate'

export default function RowRadioButtonsGroup(props) {
    const [value, setValue] = React.useState('');
    const levelChange = (event)=>{
        setValue(event.target.value);
        props.onUpdate(props.value,event.target.value);
    }
    return (
      <FormControl>
        <FormLabel id="demo-row-radio-buttons-group-label">{props.value.name}</FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          value={value}
          onChange={levelChange}
        >
          {Array.from(Array(4).keys()).map((i) => (<FormControlLabel value={transDescription(i)} control={<Radio />} label={transDescription(i)} />))}
          <Button onClick={()=>{props.onDelete(props.value.name)}}>Delete</Button>
        </RadioGroup>
      </FormControl>
    );
  }