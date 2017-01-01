import React, {Component} from 'react';
import Api from '../components/apiComponent';
import {Link} from 'react-router-dom';

export default class Forgot extends Component {
    constructor(props){
        super(props);
        this.state = {email:''};
        this.updateState=this.updateState.bind(this);
    }
    updateState(e) {
        this.setState({email: e.target.value});
    }
    render() {
        return (
            <div>
                <input type="email" name="email"  placeholder="Email address"  required onChange={this.updateState} />
                <Api data={this.state} />
                <Link style={{display: 'block'}}  to={"/"} >Login</Link>
                <Link to={"/singUp"}>Sign Up</Link>
            </div>
            
        )
    }
}