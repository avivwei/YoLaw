import React, {Component} from 'react';
import Api from '../components/apiComponent'

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
            </div>
        )
    }
}