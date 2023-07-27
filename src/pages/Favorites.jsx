import React, {useContext} from 'react';
import { Button } from '@mui/material';
// import {useNavigate} from 'react-router-dom'
// import AuthContext from '../auth';
import {Typography} from '@mui/material';
import Nav from '../components/Nav';

function Favorites() {

    // let {user} = useContext(AuthContext)
    // const navigate = useNavigate()
    // const isLoggedIn = user !== null && user !== undefined;

    // const handleButtonClick = () => {
    //     if(isLoggedIn) {
    //         navigate('/session')
    //     } else {
    //         navigate('/welcome')
    //     }
    // }
    return (
        <div className="welcome">
            <Typography variant="h1" color='primary' >Favorites page coming soon!</Typography>
            <br />
            <Typography variant='body1'>We'll be adding the ability to save your favorite refraims and view them all here. Stay tuned!.</Typography>
            <br />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                href="/pre-prompt/"
                style={{ marginTop: '1em' }}
                sx={{ textTransform: 'none' }} >
                New Refraim
            </Button>
            <Nav />
        </div>
    );
}

export default Favorites;