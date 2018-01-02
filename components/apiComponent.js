import React from 'react'
import axios from 'axios'

export class Api extends React.Component {
    constructor(props) {
        super(props);
        this.getDataFromApi = this.getDataFromApi.bind(this);
    }
    getUrl(data) {
        console.log(data);
        let url;
        if (data.name) {
            url = 'api/users/signup';
        } else if (data.password) {
            url = 'api/users/signin';
        } else {
            url='api/users/password/forgot';
        }
        return url;
        
    }
    getDataFromApi() {
        let data = this.props.data;
        let urlEnding = this.getUrl(data);
        const url='http://yolaw.herokuapp.com/';
        // if (data.name) {
        //     urlEnding = 'signup';
        // } else if (data.password) {
        //     urlEnding = 'signin';
        //  } else {
        //     uelEnd='password/forgot';
        // }
        console.log(data);
        axios.post(url + urlEnding, data)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        
    }
    render() {
        return (
            <button type="button" onClick={this.getDataFromApi} > Submit
            </button>
        )
    }
}
export default Api
