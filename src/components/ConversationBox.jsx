import React from "react"
import { useState } from "react"
import loadingImage from '../assets/loading.svg'
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";
import AuthContext from '../auth';
import { useContext } from 'react';

const API_URL = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:8000' // Your local Django server's URL
  : 'https://refraim-backend-e8c71717cd42.herokuapp.com/'; // Your deployed Django server's URL

function ConversationBox() {
    const [userInput, setUserInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [messages, setMessages] = useState([])
    const userMessages = messages.filter(message => message.sender === "user")
    let {user} = useContext(AuthContext)
    console.log(user.id, user.user_id)

    const handleInputChange = (event) => {
        setUserInput(event.target.value)
    }

    const handleButtonClick = () => {
        if (userInput) {
            setLoading(true)
            setMessages([...messages, { text: userInput, sender: "user" }])
            fetchBotReply(userInput)
            setUserInput('')
        }
    }

    async function fetchBotReply(userInput) {
        setLoading(true);
        setMessages([...messages, { text: userInput, sender: "user" }]);
    
        // Make a POST request to backend
        const response = await fetch(`${API_URL}/allconversations/${user.user_id || user.id}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Include your token in the 'Authorization' header:
                // 'Authorization': Bearer ${localStorage.getItem('access_token')}
            },
            body: JSON.stringify({ prompt: userInput })
        });
    
        if (response.ok) {
            const data = await response.json();
            // Assuming the response data contains the AI's response
            const aiResponse = data.refraim;
            setMessages(oldMessages => [...oldMessages, { text: aiResponse, sender: "Refraim" }]);
        } else {
            // Handle error
            console.error('Error:', response);
        }
    
        setLoading(false);
    }
  
    return (
        <section id="convo-container">
            <div className="setup-inner setup-input-container" id="setup-input-container">

                <div id="setupInputContainer">{loading && <img src={loadingImage} className="loading" id="loading" alt='loading circles' />}</div>
                {messages.map((message, index) => (
                    <p key={index} className={message.sender}>
                        {message.text}
                    </p>
                ))}
                {userMessages.length < 1 ? (
                    <>
                        <TextField
                            id="outlined-basic"
                            placeholder="(Tap here and type what you're thinking and/or feeling that is challenging you)"
                            variant="outlined"
                            value={userInput}
                            onChange={handleInputChange} 
                            multiline/>
                            <br/>
                            <br/>
                        <Button
                            variant="contained"
                            onClick={handleButtonClick}>Send</Button>
                    </>
                ) : (
                    <Button variant="contained"
                    href='/complete'>Complete</Button>
                )}

            </div>
        </section>
    );
}

export default ConversationBox;