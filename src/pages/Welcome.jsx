import { Link } from 'react-router-dom'
import React from 'react';
import { Button } from '@mui/material';
import Registration from '../components/Registration';



function Welcome() {
    return (
        <div className="welcome">
            <h1>Create your account to get started</h1>
            <Button
                type="submit"
                variant="outlined"
                color="primary"
                href="/register/"
                style={{ marginTop: '1em' }}>
                Sign Up with Email
            </Button>
            <h4>or login</h4>
            <Button
                type="submit"
                variant="outlined"
                color="primary"
                href="/login/"
                style={{ marginTop: '1em' }}>
                I already have an account
            </Button>
        </div>
    );
}

export default Welcome;