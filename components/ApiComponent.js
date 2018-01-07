import React from 'react';
import axios from 'axios';
import {BrowserHistory, WithRouter,Link,Switch}  from 'react-router-dom';
import {ClientsTable} from '../App/ClientsTable';
import ReactLoading from 'react-loading';



const url='http://yolaw.herokuapp.com/api/';

export class Api extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {clients: new Array};
        this.getUserDataFromApi = this.getUserDataFromApi.bind(this);
        this.getClientsApi = this.getClientsApi.bind(this);
        this.getUrl = this.getUrl.bind(this);
        this.redirect = this.redirect.bind(this);
    }
    
    redirect(){
        window.location.href='/lawyers/clients';
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
    
    getClientsApi(token) {
        let data;
        this.props.history.push('/lawyers/clients');
        axios.get(url + 'lawyers/clients/get', {headers:  {'Content-Type': 'application/json',
                Authorization:  token?`Bearer ${token}`: ''}})
            .then(response => {
                data = response.data.result;
                this.setState({clients: data});
                console.log(data);
                // this.props.history.push('/lawyers/clients');
    
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    
    getUserDataFromApi() {
    
        let data = {email: this.props.email,
                    password: this.props.password,
                    name: this.props.name,
                    isLawyer: this.props.isLawyer
                    };

        console.log(data);

        let urlEnding = this.getUrl(data);
        axios.post(url + urlEnding, data)
            .then(response => {
                console.log(response);
                localStorage.setItem('token', response.data.result.token);
                this.getClientsApi(response.data.result.token);

            })
            .catch(function (error) {
                console.log(error);
            });
        
    }
    
    render() {
        {this.getUserDataFromApi()}
        const url =()=> {
            
              return  this.state.clients ? <ClientsTable url={'/lawyers/clients'}/> : ''
            
        };
    
        return (
            <div>
                {/*{url()}*/}
            </div>
        )
    
    }
}
export default Api;


