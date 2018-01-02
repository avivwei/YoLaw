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
        };
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
    }
    render() {
        return (
            <div>
            <form>
                <div>
                <h2>Login</h2>
                    <label style={{display: 'block'}} > Email address </label>
                    <input style={{display: 'block'}} type="email" name="email"  placeholder="Email address"  required onChange={this.updateState} autoFocus />
                    <label style={{display: 'block'}} > Password</label>
                    <input style={{display: 'block'}}  placeholder="Password"  name="password" required type="password"  onChange = {this.updateState} />
                </div>
            </form>
            <div>
                <Api data = {this.state} />
                <Link style={{display: 'block'}}  to={'/Signup'}>Sign Up</Link>
                <Link to={'/forgot'}>Forgot Password?</Link>
            </div>
        </div>
        );
    }
}
export default Login;