import React, { useContext, useState } from 'react';
import { Button, CardContent, Typography, CardActions, Card } from '@mui/material';
import AuthContext from '../auth';
import SwipeableViews from 'react-swipeable-views';
import useFavorites from '../components/useFavorites';
import useUserDetails from '../components/userDetails';
import Nav from '../components/Nav';
import loadingImage from '../assets/loading.svg'
import Brain_Wink from '../assets/Brain_Wink.png'

function Home() {

    let { user } = useContext(AuthContext)
    const { userDetails } = useUserDetails(user.user_id || user.id)
    const [currentIndex, setCurrentIndex] = useState(0)
    const { favorites, loading } = useFavorites(user.user_id || user.id)

    const handleChangeIndex = index => {
        setCurrentIndex(index);
    };

    return (
        <div className="homepage">
            {loading ? '' : userDetails ? (
                <Typography variant='h1' color="primary" gutterBottom>
                    Welcome, {userDetails.first_name}
                </Typography>
            ) : ''}

            <br />
            <div className='homepage-cards'>
                <Card >
                    <CardContent>
                        <Typography variant='h2' color="primary" gutterBottom>
                            My Favorite Refraims
                        </Typography>
                        {loading ? (
                            <Typography variant='h2' id="convo-text">
                                <div id="loading">{loading && <img height='30px' width='30px' src={loadingImage} className="loading" id="loading" alt='loading circles' />}</div>
                            </Typography>
                        ) : favorites.length >= 1 ? (
                            <>
                                <SwipeableViews
                                    index={currentIndex}
                                    onChangeIndex={(index) => setCurrentIndex(index)} >
                                    {favorites.map((favorite, index) => (
                                        <div key={index}>
                                            <Typography variant="body2">
                                                {favorite.conclusion} {/* Render the favorite */}
                                            </Typography>
                                        </div>
                                    ))}
                                </SwipeableViews>
                                <div className='yes-no-buttons'>
                                    <Button disabled={currentIndex === 0} onClick={() => handleChangeIndex(currentIndex - 1)}>
                                        Previous
                                    </Button>
                                    <Button disabled={currentIndex === favorites.length - 1} onClick={() => handleChangeIndex(currentIndex + 1)}>
                                        Next
                                    </Button>
                                </div>

                            </>) : (
                            <>
                                <Typography variant="body2">
                                    (complete your first refraim session to save a favorite refraim here!)
                                </Typography></>)}
                    </CardContent>

                    <CardActions className='dots'>
                        {Array.from({ length: favorites.length }).map((_, index) => (
                            <span key={index} className={index === currentIndex ? 'dot filled' : 'dot'}></span>
                        ))}
                    </CardActions>
                </Card>
                <br />
                <Card >
                    <CardContent>
                        <Typography variant='h2' color="primary" gutterBottom>
                            New Refraim Session
                        </Typography>

                        <Typography variant="body2">
                            Let me help you refraim your negative thoughts.
                        </Typography>
                    </CardContent>
                    <CardActions style={{ justifyContent: 'center' }}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            href='/pre-prompt'
                            style={{ marginTop: '1em' }} >
                            Begin
                        </Button>
                    </CardActions>
                </Card>

            </div>

            <img className='large-brain' src={Brain_Wink} alt='Brain with arms and legs winking' />
            <Nav />
        </div>
    );
}

export default Home;