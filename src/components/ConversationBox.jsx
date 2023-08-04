import React from "react"
import { useState } from "react"
import loadingImage from '../assets/loading.svg'
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";
import AuthContext from '../auth';
import { useContext } from 'react';
import Like from "./Like";
import Brain_Notes from '../assets/Brain_Notes.png'
import Brain_Bulb from '../assets/Brain_Bulb.png'
import { Typography } from "@mui/material";

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
                                <Typography variant='body2'>
                                    Negative thought: {messages[0].text}
                                </Typography>

                                <div className='icon-dash'>
                                    <img className='brain-icon-left' src={Brain_Notes} alt='Brain with arms and legs taking notes' />
                                    <hr className='dash' />
                                </div>

                                <Typography variant='body2' className="convo-text1">
                                    Refraim: {messages[messages.length - 1].text}
                                </Typography>

                                <br />

                                <Typography variant='body2'>
                                    Does this sound accurate?
                                </Typography>

                                <br />
                                <div className='validation-buttons'>
                                    <Button variant="contained"
                                        onClick={() => handleValidationResponse('yes')}>Yes</Button>
                
                                    <Button variant="contained"
                                        onClick={() => handleValidationResponse('no')}>No</Button>
                                </div>


                            </div>
                            : validation === 'validated' ?
                                <div className='validated'>
                                    <Typography variant='body2'>
                                        Negative thought: {messages[0].text}
                                    </Typography>

                                    <div className='icon-dash'>
                                        <img className='brain-icon-left' src={Brain_Notes} alt='Brain with arms and legs taking notes' />
                                        <hr className='dash' />
                                    </div>

                                    <Typography variant='body2' className="convo-text1">
                                        Refraim: {messages[messages.length - 1].text}
                                    </Typography>

                                    <div className='icon-dash'>
                                        <hr className='dash' />
                                        <img className='brain-icon-right' src={Brain_Bulb} alt='Brain with arms and legs taking notes' />

                                    </div>

                                    <Typography variant='body2' className="convo-text1">
                                        Refraim: Based on our conversation, here's a new way you could look at things moving forward:
                                    </Typography>

                                    <Typography variant='body2' className="convo-text1">
                                        "{conclusion}"
                                    </Typography>


                                    <Like className='like-button' conversationId={conversationId} initialFavorite={false} />
                                    <br />
                                    <Button className='complete-button' variant="contained"
                                        href='/complete'>Complete</Button>
                                </div>
                                : null
                )}

            </div>
        </section>
    );
}

export default ConversationBox;