import React, {Component} from 'react';
import {Link} from 'react-router';
import Api from '../components/ApiComponent';
export default class ClientsTable extends Component{
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <div><span>data</span></div>
                {
                this.props.clients.map((client,index) =>
                    <div key={index}><span>{client + ': ' + client}</span></div>)
                }
            </div>
            
        )
        
    }
}