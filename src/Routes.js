import { Route, Routes as Switch } from 'react-router';
import App from './App';
import './App.css';
import AuthComponent from './AuthComponent';

function Routes() {
  return (
    <>
      <Switch>
        <Route path="/" exact element={<App />} />
        <Route path="/auth" exact element={<AuthComponent />} />
      </Switch>
    </>
  );
}

export default Routes;
