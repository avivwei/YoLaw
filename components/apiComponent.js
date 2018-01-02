import React from 'react'
import axios from 'axios'


const url='http://yolaw.herokuapp.com/api/';

export class Api extends React.Component {
    constructor(props) {
        super(props);
        this.getDataFromApi = this.getDataFromApi.bind(this);
        this.getClientsApi = this.getClientsApi.bind(this);
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
    getClientsApi(token) {
        axios.get(url + 'lawyers/clients/get', {Headers: {Authorization: token}})
            .then(function (response){
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    getUserDataFromApi() {
        let data = this.props.data;
        console.log(data)
        let urlEnding = this.getUrl(data);
        axios.post(url + urlEnding, data)
            .then(function (response) {
                    this.setState({token: response.data.result.token});
                    this.getClientsApi(this.state.token);
            })
            .catch(function (error) {
                console.log(error);
            });
        
    }
    render() {
        return (
            <button type="submit" value="Submit" onClick={this.getUserDataFromApi} > Submit
            </button>
            
        )
    }
}
export default Api
