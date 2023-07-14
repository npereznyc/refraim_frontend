import React from 'react';
import { Button } from '@mui/material';
import GoogleLogin from '../components/GoogleLogin';

function Welcome() {
    return (
        <div className="welcome">
            <h1>Create your account to get started</h1>
            <GoogleLogin />
            <br />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                href="/register/"
                style={{ marginTop: '1em' }}
                sx={{ textTransform: 'none' }}>
                Sign Up with Email
            </Button>
            <h4>or login</h4>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                href="/login/"
                style={{ marginTop: '1em' }}
                sx={{ textTransform: 'none' }}>
                I already have an account
            </Button>
        </div>
    );
}

export default Welcome;