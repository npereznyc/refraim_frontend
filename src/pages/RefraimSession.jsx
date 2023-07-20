import React from "react"
import ConversationBox from "../components/ConversationBox";


function RefraimSession() {

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