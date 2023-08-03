import React from 'react';
import { Button } from '@mui/material';
import Nav from '../components/Nav';
import {Typography} from '@mui/material';

function Complete() {
    return (
        <div className="welcome">
            <Typography variant="h1" color='primary'>Refraim complete!</Typography>
            
            <Button
                type="submit"
                variant="contained"
                color="primary"
                href="/pre-prompt/"
                style={{ marginTop: '1em' }}
                sx={{ textTransform: 'none' }} >
                New Refraim
            </Button>
            <Nav />
        </div>
    );
}

export default Complete;