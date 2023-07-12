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
        // Simulating delay with setTimeout - will replace this with actual API request
        // Delay represents time we're waiting for the AI to respond
        setTimeout(() => {
            // Simulate the AI response:
            const aiResponse = 'Here are some ways we can reframe that thought... ';
            setMessages(oldMessages => [...oldMessages, { text: aiResponse, sender: "Refraim" }]);
            // Update the state with the AI response and stop the loading spinner:
            // setRefreameText(aiResponse);
            setLoading(false);
        }, 2000);  // 2 seconds delay


    }
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