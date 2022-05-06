import axios from 'axios';
import localforage from 'localforage';
import AuthComponent from '../AuthComponent';
import { appIdHash, appIdHash2, clientId, fyersGetProfileInfo, fyersValidateAuthcode } from '../Constants'
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
            const expiryTime = Date.now() + 24*3600*1000; // date in miliseconds
            saveCredentailsInDb({accessToken, expiryTime, code});
        })
        .catch(err => {
            console.log(err);
        });
}

export const getProfileInfo = () => {
    const user = localforage.getItem("user")
        .then(user => user)
        .catch(err => console.error(err));

    const  config = {
        method: 'get',
        url: fyersGetProfileInfo,
        headers: {
            'Authorization': `${clientId}:${user.accessToken}`
        }
    };
    axios(config).then(res => {
        saveCredentailsInDb(res.data);
    }).catch(err => console.error(err));
}

const saveCredentailsInDb = (obj) => {
    localforage.getItem("user").then(user => {
        for (const key in obj) {
            user[key] = obj[key];
        }
        localforage.setItem("user", user);
    }).catch(err => console.error(err));
}
