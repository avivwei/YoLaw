import React from 'react';
import axios from 'axios';
import Link  from 'react-router-dom';
import {ClientTable} from '../App/ClientsTable'


const url='http://yolaw.herokuapp.com/api/';
// let token = '0d164264fda6423ab0d3a276bb5666b07a4241d1';

export class Api extends React.Component {
    constructor(props) {
        super(props);
        this.state = {clients: new Array};
        this.getUserDataFromApi = this.getUserDataFromApi.bind(this);
        this.getClientsApi = this.getClientsApi.bind(this);
        this.renderDataFromApi=this.renderDataFromApi.bind(this);
    }
    getUrl(data) {
        let url;
        if (data.name) {
            url = 'users/signup';
            
        } else if (data.password) {
            url = 'users/signin';
            
        } else {
            url='users/password/forgot';
        }
        return url;
        
    }
    addClientApi(data) {
        axios.post(url + 'lawyers/clients/add', data)
            .then(function (response){
                console.log(response);
            })
            .catch(function (error) {
                consoel.log(error);
            })
    }
    renderDataFromApi(){
        if (!localStorage.getItem('token')) {
            return <button type="submit" value="Submit" onClick={this.getUserDataFromApi} >
                  Submit
            </button>
        }
        console.log('ffff')
        
        
    }
    
    getClientsApi(token) {
        
        let data;
        axios.get(url + 'lawyers/clients/get', {headers:  {'Content-Type': 'application/json',
                Authorization:  token?`Bearer ${token}`: ''}})
            .then(response => {
                    data = response.data.result;
                    this.setState({clients: data});
                }
            )
            .catch(function (error) {
                console.log(error);
            })
    }
    
    
    getUserDataFromApi() {
        let data = this.props.data;
        console.log(data);
        let urlEnding = this.getUrl(data);
        axios.post(url + urlEnding, data)
            .then(response => {
                localStorage.setItem('token', response.data.result.token);
                const token = localStorage.getItem('token');
                console.log(token);
                this.getClientsApi(response.data.result.token);
            })
            .catch(function (error) {
                console.log(error);
            });
        
    }
    render() {
        
        // const element = this.renderDataFromApi();
        return (
            <div>
                {this.renderDataFromApi()}
                
            </div>
        )
    }
}
export default Api


