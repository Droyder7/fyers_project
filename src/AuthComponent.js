import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fyersAuthTokenUrl } from './constants';
import CustomResponse from './CustomResponse';
import { getAccesstoken, saveCredentailsInDb } from './utility/utils';

// this component is made for server side authentication and fill all the required data into db
const AuthComponent = () => {
    const [searchedParams] = useSearchParams();

    useEffect(() => {
        const responseStatus = searchedParams.get("s");
        const responseState = searchedParams.get("state");
        const response = new CustomResponse(responseStatus, responseState);
        if (response.checkIfSuccessCode() && response.checkIfSuccessState()) {
            const responseAuthCode = searchedParams.get("auth_code");
            response.authCode = responseAuthCode;
            getAccesstoken(response);
            saveCredentailsInDb(response);

        } else {
            console.error(`Error occured, resposeStatus: ${responseStatus}`);
        }



    });

    return <>
        <a href={fyersAuthTokenUrl}>
            Authenticate
        </a>
    </>;
}

export default AuthComponent
