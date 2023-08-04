import React from "react"
import { useState } from "react"
import loadingImage from '../assets/loading.svg'
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";
import AuthContext from '../auth';
import { useContext } from 'react';
import Like from "./Like";

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
            setValidation('none')
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
            const aiResponse = data.refraim;
            // Save the conversationId in the state or in a variable depending on your needs
            setConversationId(data.id);
            setMessages(oldMessages => [...oldMessages, { text: aiResponse, sender: "Refraim" }]);
            setValidation('validating')
            setConclusion(data.conclusion)
        } else {
            // Handle error
            console.error('Error:', response);
        }

        setLoading(false);
    }

    const handleValidationResponse = async (answer) => {
        if (answer === 'yes') {
            setValidation('validated')
        } else if (answer === 'no') {
            //if the answer is no, make a call to the backend to generate a new response:
            setValidation('validating')
            const lastUserMessage = userMessages[userMessages.length - 1].text;
            const lastBotMessage = messages[messages.length - 1].text;
            const newBotReply = await fetchUpdatedBotReply(lastUserMessage, lastBotMessage);
            setMessages(oldMessages => [...oldMessages, { text: newBotReply, sender: "Refraim" }]);
        }
    }

    async function fetchUpdatedBotReply(userInput, botResponse, conclusion) {
        console.log('conclusion: ', conclusion, 'botResponse: ', botResponse)
        setLoading(true);

        try {
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
                    refraim: botResponse,
                    conclusion: 'resubmit',
                    user: user.user_id || user.id
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
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <section id="convo-container">
            <div className="input-container" id="input-container">
                <div id="loading">{loading && <img src={loadingImage} className="loading" id="loading" alt='loading circles' />}</div>
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
                    validation === 'none' ?
                        <div>
                            Negative thought: {messages[0].text}
                        </div>
                        : validation === 'validating' ?
                            <div className='validating'>
                                <p>Negative thought: {messages[0].text}</p>
                                <p>Refraim: {messages[messages.length - 1].text}</p>
                                <p>Does this sound accurate?</p>
                                <Button variant="contained"
                                    onClick={() => handleValidationResponse('yes')}>Yes</Button>
                                <Button variant="contained"
                                    onClick={() => handleValidationResponse('no')}>No</Button>
                            </div>
                            : validation === 'validated' ?
                                <div className='validated'>
                                    <p>Negative thought: {messages[0].text}</p>
                                    <p>Refraim: {messages[messages.length-1].text}"</p>
                                    <p>Refraim: Based on our conversation, here's a new way you could look at things moving forward:</p><p>"{conclusion}"</p>
                                    <Like className='like-button'conversationId={conversationId} initialFavorite={false}/>
                                    <br/>
                                    <Button variant="contained"
                                        href='/complete'>Complete</Button>
                                </div>
                                : null
                )}

            </div>
        </section>
    );
}

export default ConversationBox;