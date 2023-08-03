import React, {useContext} from 'react';
import { Button } from '@mui/material';
import {Typography} from '@mui/material';
import Nav from '../components/Nav';
import AuthContext from '../auth';

function Settings() {
    let {logout} = useContext(AuthContext)
    return(
        <>
            <Typography variant="h1" color='primary'>Settings</Typography>
            <br />
            <Button
                variant="contained"
                onClick={logout}>Logout</Button>
            <Nav/>
        </>
    )
}

export default Settings;