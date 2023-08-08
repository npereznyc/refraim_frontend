import React, { useState, useEffect } from "react"
import AuthContext from '../auth';
import { useContext } from 'react';
import Nav from "../components/Nav";
import { Typography } from "@mui/material";
import Like from "../components/Like";
import { Button } from "@mui/material";

const API_URL = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:8000' // Your local Django server's URL
  : 'https://refraim-backend-e8c71717cd42.herokuapp.com'; // Your deployed Django server's URL

function AllConversations() {
    const [conversations, setConversations] = useState([])
    let {user} = useContext(AuthContext)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchConversations()
    }, [])

    const fetchConversations = async () => {
        try {
            const response = await fetch(`${API_URL}/allconversations/${user.user_id || user.id}/`);
            if (response.ok) {
                const data = await response.json();
                console.log('data: ', data)
                setConversations(data);
            } else {
                console.error('Error:', response);
            }
        } catch (error) {
            console.error('Error:', error);
        }
        setLoading(false)
    }

    return (
        <div className='history-section'>
            <Typography variant="h1" color='primary' >Refraim History</Typography>
            <br />
            {loading ? (
                <Typography variant='body1' id="convo-text">
                Your Refraim History is loading...
            </Typography>
            ) :
            conversations.length < 1 ? (
                <>
                <Typography variant='body1' id="convo-text">
                    Complete your first Refraim Session to see your refraim history here <br />
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
            ) :
            conversations.reverse().map(conversation => (
                <div className='history' key={conversation.id}>
                    <Typography variant='h3' className='convo-text' >{new Date(conversation.created_at).toLocaleString()}</Typography>
                    <br />
                    <Typography className='convo-text' variant='body1'>Negative Thought: {conversation.prompt}</Typography>
                    <br />
                    <Typography className='convo-text' variant='body1'>Positive Refraim: {conversation.conclusion}</Typography>
                    <Like conversationId={conversation.id} initialFavorite={conversation.is_favorite}/>
                    <hr />                
                </div>
            ))}
            <br />
            <Nav />
        </div>
    );
}

export default AllConversations;