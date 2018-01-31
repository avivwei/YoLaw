import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import CheckBox from'rc-checkbox';

class Signup extends Component {
    constructor(props){
        super(props);
        this.state = {
                email: '',
                password: '',
                isLawyer: false,
                name: {first: '', last: ''},
                company: '',
                clicked: false
                
        };
        this.updateState = this.updateState.bind(this);
        this.clicked = this.clicked.bind(this);
        this.isLawyer=this.isLawyer.bind(this);
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
                    console.log(name);
                break;
            case 'last':
                let name2 = {first: this.state.name.first , last: e.target.value};
                this.setState(
                    {name: name2});
                console.log(name2);
                break;
            default:
                console.log('bahhhhh');
        }
        
    }
    isLawyer(e) {
        this.setState({isLawyer: !this.state.isLawyer});
        e.target.checked= !this.state.isLawyer;
        console.log('is lawyer? ' + this.state.isLawyer);
    }
    clicked () {
        console.log(this.state.name);
        this.setState({clicked: true});
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
                <label style={{fontSize: '10px'}}><CheckBox  value="Lawyer" type="checkbox" name="lawyer" checked={!this.state.isLawyer} onClick={this.isLawyer} />I'm a lawyer</label>
                 <CheckBox value="Client" type="checkbox" id="client" name="client" defaultCheck={false} checked={this.state.isLawyer} onClick={this.isLawyer}/><label style={{fontSize: '10px'}}>I'm a client</label>
                <button className="submit" value="Submit" onClick={this.clicked} style={{display: 'block'}}  >Submit</button>
                {/*{this.state.clicked?<Api email={this.state.email} password={this.state.password} name={this.state.name} isLawyer={this.state.isLawyer} />:''}*/}
    
                <Link type="submit"  to={'/login'} >login</Link>
            </div>
        )
    }
}
export default Signup;