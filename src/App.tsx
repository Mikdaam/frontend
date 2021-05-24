import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import PrivateRoute from './components/PrivateRoute';
import Welcome from './components/Welcome';

function App() {
    const [isAuth, setIsAuth] = useState<boolean>(false);
    return (
        <Router>
            <Switch>
                <Route exact path='/'>
                    <Welcome setIsAuth={setIsAuth}/>
                </Route> /
                <PrivateRoute exact path='/home' isAuth={isAuth}>
                    <Home />
                </PrivateRoute>
            </Switch>
        </Router>
    );
};

export default App;