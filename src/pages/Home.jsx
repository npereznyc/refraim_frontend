import React, { useContext } from 'react';
import { Button, CardContent, Typography, CardActions, Card } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import AuthContext from '../auth';

function Home() {

    let { user } = useContext(AuthContext)
    const navigate = useNavigate()
    // const isLoggedIn = user !== null && user !== undefined;

    // const handleButtonClick = () => {
    //     if(isLoggedIn) {
    //         navigate('/pre-prompt')
    //     } else {
    //         navigate('/welcome')
    //     }
    // }
    return (
        <div className="homepage">
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography variant='h2' color="primary" gutterBottom>
                        My Favorite Refraims
                    </Typography>

                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        adjective
                    </Typography>
                    <Typography variant="body2">
                        well meaning and kindly.
                        <br />
                        {'"a benevolent smile"'}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>

            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography variant='h2' color="primary" gutterBottom>
                        New Refraim Session
                    </Typography>

                    <Typography variant="body2">
                        Let me help you refraim your negative thoughts.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Begin</Button>
                </CardActions>
            </Card>
        </div>
    );
}

export default Home;