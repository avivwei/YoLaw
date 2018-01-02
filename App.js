import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Signup from './App/Signup';
import Login from './app/Login';
import Forgot from './App/Forgot';

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <h2>YoLaw</h2>
                    <hr />
                    
                    <Switch>
                        <Route exact path='/forgot' component={Forgot} />
                        <Route exact path='/signup' component={Signup} />
                        <Route exact path='/' component={Login} />
                    </Switch>
                </div>
            </Router>
        );
    }
}
export default App;