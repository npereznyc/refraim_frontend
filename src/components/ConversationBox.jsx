import React from "react"
import { useState } from "react"
import loadingImage from '../assets/loading.svg'
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";


function ConversationBox() {
    const [userInput, setUserInput] = useState('')
    // const [ReframeText, setRefreameText] = useState('')
    const [loading, setLoading] = useState(false)
    const [messages, setMessages] = useState([])
    const userMessages = messages.filter(message => message.sender === "user")


    const handleInputChange = (event) => {
        setUserInput(event.target.value)
    }

    const handleButtonClick = () => {
        if (userInput) {
            setLoading(true)
            setMessages([...messages, { text: userInput, sender: "user" }])
            // setRefreameText('Ok, give me a moment while my digital brain digests that...')
            fetchBotReply(userInput)
            setUserInput('')
        }
    }

    async function fetchBotReply(userInput) {
        setLoading(true);
        setMessages([...messages, { text: userInput, sender: "user" }]);
    
        // Make a POST request to your backend
        const response = await fetch('http://localhost:8000/allconversations/1/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Include your token in the 'Authorization' header
                // 'Authorization': `Bearer ${localStorage.getItem('access_token')}`
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
    

    // async function fetchBotReply(userInput) {
    //     // Simulating delay with setTimeout - will replace this with actual API request
    //     // Delay represents time we're waiting for the AI to respond
    //     setTimeout(() => {
    //         // Simulate the AI response:
    //         const aiResponse = 'Here are some ways we can reframe that thought... ';
    //         //fetch call to our API endpoint that will then call to OpenAI - allconversations/<int:id>/
    //         setMessages(oldMessages => [...oldMessages, { text: aiResponse, sender: "Refraim" }]);
    //         // Update the state with the AI response and stop the loading spinner:
    //         // setRefreameText(aiResponse);
    //         setLoading(false);
    //     }, 2000);  // 2 seconds delay
    // }
    return (
        <section id="convo-container">
            <div className="setup-inner setup-input-container" id="setup-input-container">


                {/* <p>{ReframeText}</p> */}

                <div id="setupInputContainer">{loading && <img src={loadingImage} className="loading" id="loading" />}</div>
                {messages.map((message, index) => (
                    <p key={index} className={message.sender}>
                        {message.text}
                    </p>
                ))}
                {userMessages.length < 2 && (
                    <>
                        <TextField
                            id="outlined-basic"
                            label="What are you thinking..."
                            variant="outlined"
                            value={userInput}
                            onChange={handleInputChange} />
                        <Button
                            variant="outlined"
                            onClick={handleButtonClick}>Send</Button>
                    </>
                )}

            </div>
        </section>
    );
}

export default ConversationBox;