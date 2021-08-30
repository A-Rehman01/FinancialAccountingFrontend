import React from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Accounts from './Components/Accounts/Accounts'
import Home from './Components/Home/Home'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/accounts/:id' exact component={Accounts} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
