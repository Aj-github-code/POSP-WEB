import React, {useState} from 'react'
import TextField  from '@mui/material/TextField';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

import MaterialTextField from './MaterialTextField'

export default function MaterialTimePicker(props) {

    const [date, setDate] = React.useState(dayjs('2014-08-18T21:11:54'));

    const handleDate = (newValue) => {
        setDate(newValue);
    };

  return (
    <>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopTimePicker
                label={props.label ? props.label : 'Date'}
                value={props.value ? props.value :date}
              

                {...props}
                renderInput={(params) => <MaterialTextField fullWidth={props.fullWidth ? true : false} {...params} />}
                />
        </LocalizationProvider>
    </>
  )
}
