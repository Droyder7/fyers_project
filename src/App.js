import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router';
import { getCredentialsFromDb } from './utility/Utils';

const App = () => {
    const [credentail, setCredentail] = useState(null);

    useEffect(() => {
        console.log("calling useEffect");
        getCredentialsFromDb(credentail => setCredentail(credentail));
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
