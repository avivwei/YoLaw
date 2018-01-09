import React, {Component} from 'react';
import {Link} from 'react-router';
import {BrowserHistory} from 'react-router-dom'
import ApiCalls from '../apiCalls.js'

export default class ClientsTable extends Component{
    constructor(props) {
        super(props);
        
    }
    componentWillMount() {
        ApiCalls.getClients((clientsData)=>{
            this.setState({clients: clientsData});
        })
    }
    render() {
        // {this.redirect}
        return (
            <div>
                {/*{this.props.history.push(this.props.url)}*/}
                <div><span>data</span></div>
                                        
                
            </div>
            
        )
        
    }
}