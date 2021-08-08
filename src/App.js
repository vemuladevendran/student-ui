import './App.css';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Login from './components/login/login';
import AppShell from './components/app-shell/app-shell'
import { init } from './service/auth/auth-token';
import { useState } from 'react';
import TokenServe from './service/token'
init();


function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const token = TokenServe.isTokenExist()
  if (token === false) {
    // console.log(token)
  }
  return (
    <div className="App h-100">
      <BrowserRouter>

        {
          !loggedIn ? (
            <Switch>
              <Route exact path='/login'>
                <Login></Login>
              </Route>
              <Redirect to="/login"></Redirect>
            </Switch>
          ) : (
            <Switch>
              <Route path='/students'>
                <AppShell></AppShell>
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
