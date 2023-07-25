import React, {useContext} from 'react';
import { Button } from '@mui/material';
import {useNavigate} from 'react-router-dom'
import AuthContext from '../auth';

function Favorites() {

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
            <h1>Favorites page coming soon!</h1>
            <ul  style={{ textAlign: 'left', listStylePosition: 'inside' }}>
                <li>We'll be adding the ability to save your favorite refraims and view them all here. Stay tuned!
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

export default Favorites;