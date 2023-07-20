import React from "react"
import ConversationBox from "../components/ConversationBox";
import { Typography } from "@mui/material";


function RefraimSession() {

    return (
        <section id="convo-container">
            <div className="setup-inner">
                <div className="refraim-prompt" id="refraim-prompt">
                    <Typography variant='body1' id="convo-text">
                        Life can be tough. <br></br>
                        Share a negative thought you've been having and let's see if we can reframe it.
                    </Typography>
                </div>
            </div>
            <ConversationBox />
        </section>
    );
}

export default RefraimSession;