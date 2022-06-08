import { FronteggProvider } from '@frontegg/react';
import { createContext, useEffect } from 'react';
import { Route, Routes as Switch } from 'react-router';
import App from './App';
import './App.css';
import AuthComponent from './Auth/AuthComponent';

const contextOptions = {
  baseUrl: 'https://app-fxc4w65uzptj.frontegg.com',
  clientId: 'bb675112-137f-483d-8fd7-542696226ce4'
};


const UserContext = createContext();

function Routes() {

  useEffect(() => {
    
  }, []);

  return (
    <>
      <FronteggProvider contextOptions={contextOptions} hostedLoginBox={true}>
          <Switch>
            <Route path="/" exact element={<App />} />
            <Route path="/auth" exact element={<AuthComponent />} />
          </Switch>
      </FronteggProvider>
    </>
  );
}

export { Routes, UserContext };
