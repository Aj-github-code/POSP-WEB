import { Box, Divider } from '@mui/material'
import React from 'react'
import MaterialButton from '../../../../Tags/MaterialButton'
import MaterialTextField from '../../../../Tags/MaterialTextField'
import Checkbox from '@mui/material/Checkbox'

export const ForgotPassword = () => {
  return (
    <>
        <Box sx={{ width: '60%', height: 'auto', backgroundColor: '#FFFFFF', margin: '20px auto', paddingBottom: '5%' }}>
        <Divider sx={{ backgroundColor: '#183883', borderWidth: '2px', borderColor: '#183883' }} />
            <div className="row">  
                <div className="col-md-1 mb-4"></div>
                <div className="col-md-11 mb-4">
                    <label style={{ fontSize: '26px', color: '#000000', marginTop: '5%'}}><b>Forgot Password?</b></label>
                </div>
            </div>
            <div className="row">
                <div className="col-md-1 mb-4"></div>
                <div className="col-md-10 mb-4">
                    <label style={{ fontSize: '18px', color: '#000000' }}>We will send a code to reset the password on your registered email ID.</label>
                </div>
                <div className="col-md-1 mb-4"></div>
            </div>
            <div className='row'>
                <div className="col-md-1 mb-4"></div>
                <div className="col-md-10 mb-4">
                    <MaterialTextField label="Email ID" size="small" fullWidth />
                </div>
                <div className="col-md-1 mb-4"></div>

            </div>

            <div className="row">
                <div className="col-md-1 mb-4"></div>
                <div className="col-md-10 mt-4">
                    <MaterialButton style={{ backgroundColor: '#183883'}} fullWidth name="reset" text="Reset" />
                </div>
                <div className="col-md-1 mb-4"></div>
            </div>
        </Box>
    </>
  )
}
