import React from 'react';
import { Button } from '@mui/material';

function Disclaimer() {
    return (
        <div className="welcome">
            <h1>Refraim is not a crisis service</h1>
            <ul  style={{ textAlign: 'left', listStylePosition: 'inside' }}>
                <li>No human is monitoring these conversations
                </li>
                <br />
                <li>This is an AI-based tool and is not a replacement for real human connection or working with a licensed therapist.
                </li>
                <br />
                <li>If you experience a suicide-related crisis, please call the Suicide & Life Crisis Hotline at 988.
                </li>
            </ul>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                href="/welcome/"
                style={{ marginTop: '1em' }}
                sx={{ textTransform: 'none' }} >
                I understand
            </Button>
        </div>
    );
}

export default Disclaimer;