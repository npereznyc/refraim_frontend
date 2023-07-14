import React from 'react';
import { Button } from '@mui/material';

function Disclaimer() {
    return (
        <div className="welcome">
            <h1>Refraim is not a crisis service</h1>
            <ul>
                <li>
                    <p>No human is monitoring these conversations</p>
                </li>
                <li>
                    <p>If you experience a crisis, please contact your local crisis serivces</p>
                </li>
            </ul>
            <Button
                type="submit"
                variant="outlined"
                color="primary"
                href="/welcome/"
                style={{ marginTop: '1em' }}>
                I understand
            </Button>
        </div>
    );
}

export default Disclaimer;