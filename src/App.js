import './App.css';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Login from './components/login/login';
import Forgetpassword from './components/forget-password/forgetpassword';
import ResetPassword from './components/forget-password/reset-password/reset-password';
import AppShell from './components/app-shell/app-shell'
import { init } from './service/auth/auth-token';
import { useState } from 'react';
import TokenServe from './service/token/token'
import '../node_modules/share-api-polyfill/dist/share-min.js'
init();


function App() {
  const token = TokenServe.isTokenExist();
  const [loggedIn, setLoggedIn] = useState(token);
  return (
    <div className="App h-100">
      <BrowserRouter>

        {
          !loggedIn ? (
            <Switch>
              <Route exact path='/login'>
                <Login setLoggedIn={setLoggedIn}></Login>
              </Route>
              <Route exact path='/forget-password'>
                <Forgetpassword></Forgetpassword>
              </Route>
              <Route exact path='/reset-password/:id/:otp'>
                <ResetPassword></ResetPassword>
              </Route>
              <Redirect to="/login"></Redirect>
            </Switch>
          ) : (
            <Switch>
              <Route path='/'>
                <AppShell setLoggedIn={setLoggedIn}></AppShell>
              </Route>
              <Redirect to="/students"></Redirect>
            </Switch>
          )
        }
      </BrowserRouter>

    </div>
  );
};

export default App;
