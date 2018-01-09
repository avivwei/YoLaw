import React from 'react';
import axios from 'axios';
import {BrowserHistory, WithRouter,Redirect}  from 'react-router-dom';
import ClientsTable from '../App/ClientsTable';
// import LoginComp from '../App/login';



// const url='http://yolaw.herokuapp.com/api/';

export class Api extends React.Component {
    constructor() {
        super();

        this.state = {clients: new Array};
        this.getUserDataFromApi = this.getUserDataFromApi.bind(this);
        this.getClientsApi = this.getClientsApi.bind(this);
        this.getUrl = this.getUrl.bind(this);
    }

    // redirect(){
    //     window.location.href='/lawyers/clients';
    // }

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
    dataToLoad() {
        console.log(this.state.clients);
    }

    getClientsApi(token, onSuccess) {
        let data;
        axios.get(url + 'lawyers/clients/get', {headers:  {'Content-Type': 'application/json',
                Authorization:  token?`Bearer ${token}`: ''}})
            .then(response => {
                data = response.data.result;
                onSuccess(data);
                // this.setState({clients: data});
                // console.log(data);
                //
                // let nextUrl ='/lawyers/clients';
                // this.setState({nextUrl});
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    getUserDataFromApi(onSuccess, onError) {

        // this.props.history.push('/lawyers/clients');

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
                onSuccess(response.data.result.token);
                
                // this.getClientsApi(response.data.result.token);

            })
            .catch(function (error) {
                console.log(error);
                onError(error);
            });

    }

    render() {
        // this.props.history.push('/lawyers/clients');
        this.getUserDataFromApi()
        // const getClientsToTable =()=> {
        //
        //       return  this.state.clients ? <ClientsTable clients={'/lawyers/clients'}/> : ''
        //
        // };

        return (
            <div>
                {this.state.nextUrl?<ClientsTable />:null}
            </div>
        )

    }
}
export default Api;


