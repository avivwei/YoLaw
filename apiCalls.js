import axios from 'axios';

const TOKEN_LOCAL_STORAGE_KEY = 'token';
const URL_BASE = 'http://yolaw.herokuapp.com/api/';
const ApiCalls = {
    missingToken: 'missing token',
    
    login: function (email, password, onSuccess, onError) {
        let data = {email: email, password: password};
        axios.post(URL_BASE + 'users/signin', data)
            .then(response => {
                console.log(response);
                token = response.data.result.token;
                localStorage.setItem(TOKEN_LOCAL_STORAGE_KEY, token);
                return onSuccess(token);
            })
            .catch(function (error) {
                console.log(error);
                return onError(error);
            });
    },
    
    getHeaders: () => {
        if (token) {
            return {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }
        else if (localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY)) {
            token = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY);
            return {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            };
        }
        return null;
    },
    
    getClients: function (onSuccess, onError, searchWord) {
        
        
        let word = {search: ''};
        if (searchWord) {
            word = searchWord;
        }
        console.log(word);
        
        
        axios.get(URL_BASE + 'lawyers/clients/get?search=' + word, {
                headers: ApiCalls.getHeaders()
                
            })
            .then(response => {
                console.log(response.data);
                onSuccess(response.data.result);
            })
            .catch(function (error) {
                console.log(error);
                onError(error);
            });
    },
    
    editClient: (content, onSuccess, onError) => {
        axios.put(URL_BASE + 'lawyers/clients/edit', content)
            .then(response => {
                console.log(response);
                onSuccess(response.data);
            })
            .catch((error => {
                console.log(error);
                onError(error);
            }));
    },
    
    addClient: function (newClient, onSuccess, onError) {
        axios.post(URL_BASE + 'lawyers/clients/add', newClient, {
                headers: getHeaders()
            })
            .then(response => {
                console.log(response);
                onSuccess(response)
            })
            .catch((error => {
                console.log(error);
                onError(error);
            }))
    },
    getWorkflows: (onSuccess, onError) => {
        axios.get(URL_BASE + 'workflows/get', {
                headers: ApiCalls.getHeaders()
            })
            .then(response => {
                onSuccess(response.data.result);
            })
            .catch(error => {
                console.log(error)
                onError(error);
            });
    },
    assignWorkflow: (onSuccess, onError, clientLawyerId, workflowId) => {
        axios.post(URL_BASE + 'workflows/assign', {_lawyerClient: clientLawyerId, _workflow: workflowId}, {
            headers: ApiCalls.getHeaders()
            
            })
            .then(response => {
                console.log(response);
                onSuccess(response);
            })
            .catch(error => {
                console.log(error);
                onError(error);
            })
    },
    
    unassignWorkflow(workflowId, clientLawyerId, onSuccess, onError){
        axios.post(URL_BASE + 'workflows/unassign', {_lawyerClient: clientLawyerId, _workflow: workflowId}, {
                headers: ApiCalls.getHeaders()
            })
            .then(response => {
                onSuccess(response)
            })
            .catch(error => {
                onError(error);
            })
    },
    
    getWorkflowDetails(workflowId, clientLawyerId, onSuccess, onError){
        //dummy data from postman
        axios.get(URL_BASE + 'workflows/client',{params: {_lawyerClient: clientLawyerId, _workflow:workflowId }, headers: ApiCalls.getHeaders()
            })
            .then(response => {
                onSuccess(response)
            })
            .catch(error => {
                console.log('error')
                onError(error);
            })
        
    },
    
    removeItemFromWorkflow(workflowId,clientLawyerId,itemId,onSuccess,onError){
        axios.delete(URL_BASE +'workflows/item/remove?_workflow='+workflowId+'&_lawyerClient='+clientLawyerId+'&_workflowItem='+itemId,
            {headers: ApiCalls.getHeaders()
            })
            .then(response =>{
                onSuccess(response)
            })
            .catch(error => {
                onError(error);
            })
    },
    
    
    
    updateDocument(lawyerClientId,workflowId,itemId,isMajorVersion,doc,onError,onSuccess){
        const formData = new FormData();
        formData.append('doc',doc);
        console.log(lawyerClientId);
        formData.append('_lawyerClient', lawyerClientId);
        formData.append('_workflow', workflowId);
        formData.append('_workflowItem', itemId);
        formData.append('isMajorVersion',isMajorVersion);
        
        let headers = this.getHeaders();
        headers['content-type']= 'multipart/form-data';
    
    
        axios.post(URL_BASE + 'workflows/item/document/update', formData,{
            headers: headers
        })
            .then(response=> {
                onSuccess(response)
            })
            .catch(error => {
                onError(error);
            })
        
    },
    
    addItem(lawyerClientId,workflowId,fileName,fileDiscription,itemType,doc, onError,onSuccess){
        const formData = new FormData();
        formData.append('doc',doc);
        formData.append('_lawyerClient', lawyerClientId);
        formData.append('_workflow', workflowId);
        formData.append('name', fileName);
        formData.append('description',fileDiscription);
        formData.append('itemType',itemType);
    
    
        let headers = this.getHeaders();
        // headers['content-type']= 'multipart/form-data';
        axios.post(URL_BASE + 'workflows/item/add', formData,{
                headers: headers
            })
            .then(response=> {
                onSuccess(response)
            })
            .catch(error => {
                onError(error);
            })
    
    },
    
    editItem(_lawyerClient, _workflow, _workflowItem, name, description, onSuccess, onError) {
        axios.post(URL_BASE + 'workflows/item/edit',{_lawyerClient: _lawyerClient, _workflow: _workflow, _workflowItem:_workflowItem, name: name, description: description},
            {headers: this.getHeaders()})
            .then(response => {
                onSuccess(response);
            })
            .catch(error => {
                onError(error)
            })
    }
        
    
};


let token;



export default ApiCalls;