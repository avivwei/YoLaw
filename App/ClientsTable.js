import React, {Component} from 'react';
import {Link} from 'react-router';
import {BrowserHistory} from 'react-router-dom'
import Api from '../components/ApiComponent';
export default class ClientsTable extends Component{
    constructor(props) {
        super(props);
        
        this.redirect=this.redirect.bind(this);
    }
    redirect(){
        this.props.history.push(this.props.url);
    }
    render() {
        {this.redirect}
        return (
            <div>
                <div><span>data</span></div>
                
                    Clients table should be here
                
            </div>
            
        )
        
    }
}