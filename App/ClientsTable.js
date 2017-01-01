import React, {Component} from 'react';
import Api from '../components/apiComponent';
export default class ClientsTable extends Component{
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