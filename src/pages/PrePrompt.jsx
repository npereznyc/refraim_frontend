import { Link } from 'react-router-dom'
import React from 'react';
import { Button } from '@mui/material';
import Registration from './Registration';



function PrePrompt() {
    return (
        <div className="welcome">
            <p>Whats on your mind? <br/> How can I help you think differently about this? <br/> Choose the most relevant topic below.</p>
            <Button
                type="submit"
                variant="contained"
                color="background"
                href="/session/"
                style={{ marginTop: '1em' }}>
                Negative self-talk
            </Button>
            <br />
            <Button
                type="submit"
                variant="contained"
                color="background"
                href="/session/"
                style={{ marginTop: '1em' }}>
                Relationship issue
            </Button>
            <br />
            <Button
                type="submit"
                variant="contained"
                color="background"
                href="/session/"
                style={{ marginTop: '1em' }}>
                Work issue
            </Button>
            <br />
            <Button
                type="submit"
                variant="contained"
                color="background"
                href="/session/"
                style={{ marginTop: '1em' }}>
                Other issue
            </Button>
        </div>
    );
}

export default PrePrompt;