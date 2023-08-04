import React from "react"
import ConversationBox from "../components/ConversationBox";
import { Typography } from "@mui/material";
import dateFormat from 'dateformat'
import Nav from "../components/Nav";
import Brain_Chat from '../assets/Brain_Chat.png'

function RefraimSession() {
    const now = new Date();
    return (
        <section id="convo-container">
            <div>
                <Typography className='date' variant='body1'>
                        {dateFormat(now, "mmmm dS")}
                    </Typography>
                    <br />
                <div className="refraim-prompt" id="refraim-prompt">
                    
                    <img className='brain-icon' src={Brain_Chat} />
             
                    <Typography variant='body1' id="convo-text">
                        Life can be tough. What negative thoughts are you having?
                    </Typography>
                    
                </div>
            </div>
            <ConversationBox />
            <Nav />
        </section>
    );
}

export default RefraimSession;