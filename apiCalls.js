import axios from 'axios';

const TOKEN_LOCAL_STORAGE_KEY = 'token';
const URL_BASE = 'http://yolaw.herokuapp.com/api/';
const ApiCalls = {
    missingToken: 'missing token',
    login: function (email, password, onSuccess, onError) {
        let data = {email: email, password: password};
        axios.post(URL_BASE+'users/signin', data)
            .then(response => {
                console.log(response);
                token = response.data.result.token;
                localStorage.setItem(TOKEN_LOCAL_STORAGE_KEY, token);
              return  onSuccess(token);
            })
            .catch(function (error) {
                console.log(error);
                return onError(error);
            });
    },
    getToken: function () {
        if (token) {
            return token;
        }
        else if (localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY)) {
            token = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY);
            return token;
        }
        return null;
    },
    getClients: function (onSuccess, onError) {
        let token = this.getToken();
        console.log(token);
        if (!token)
            return onError(this.missingToken);
    
        axios.get(URL_BASE+'lawyers/clients/get', {headers:  {'Content-Type': 'application/json', 'Authorization':  'Bearer '+token}})
            .then(response => {
                console.log(response);
                onSuccess(response.data.result);
            })
            .catch(function (error) {
                console.log(error);
                onError(error);
            });
    }
    // calls(url) {
    //     return {
    //         getToken: ({ data }) => axios.post(url,data),
    //         getData: () => axios.get(url,{headers:  {'Content-Type': 'application/json',
    //         Authorization:  token?`Bearer ${token}`: ''}})
    //     }
    // }
}

var token;

export default ApiCalls;