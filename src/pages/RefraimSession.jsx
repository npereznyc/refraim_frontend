import React from "react"
import ConversationBox from "../components/ConversationBox";
import { Typography } from "@mui/material";
import dateFormat from 'dateformat'
import Nav from "../components/Nav";

function RefraimSession() {
    const now = new Date();
    return (
        <section id="convo-container">
            <div className="setup-inner">
                <div className="refraim-prompt" id="refraim-prompt">
                    <Typography className='date' variant='body1' id="convo-text">
                        {dateFormat(now, "mmmm dS")}
                    </Typography>
                    <br />
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