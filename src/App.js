import React, { useContext } from 'react';
import { Navigate } from 'react-router';
import { UserContext } from './Routes';

const App = () => {
    const { user } = useContext(UserContext);

    // Navigate to the Location.reload article
    return (
        <div>
            {
                !user ? <Navigate to="/auth" /> : <p>Hello { user.name == null ? "user" : user.name }</p>
            }
        </div>
    )
}

export default App
