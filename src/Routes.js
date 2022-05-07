import localforage from 'localforage';
import { createContext, useEffect, useState } from 'react';
import { Route, Routes as Switch } from 'react-router';
import App from './App';
import './App.css';
import AuthComponent from './AuthComponent';

const UserContext = createContext();

function Routes() {
  const [user, setUser] = useState();
  useEffect(() => {
    localforage.getItem("user")
      .then(user => setUser(user))
      .catch(err => console.log(err));
    
  }, []);

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <Switch>
          <Route path="/" exact element={<App />} />
          <Route path="/auth" exact element={<AuthComponent />} />
        </Switch>
      </UserContext.Provider>
    </>
  );
}

export { Routes, UserContext };
