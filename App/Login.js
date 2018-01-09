import React, { Component } from 'react';
import {Api} from '../components/ApiComponent';
import {Link, Router} from 'react-router-dom'
import {withRouter} from 'react-router'
import {axios} from 'axios';
import ApiCalls from '../apiCalls.js'

class LoginPage extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            email: '',
            password: '',
            clicked: false
        };
        
        this.updateState = this.updateState.bind(this);
        this.clicked = this.clicked.bind(this);
        // this.login = this.login.bind(this);
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
    
    clicked() {
    
        ApiCalls.login(this.state.email, this.state.password,
            (token)=>{
                this.props.history.push("/lawyers/clients")
            },
            (error) => {
                console.log('wrong password')
            })
    
    
    }
    render() {
        
                                                            
        return (
                                                            
            <div>
                <div>
                <h2>Login</h2>
                    <label style={{display: 'block'}} > Email address </label>
                    <input style={{display: 'block'}} type="email" name="email"  placeholder="Email address"  required onChange={this.updateState} autoFocus />
                    <label style={{display: 'block'}} > Password</label>
                    <input style={{display: 'block'}}  placeholder="Password"  name="password" required type="password"  onChange = {this.updateState} />
                    <button className="submit" value="Submit" onClick={this.clicked}  >Submit</button>
                    {this.state.clicked?<Api email={this.state.email} password={this.state.password} />:null}

                </div>
                <div>
                    <Link style={{display: 'block'}}  to={'/signup'}>Sign Up</Link>
                    <Link to={'/forgot'}>Forgot Password?</Link>
                </div>
            </div>
        );
    }
}
export default withRouter(LoginPage);