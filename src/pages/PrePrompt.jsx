import React from 'react';
import { Button } from '@mui/material';
import {Typography} from '@mui/material';
import Nav from '../components/Nav';

function PrePrompt() {
    return (
        <div className="welcome">
            <Typography variant='body1' id="convo-text">
            Whats on your mind? <br/> How can I help you think differently about this? <br/> Choose the most relevant topic below.
            </Typography>
            <Button
                type="submit"
                variant="contained"
                href="/session/"
                style={{ 
                    backgroundColor: '#FFFFFF', color: '#123356',
                    marginTop: '1em', width: 200}}>
                Negative self-talk
            </Button>
            <br />
            <Button
                type="submit"
                variant="contained"
                href="/session/"
                style={{ 
                    backgroundColor: '#FFFFFF', color: '#123356',
                    marginTop: '1em', width: 200 }}>
                Relationship issue
            </Button>
            <br />
            <Button
                type="submit"
                variant="contained"
                href="/session/"
                style={{ 
                    backgroundColor: '#FFFFFF', color: '#123356',
                    marginTop: '1em', width: 200 }}>
                Work issue
            </Button>
            <br />
            <Button
                type="submit"
                variant="contained"
                href="/session/"
                style={{ 
                    backgroundColor: '#FFFFFF', color: '#123356',
                    marginTop: '1em', width: 200 }}>
                Other issue
            </Button>
            <Nav />
        </div>
    );
}

export default PrePrompt;