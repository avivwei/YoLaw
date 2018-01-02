import React, { Component } from 'react';
import {Api} from '../components/apiComponent'
import {Link} from 'react-router-dom';

class Signup extends Component {
    constructor(props){
        super(props);
        this.state = {
                email: '',
                password: '',
                isLawyer: false,
                name: {first: '', last: ''},
                company: ''
        };
        this.updateState = this.updateState.bind(this);
    }
    componentDidMount() {
        console.log('state from component did mount:   ', this.sate);
        
    }
    updateState(e) {
        switch (e.target.name) {
            case 'password':
                this.setState({password: e.target.value});
                break;
            case 'email':
                    this.setState({email:  e.target.value});
                break;
            case 'first':
                let name = {first: e.target.value, last: this.state.name.last};
                this.setState(
                    {name: name});
                break;
            case 'last':
                let name2 = {first: this.state.name.first , last: e.target.value};
                this.setState(
                    {name: name2});
                break;
            default:
                console.log('bahhhhh');
        }
    }
    render() {
        return (
            <div>
                <h2> Please sign up </h2>
                <label> Email address </label>
                <input type="email" name="email"  placeholder="Email address"  required onChange={this.updateState} autoFocus />
                <label> Password</label>
                <input  placeholder="Password"  name="password" required type="password"  onChange = {this.updateState} />
                <input  placeholder="First Name"   required name="first"  onChange = {this.updateState} />
                <input  placeholder="Last Name"  required name="last"  onChange = {this.updateState} />
                <li><Link to={'/'}>login</Link></li>
                <Api data = {this.state} />
            </div>
        )
    }
}
export default Signup;