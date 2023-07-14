import React from "react"
import { useState } from "react"
import loadingImage from '../assets/loading.svg'
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";
import ConversationBox from "../components/ConversationBox";


function RefraimSession() {
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
            <div className="setup-inner">
                <div className="speech-bubble-ai" id="speech-bubble-ai">
                    <h4 id="convo-text">
                        Life can be tough. <br></br>
                        Share a negative thought you've been having and let's see if we can reframe it.
                    </h4>
                </div>
            </div>
            <ConversationBox />
        </section>
    );
}

export default RefraimSession;