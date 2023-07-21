import React from "react"
import ConversationBox from "../components/ConversationBox";
import { Typography } from "@mui/material";
import dateFormat from 'dateformat'

function RefraimSession() {
    const now = new Date();
    return (
        <section id="convo-container">
            <div className="setup-inner">
                <div className="refraim-prompt" id="refraim-prompt">
                    <p>{dateFormat(now, "mmmm dS")}</p>
                    <Typography variant='body1' id="convo-text">
                        Life can be tough. What negative thoughts are you having?
                    </Typography>
                </div>
            </div>
            <ConversationBox />
        </section>
    );
}

export default RefraimSession;