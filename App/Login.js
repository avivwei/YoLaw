import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Api} from '../components/apiComponent';
import {Link} from 'react-router-dom'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
        this.updateState = this.updateState.bind(this);
    }
    updateState (e) {
        switch (e.target.name) {
            case 'email':
                this.setState({email: e.target.value});
                break;
            case 'password':
                this.setState({password: e.target.value});
                break;
            default:
                console.log('state does not update');
        }
        console.log(this.state);
    }
    render() {
        return (
            <div>
                <h2>Login</h2>
                    <label> Email address </label>
                    <input type="email" name="email"  placeholder="Email address"  required onChange={this.updateState} autoFocus />
                    <label> Password</label>
                    <input  placeholder="Password"  name="password" required type="password"  onChange = {this.updateState} />
                    <ul>
                        <li><Link to={'/Signup'}>Sign Up</Link></li>
                        <li><Link to={'/forgot'}>Forgot Password?</Link></li>
                    </ul>
                    <Api data = {this.state} />
            </div>
        );
    }
}
export default Login;