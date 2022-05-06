import axios from 'axios';
import localforage from 'localforage';
import AuthComponent from '../AuthComponent';
import { appIdHash, appIdHash2, fyersValidateAuthcode } from '../Constants'
import CustomResponse from '../CustomResponse';

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

export const getAccesstoken = code => {
    console.log(`appidHash: ${appIdHash} \n
    code: ${code}`);

    const data = JSON.stringify({
        grant_type: "authorization_code",
        appIdHash,
        code
    });

    const config = {
        method: 'post',
        url: fyersValidateAuthcode,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    axios(config)
        .then(res => {
            console.log(res.data);
            const accessToken = res.data.access_token;
            saveCredentailsInDb("accessToken", accessToken);
        })
        .catch(err => {
            console.log(err);
        });
}

export const saveCredentailsInDb = (keyName, keyValue) => {
    localforage.getItem("user").then(user => {
        user[`${keyName}`] = keyValue;
        localforage.setItem("user", user);
    }).catch(err => console.error(err));
}
