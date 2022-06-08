import React, { useContext, useEffect } from 'react';
import GoogleLogin from 'react-google-login';
import { Navigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { UserContext } from '../Routes';
import { getAccesstoken } from '../utility/Utils';

// this component is made for server side authentication and fill all the required data into db
const AuthComponent = () => {
    const [searchedParams] = useSearchParams();
    const { user, setUser } = useContext(UserContext);

    const handleSuccess = res => {
        console.log(res);
    }

    const handleFailure = res => {
        console.log(res);
    }

    useEffect(() => {
        const responseCode = searchedParams.get("code");
        if (responseCode === "200") {
            const responseAuthCode = searchedParams.get("auth_code");
            console.log(`authcode: ${responseAuthCode}`);
            getAccesstoken(responseAuthCode, user => setUser(user));            // now save the info into redux.store or context ==> user
        } else {
            console.error(`Error occured, resposeStatus: ${responseCode}`);
        }
    });

    return <>
        {
            user ?
                <Navigate to="/" /> :
                <GoogleLogin
                    clientId={process.env.REACT_APP_OAUTH_CLIENT_ID}
                    buttonText="Login With Google"
                    onSuccess={handleSuccess}
                    onFailure={handleFailure}
                    cookiePolicy="single_host_origin"
                    isSignedIn={true}
                />
                // <a href={fyersAuthTokenUrl}>Authenticate</a>
        }
    </>;
}

export default AuthComponent
