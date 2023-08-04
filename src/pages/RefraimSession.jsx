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
                    
                    <Typography variant='body1' className="convo-text">
                        <img className='brain-icon' src={Brain_Chat} alt='Brain with arms and legs cheering' />Life can be tough. What negative thoughts are you having?
                    </Typography>
                </div>
            </div>
            <ConversationBox />
            <Nav />
        </section>
    );
}

export default RefraimSession;