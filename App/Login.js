import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Api} from '../components/ApiComponent';
import {Link} from 'react-router-dom'
import axios from 'axios';

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            clicked: false
        };
        this.updateState = this.updateState.bind(this);
        this.getData =this.getData.bind(this);
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
    // login() {
    //     let url="http://yolaw.herokuapp.com/api/users/signin";
    //     let data = this.state;
    //     axios.post(url, data)
    //         .then(response => {
    //             console.log(response);
    //             if (response.data.result.token) {
    //                 localStorage.setItem('token', response.data.result.token);
    //                 this.props.history.push('/lawyers/clients')
    //             }
    //             else {
    //                 alert('invalid email/password');
    //             }
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // }
    getData() {
        this.setState({clicked: true});
    }
    
    render() {
         const isClicked = ()=>
        {
        
        if (this.state.clicked) {
            return <Api email={this.state.email} password={this.state.password} />
        }
    
    }
        return (
            
            <div>
                <div>
                <h2>Login</h2>
                    <label style={{display: 'block'}} > Email address </label>
                    <input style={{display: 'block'}} type="email" name="email"  placeholder="Email address"  required onChange={this.updateState} autoFocus />
                    <label style={{display: 'block'}} > Password</label>
                    <input style={{display: 'block'}}  placeholder="Password"  name="password" required type="password"  onChange = {this.updateState} />
                    <button className="submit" value="Submit" onClick={this.getData}  >Submit</button>
                    {isClicked()}

                </div>
                <div>
                    <Link style={{display: 'block'}}  to={'/signup'}>Sign Up</Link>
                    <Link to={'/forgot'}>Forgot Password?</Link>
                </div>
            </div>
        );
    }
}
export default Login;