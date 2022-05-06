import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fyersAuthTokenUrl } from './Constants';
import { getAccesstoken, saveCredentailsInDb } from './utility/Utils';

// this component is made for server side authentication and fill all the required data into db
const AuthComponent = () => {
    const [searchedParams] = useSearchParams();

    useEffect(() => {
        // window.location.assign
        const responseCode = searchedParams.get("code");
        if (responseCode === "200") {
            const responseAuthCode = searchedParams.get("auth_code");
            console.log(`authcode: ${responseAuthCode}`);
            getAccesstoken(responseAuthCode);
            saveCredentailsInDb("authcode", responseAuthCode);
        } else {
            console.error(`Error occured, resposeStatus: ${responseCode}`);
        }



    });

    return <>
        <a href={fyersAuthTokenUrl}>
            Authenticate
        </a>
    </>;
}

export default AuthComponent
