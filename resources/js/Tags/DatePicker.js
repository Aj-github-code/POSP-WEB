import React from 'react'

import Box  from '@mui/material/Box';

import TextField  from '@mui/material/TextField';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

import MaterialTextField from './MaterialTextField'



export default function DatePickers(props) {
    
  const [date, setDate] = React.useState(null);
  const handleDate = (newValue) => {

      setDate(newValue);
  };

  return (
    <> 
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker 
                label={props.label ? props.label : 'Date'}
                className={props.className ? props.className :  null}
                inputFormat={props.inputFormat ? props.inputFormat : 'YYYY/MM/DD'} 
                value={props.value ? props.value : new Date()}
               {...props}
                
                
                renderInput={(params) => <MaterialTextField fullWidth={props.fullWidth ? true : false}  {...params} />}/>
        </LocalizationProvider>
    </>
  )
}
export function DateRangePicker(props) {
  const [date, setDate] = React.useState(null);
  const handleDate = (newValue) => {
    setDate(newValue);
  };
  return(
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDatePicker
          label={props.label ? props.label : 'Date'}
          name={props.name ? props.name : null}
          className={props.className ? props.className :  null}
          
          value={props.value ? props.value : date}
       {...props}


  
          renderInput={(startProps, endProps) => (
            <React.Fragment>
              <Box sx={{ display:"flex", justifyContent:"space-round" }}>
                <MaterialTextField fullWidth={props.fullWidth ? true : false}  {...startProps}/>
       
                <MaterialTextField fullWidth={props.fullWidth ? true : false} {...endProps}/>
              </Box>
       
            </React.Fragment>
          )}
        />
      </LocalizationProvider>
    </>
  )

}