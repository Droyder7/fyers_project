import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { getCredentialsFromDb } from './utility/utils';

const App = () => {
    const [credentail, setCredentail] = useState(null);
    const [searchedParams] = useSearchParams();

    useEffect(() => {
        console.log("calling useEffect");
        getCredentialsFromDb(credentail => setCredentail(credentail));
        console.log(credentail);
        console.log(searchedParams.get("s"));
        console.log(searchedParams.get("code"));
        console.log(searchedParams.get("auth_code"));
    });

    // Navigate to the Location.reload article
    return (
        <div>
            {
                credentail == null ? <Navigate to="/auth" /> : null
            }
        </div>
    )
}

export default App
