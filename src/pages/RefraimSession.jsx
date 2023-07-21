import React from "react"
import ConversationBox from "../components/ConversationBox";
import { Typography } from "@mui/material";


function RefraimSession() {

    return (
        <section id="convo-container">
            <div className="setup-inner">
                <div className="refraim-prompt" id="refraim-prompt">
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