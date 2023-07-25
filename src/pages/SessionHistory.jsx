import React, { useState, useEffect } from "react"
import AuthContext from '../auth';
import { useContext } from 'react';
import Nav from "../components/Nav";

// import axios from "axios"

const API_URL = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:8000' // Your local Django server's URL
  : 'https://refraimbackend-d7bf67f60222.herokuapp.com'; // Your deployed Django server's URL

function AllConversations() {
    const [conversations, setConversations] = useState([])
    let {user} = useContext(AuthContext)

    useEffect(() => {
        fetchConversations()
    }, [])

    const fetchConversations = async () => {
        let urlParts = window.location.pathname.split('/');
        let userId = urlParts[urlParts.length - 1]; 
        try {
            const response = await fetch(`${API_URL}/allconversations/${user.user_id || user.id}/`);
            if (response.ok) {
                const data = await response.json();
                setConversations(data);
            } else {
                console.error('Error:', response);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div>
            <h1>Refraim History</h1>
            {conversations.map(conversation => (
                <div key={conversation.id}>
                    <h3>{new Date(conversation.created_at).toLocaleString()}</h3>
                    <p>Negative Thought: {conversation.prompt}</p>
                    <p>Positive Refraim: {conversation.refraim}</p>
                    <hr />
                </div>
            ))}
            <Nav />
        </div>
    );
}

export default AllConversations;