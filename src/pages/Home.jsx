import React, { useContext, useState } from 'react';
import { Button, CardContent, Typography, CardActions, Card } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import AuthContext from '../auth';
import SwipeableViews from 'react-swipeable-views';
import useFavorites from '../components/useFavorites';
import Nav from '../components/Nav';


function Home() {

    let { user } = useContext(AuthContext)
    const [currentIndex, setCurrentIndex] = useState(0)
    const { favorites, loading } = useFavorites(user.user_id || user.id)

    const handleChangeIndex = index => {
        setCurrentIndex(index);
    };

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
            <Typography variant='h1' color="primary" gutterBottom>
                Welcome!
            </Typography>

            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography variant='h2' color="primary" gutterBottom>
                        My Favorite Refraims
                    </Typography>

                    <SwipeableViews
                        index={currentIndex}
                        onChangeIndex={(index) => setCurrentIndex(index)}
                    >
                        {favorites.map((favorite, index) => (
                            <div key={index}>
                                <Typography variant="body2">
                                    {favorite.conclusion} {/* Render the favorite */}
                                </Typography>
                            </div>
                        ))}
                    </SwipeableViews>
                    <Button disabled={currentIndex === 0} onClick={() => handleChangeIndex(currentIndex - 1)}>
                        Previous
                    </Button>
                    <Button disabled={currentIndex === favorites.length - 1} onClick={() => handleChangeIndex(currentIndex + 1)}>
                        Next
                    </Button>
                </CardContent>
                <CardActions>
                    {Array.from({ length: favorites.length }).map((_, index) => (
                        <span key={index} className={index === currentIndex ? 'dot filled' : 'dot'}></span>
                    ))}
                </CardActions>
            </Card>
            {/* <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography variant='h2' color="primary" gutterBottom>
                        My Favorite Refraims
                    </Typography>

                    <Typography variant="body2">
                        (complete your first refraim session to save a favorite refraim here!)
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card> */}

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

            <Nav />
        </div>
    );
}

export default Home;