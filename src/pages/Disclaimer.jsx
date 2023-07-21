import React, {useContext} from 'react';
import { Button } from '@mui/material';
import {useNavigate} from 'react-router-dom'
import AuthContext from '../auth';

function Disclaimer() {

    let {user} = useContext(AuthContext)
    const navigate = useNavigate()
    const isLoggedIn = user !== null && user !== undefined;

    const handleButtonClick = () => {
        if(isLoggedIn) {
            navigate('/session')
        } else {
            navigate('/welcome')
        }
    }
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
                onClick={handleButtonClick}
                style={{ marginTop: '1em' }} >
                I understand
            </Button>
        </div>
    );
}

export default Disclaimer;