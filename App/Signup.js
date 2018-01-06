import React, { Component } from 'react';
import {Api} from '../components/ApiComponent'
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
                <input type="email" name="email"  placeholder="Email address" style={{display: 'block'}}  required onChange={this.updateState} autoFocus />
                <label> Password</label>
                <input  placeholder="Password"  name="password" required type="password" style={{display: 'block'}}  onChange = {this.updateState} />
                <label> First Name </label>
                <input  placeholder="First Name"   required name="first" style={{display: 'block'}}   onChange = {this.updateState} />
                <label> Last Name</label>
                <input  placeholder="Last Name"  required name="last" style={{display: 'block'}}  onChange = {this.updateState} />
                <Api data = {this.state} />
    
                <Link type="submit"  to={'/'} >login</Link>
                {/*<Api data = {this.state} />*/}
            </div>
        )
    }
}
export default Signup;