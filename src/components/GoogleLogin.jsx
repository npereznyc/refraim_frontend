import React from "react";
import { Button } from "@mui/material";

function GoogleLogin() {
    const REACT_APP_GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    const REACT_APP_BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL;

    const onGoogleSucess = () => {
        const googleAuthUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
        const scope = [
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/userinfo.profile'
        ].join(' ');

        const params = {
            response_type: 'code',
            client_id: REACT_APP_GOOGLE_CLIENT_ID,
            redirect_uri: `${REACT_APP_BACKEND_API_URL}/googlelogin/`,
            prompt: 'select_account',
            access_type: 'offline',
            scope
        };
        const urlParams = new URLSearchParams(params).toString();
        window.location = `${googleAuthUrl}?${urlParams}`;
    }
    return (
        <>
        <Button
                type="submit"
                variant="outlined"
                color="primary"
                onClick={onGoogleSucess}
                style={{ marginTop: '1em' }}>
                Sign in with Google
            </Button>
        </>
    )
}

export default GoogleLogin;