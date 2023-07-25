import React from 'react';
import { Button } from '@mui/material';
import Nav from '../components/Nav';

function Complete() {
    return (
        <div className="welcome">
            <h1>Refraim complete!</h1>
            
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