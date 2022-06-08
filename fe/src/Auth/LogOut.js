import React from 'react'
import { GoogleLogout } from 'react-google-login'

const LogOut = () => {
    const handleSuccess = res => {
        console.log(res);
    }

    const handleFailure = res => {
        console.log(res);
    }
    
    return (
        <GoogleLogout
            clientId={process.env.REACT_APP_OAUTH_CLIENT_ID}
            onLogoutSuccess={handleSuccess}
            onFailure={handleFailure}
        />
    )

}

export default LogOut