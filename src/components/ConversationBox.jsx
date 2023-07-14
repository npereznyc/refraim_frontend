import React from "react"
import { useState } from "react"
import loadingImage from '../assets/loading.svg'
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";
import AuthContext from '../auth';
import { useContext } from 'react';


function ConversationBox() {
    const [userInput, setUserInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [messages, setMessages] = useState([])
    const userMessages = messages.filter(message => message.sender === "user")
    let {user} = useContext(AuthContext)


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
    
        // Make a POST request to your backend
        const response = await fetch(`https://refraimbackend-d7bf67f60222.herokuapp.com/allconversations/${user.user_id || user.id}/`, {
            //update url with <id>
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Include your token in the 'Authorization' header:
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
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

                <div id="setupInputContainer">{loading && <img src={loadingImage} className="loading" id="loading" />}</div>
                {messages.map((message, index) => (
                    <p key={index} className={message.sender}>
                        {message.text}
                    </p>
                ))}
                {userMessages.length < 1 ? (
                    <>
                        <TextField
                            id="outlined-basic"
                            label="What are you thinking..."
                            variant="outlined"
                            value={userInput}
                            onChange={handleInputChange} />
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