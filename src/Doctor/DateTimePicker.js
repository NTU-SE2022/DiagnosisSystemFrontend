import React from 'react';
import TextField from '@mui/material/TextField';
import { DatePicker,LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function DateTimePicker(props) {
  const [value, setValue] = React.useState(new Date());

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DatePicker
        label="Basic example"
        value={value}
        onChange={(newValue) => {
        setValue(newValue);
        }}
        renderInput={(params) => <TextField fullWidth {...params} />}
    />
    </LocalizationProvider>
  );
}