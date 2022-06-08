import { useAuth, useLoginWithRedirect } from "@frontegg/react";
import { ContextHolder } from '@frontegg/rest-api';
import React, { useEffect } from 'react';
import { fetchUserFromDb } from "./utility/Utils";


const App = () => {
    const { user, isAuthenticated } = useAuth();
    const loginWithRedirect = useLoginWithRedirect();

    // Uncomment this to redirect to login automatically
    useEffect(() => {
        if (!isAuthenticated) {
            loginWithRedirect();
        }
        else {
            fetchUserFromDb(user); // think of using rxjs to implement steam and middlewares
        }
    }, [isAuthenticated, loginWithRedirect]);

    const logout = () => {
        const baseUrl = ContextHolder.getContext().baseUrl;
        window.location.href = `${baseUrl}/oauth/logout?post_logout_redirect_uri=${window.location}`;
    };

    return (
        <div className="App">
            {
                isAuthenticated ? (
                    <div>
                        <div>
                            <img src={user?.profilePictureUrl} alt={user?.name} />
                        </div>
                        <div>
                            <span>Logged in as: {user?.name}</span>
                        </div>
                        <div>
                            <button onClick={() => console.log(user)}> Log the details </button>
                        </div>
                        <div>
                            <button onClick={() => logout()}>Click to logout</button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <button onClick={() => loginWithRedirect()}>Click me to login</button>
                    </div>
                )
            }
        </div>
    );

}

export default App;