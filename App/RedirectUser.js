import React, {Component} from 'react';

export default class RedirectUser extends Component {
    constructor(props){
        super(props)
    }
    componentWillMount() {
        if (localStorage.getItem('token')) {
            this.props.history.push('/lawyers/clients');
        } else {
            this.props.history.push('/login');
        }
    }
    render(){
        return <div></div>
    }
        
    
}