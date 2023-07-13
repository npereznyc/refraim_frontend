import { Link } from 'react-router-dom'
import React from 'react';
import { Button } from '@mui/material';
import Registration from './Registration';



function PrePrompt() {
    return (
        <div className="welcome">
            <h1>What's on your mind?</h1>
            <Button
                type="submit"
                variant="outlined"
                color="primary"
                href="/session/"
                style={{ marginTop: '1em' }}>
                Negative self-talk
            </Button>
            <br />
            <Button
                type="submit"
                variant="outlined"
                color="primary"
                href="/session/"
                style={{ marginTop: '1em' }}>
                Relationship issue
            </Button>
            <br />
            <Button
                type="submit"
                variant="outlined"
                color="primary"
                href="/session/"
                style={{ marginTop: '1em' }}>
                Work issue
            </Button>
            <br />
            <Button
                type="submit"
                variant="outlined"
                color="primary"
                href="/session/"
                style={{ marginTop: '1em' }}>
                Other issue
            </Button>
        </div>
    );
}

export default PrePrompt;