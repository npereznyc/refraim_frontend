import React from 'react';
import { Button } from '@mui/material';

function PrePrompt() {
    return (
        <div className="welcome">
            <p>Whats on your mind? <br/> How can I help you think differently about this? <br/> Choose the most relevant topic below.</p>
            <Button
                type="submit"
                variant="contained"
                href="/session/"
                style={{ 
                    backgroundColor: '#FFFFFF', color: '#123356',
                    marginTop: '1em' }}>
                Negative self-talk
            </Button>
            <br />
            <Button
                type="submit"
                variant="contained"
                href="/session/"
                style={{ 
                    backgroundColor: '#FFFFFF', color: '#123356',
                    marginTop: '1em' }}>
                Relationship issue
            </Button>
            <br />
            <Button
                type="submit"
                variant="contained"
                href="/session/"
                style={{ 
                    backgroundColor: '#FFFFFF', color: '#123356',
                    marginTop: '1em' }}>
                Work issue
            </Button>
            <br />
            <Button
                type="submit"
                variant="contained"
                href="/session/"
                style={{ 
                    backgroundColor: '#FFFFFF', color: '#123356',
                    marginTop: '1em' }}>
                Other issue
            </Button>
        </div>
    );
}

export default PrePrompt;