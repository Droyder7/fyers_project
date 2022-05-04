import axios from 'axios';
import AuthComponent from '../AuthComponent';
import { fyersValidateAuthcode } from '../constants'

export const getCredentials = next => {
    let found = getCredentialsFromDb(next);
    if (!found) {
        return getCredentialsFromWeb(next);
    }
}
export const getCredentialsFromDb = next => next(null);

const getCredentialsFromWeb = next => {
    return <>
        <AuthComponent />;
    </>
}

export const getAccesstoken = response => {
    axios.post(fyersValidateAuthcode, {
        grant_type: "authorization_code",
        appIdHash: "",
        code: response.authcode
    }, {
        headers: {
            "Content-Type": "application/json"
        }
    }
    ).then(res => {
        console.log(res.data);
        // update all the value in response object
        saveCredentailsInDb(response);
    }).catch(err => {
        console.log(err);
    });

}

export const saveCredentailsInDb = response => {
}
