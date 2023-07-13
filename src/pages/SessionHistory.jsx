import React, { useState, useEffect } from "react"
// import axios from "axios"

function AllConversations() {
    const [conversations, setConversations] = useState([])

    useEffect(() => {
        fetchConversations()
    }, [])

    const fetchConversations = async () => {
        let urlParts = window.location.pathname.split('/');
        let userId = urlParts[urlParts.length - 1]; 
        try {
            const response = await fetch(`http://localhost:8000/allconversations/${userId}/`);
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
    // const fetchConversations = async () => {
    //     try {
    //         const response = await axios.get('http://localhost:8000/allconversations/1/');
    //         console.log(response.data)
    //         setConversations(response.data);
    //     } catch (error) {
    //         console.error('Error:', error);
    //     }
    // }

    return (
        <div>
            <h1>Refraim History</h1>
            {conversations.map(conversation => (
                <div key={conversation.id}>
                    <h3>{new Date(conversation.created_at).toLocaleString()}</h3>
                    <p>Negative Thought: {conversation.prompt}</p>
                    <p>Refraim: {conversation.refraim}</p>
                    <hr />
                </div>
            ))}
        </div>
    );
}

export default AllConversations;