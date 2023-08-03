import React, { useState, useEffect } from "react"
import AuthContext from '../auth';
import { useContext } from 'react';
import Nav from "../components/Nav";
import { Typography } from "@mui/material";
import Like from "../components/Like";

// import axios from "axios"

const API_URL = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:8000' // Your local Django server's URL
  : 'https://refraim-backend-e8c71717cd42.herokuapp.com'; // Your deployed Django server's URL

function AllConversations() {
    const [conversations, setConversations] = useState([])
    let {user} = useContext(AuthContext)

    useEffect(() => {
        fetchConversations()
    }, [])

    const fetchConversations = async () => {
        // let urlParts = window.location.pathname.split('/');
        // let userId = urlParts[urlParts.length - 1]; 
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
    }

    return (
        <div className='history-section'>
            <Typography variant="h1" color='primary' >Refraim History</Typography>
            {conversations.reverse().map(conversation => (
                <div className='history' key={conversation.id}>
                    <Typography variant='h3'>{new Date(conversation.created_at).toLocaleString()}</Typography>
                    <br />
                    <Typography variant='body1'>Negative Thought: {conversation.prompt}</Typography>
                    <br />
                    <Typography variant='body1'>Positive Refraim: {conversation.conclusion}</Typography>
                    <hr />
                <Like conversationId={conversation.id} initialFavorite={conversation.is_favorite}/>
                </div>
            ))}
            <br />
            <Nav />
        </div>
    );
}

export default AllConversations;