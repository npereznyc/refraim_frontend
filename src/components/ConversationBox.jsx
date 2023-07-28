import React from "react"
import { useState } from "react"
import loadingImage from '../assets/loading.svg'
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";
import AuthContext from '../auth';
import { useContext } from 'react';

const API_URL = process.env.NODE_ENV === 'development'
    ? 'http://localhost:8000' // Your local Django server's URL
    : 'https://refraim-backend-e8c71717cd42.herokuapp.com'; // Your deployed Django server's URL

function ConversationBox() {
    const [userInput, setUserInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [messages, setMessages] = useState([])
    const [validation, setValidation] = useState('none') //NEW CODE
    const [conversationId, setConversationId] = useState('') //NEW CODE
    const [conclusion, setConclusion] = useState('')
    const userMessages = messages.filter(message => message.sender === "user")
    let { user } = useContext(AuthContext)

    const handleInputChange = (event) => {
        setUserInput(event.target.value)
    }

    const handleButtonClick = () => {
        if (userInput) {
            setLoading(true)
            setMessages([...messages, { text: userInput, sender: "user" }])
            fetchBotReply(userInput)
            setUserInput('')
            setValidation('validating')//NEW CODE
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
            console.log(data)
            const aiResponse = data.refraim;
            // Save the conversationId in the state or in a variable depending on your needs
            setConversationId(data.id);  //NEW CODE
            setConclusion(data.conclusion)
            setMessages(oldMessages => [...oldMessages, { text: aiResponse, sender: "Refraim" }]);
        } else {
            // Handle error
            console.error('Error:', response);
        }

        setLoading(false);
    }
    
    const handleValidationResponse = async (answer) => {
        if (answer === 'yes') {
            setValidation('validated')
            //DISPLAY CONCLUSION HERE
        } else {
            //if the answer is no, make a call to the backend to generate a new response:
            setConclusion('resubmit')
            const lastUserMessage = userMessages[userMessages.length - 1].text;
            const lastBotMessage = messages[messages.length - 1].text;
            const newBotReply = await fetchUpdatedBotReply(lastUserMessage, lastBotMessage);
            setMessages(oldMessages => [...oldMessages, { text: newBotReply, sender: "Refraim" }]);
        }
    }

    async function fetchUpdatedBotReply(userInput, botResponse) {
        setLoading(true);
    
        // Make a POST request to backend
        const response = await fetch(`${API_URL}/conversation/${conversationId}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                // Include your token in the 'Authorization' header:
                // 'Authorization': Bearer ${localStorage.getItem('access_token')}
            },
            body: JSON.stringify({ 
                prompt: userInput,
                refraim: botResponse 
            })
        });
        if (response.ok) {
            const data = await response.json();
            // Assuming the response data contains the AI's updated response
            const updatedAiResponse = data.refraim;
            return updatedAiResponse;
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
                            multiline />
                        <br />
                        <br />
                        <Button
                            variant="contained"
                            onClick={handleButtonClick}>Send</Button>
                    </>
                ) : (
                    validation === 'none' ? <p>Does this sound accurate?</p> : validation === 'validating' ?
                        <div>
                            <Button variant="contained"
                                onClick={() => handleValidationResponse('yes')}>Yes</Button>
                            <Button variant="contained"
                                onClick={() => handleValidationResponse('no')}>No</Button>
                        </div>
                        :
                        <Button variant="contained"
                            href='/complete'>Complete</Button>
                )}

            </div>
        </section>
    );
}

export default ConversationBox;