import React from 'react';
import { Button } from '@mui/material';

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
        </div>
    );
}

export default Complete;