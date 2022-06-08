import axios from 'axios';
import localforage from 'localforage';
import { appIdHash, clientId, fyersGetHoldingsInfo, fyersGetProfileInfo, fyersValidateAuthcode } from '../Constants';

export const getAccesstoken = (code, next = a => { }) => {
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
            const expiryTime = Date.now() + 24 * 3600 * 1000; // date in miliseconds
            const user = {
                "accessToken": accessToken,
                "expiryTime": expiryTime,
                "code": code
            };
            getProfileInfo(user, next);
        })
        .catch(err => {
            console.log(err?.data?.message);
        });
}

export const getProfileInfo = (user = {}, next = a => { }) => {
    const config = {
        method: 'get',
        url: fyersGetProfileInfo,
        headers: {
            'Authorization': `${clientId}:${user.accessToken}`
        }
    };
    axios(config).then(res => {
        console.log(res.data);
        const { display_name: name, fy_id: fyersId, email_id: email } = res.data.data;
        user["profile"] = { name, fyersId, email };
        saveCredentialsInDb(user, next);
    }).catch(err => console.error(err));
}

export const getHoldingsInfo = (user = {}, next = a => { }) => {
    const config = {
        method: 'get',
        url: fyersGetHoldingsInfo,
        headers: {
            'Authorization': `${clientId}:${user.accessToken}`
        }
    };

    axios(config).then(res => {
        console.log(res.data);
        const { holdings } = res.data;
        console.log(holdings);
        // saveDataInDb(user, next);
    }).catch(err => console.error(err));


}

const saveCredentialsInDb = (obj = {}, next = a => { }) => {
    localforage.getItem("user").then(user => {
        if (user == null) {
            user = {};
        }
        for (const key in obj) {
            user[key] = obj[key];
        }
        localforage.setItem("user", user)
            .then(user => {
                next(user);
                console.log(`Successfully saved into db ${user}`);
            })
            .catch(err => console.error(err));
    }).catch(err => console.error(err));
}

export const placeOrder = (accountSize, entry, sl, percentOfRisk) => {

}

export const getQuantity = (accountSize, entry, sl, percentageOfRisk) => {
    const riskCapital = Math.ceil(accountSize * percentageOfRisk * 0.01);
    const lossAmount = Math.abs(entry - sl);
    return Math.ceil(riskCapital / lossAmount);
}

export const fetchUserFromDb = user => {
    const { email, name, id} = user;

};
