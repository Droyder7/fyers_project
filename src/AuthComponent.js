import localforage from 'localforage';
import React, { useContext, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fyersAuthTokenUrl } from './Constants';
import { UserContext } from './Routes';
import { getAccesstoken, getProfileInfo } from './utility/Utils';
import { Navigate } from 'react-router'

// this component is made for server side authentication and fill all the required data into db
const AuthComponent = () => {
    const [searchedParams] = useSearchParams();
    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        // window.location.assign
        const responseCode = searchedParams.get("code");
        if (responseCode === "200") {
            const responseAuthCode = searchedParams.get("auth_code");
            console.log(`authcode: ${responseAuthCode}`);
            getAccesstoken(responseAuthCode);
            getProfileInfo();
            localforage.getItem("user").then(user => setUser(user));
            // now save the info into redux.store or context ==> user
        } else {
            console.error(`Error occured, resposeStatus: ${responseCode}`);
        }
    });

    return <>
        {
            user ?
                <Navigate to="/" /> :
                <a href={fyersAuthTokenUrl}>Authenticate</a>
        }
    </>;
}

export default AuthComponent
