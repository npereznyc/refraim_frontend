import React, { useContext } from 'react';
import AuthContext from '../auth';
import { Typography } from '@mui/material';
import Nav from '../components/Nav';
import Like from '../components/Like';
import { Button } from '@mui/material';
import useFavorites from '../components/useFavorites';


function Favorites() {

    let { user } = useContext(AuthContext)
    const {favorites, loading} = useFavorites(user.user_id || user.id)

    return (
        <div className='history-section'>
            <Typography variant="h1" color='primary' >Favorites</Typography>
            <br />
            {loading ? (
                <Typography variant='h2' id="convo-text">
                    Your Favorite Refraims are loading...
                </Typography>
            ) :
                favorites.length < 1 ? (
                    <>
                        <Typography variant='body1' id="convo-text">
                            You haven't saved any Refraims to your favorites yet! <br />
                        </Typography>
                        <br />
                        <Typography variant='body1' id="convo-text">
                            Start a new Refraim Session: <br />
                        </Typography>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            href='/pre-prompt'
                            style={{ marginTop: '1em' }} >
                            Begin
                        </Button>
                    </>

                ) : favorites.reverse().map(conversation => (
                    <div className='history' key={conversation.id}>
                        <Typography variant='h2' className='convo-text'>{new Date(conversation.created_at).toLocaleString()}</Typography>
                        <br />
                        <Typography className='convo-text' variant='body1'>Negative Thought: {conversation.prompt}</Typography>
                        <br />
                        <Typography className='convo-text' variant='body1'>Positive Refraim: {conversation.conclusion} </Typography>
                        <Like className='like-button' conversationId={conversation.id} initialFavorite={conversation.is_favorite} />
                        <hr />
                    </div>
                ))
            }
            <br />
            <Nav />
        </div>
    );
}

export default Favorites;