import React from "react"
import { useState } from "react"
import loadingImage from '../assets/loading.svg'
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";


function ConversationBox() {
    const [userInput, setUserInput] = useState('')
    const [ReframeText, setRefreameText] = useState('')
    const [loading, setLoading] = useState(false)

    const handleButtonClick = () => {
        if (userInput) {
            setLoading(true)
            setRefreameText('Ok, give me a moment while my digital brain digests that...')
            // fetchBotReply(userInput)
            // fetchSynopsis(userInput)
        }
    }
    const handleInputChange = (event) => {
        setUserInput(event.target.value)
    }
    return (
        <section id="convo-container">
            <div class="setup-inner">
                <div class="speech-bubble-ai" id="speech-bubble-ai">
                    <p id="convo-boss-text">
                        Share a negative thought you've been having and let's see if we can reframe it.
                    </p>
                </div>
            </div>
            <div class="setup-inner setup-input-container" id="setup-input-container">
                <TextField id="outlined-basic" label="ype your negative thought here" variant="outlined" onChange={handleInputChange} />
                <Button variant="outlined" onClick={handleButtonClick}>Send</Button>

                <div id="setupInputContainer">{loading && <img src={loadingImage} className="loading" id="loading" />}</div>
                <p>{ReframeText}</p>
            </div>
        </section>
    );
}

export default ConversationBox;