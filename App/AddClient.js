import React, {Component} from 'react';
import ApiCalls from '../apiCalls';
import Select from 'react-styled-select';


export default class AddClient extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            
            client: {companyName: '', contactPerson: {email: '', name: ''}},
            url: '',
            selectedWorkflow: {},
            clicked: false,
            workflows: []
        };
        
        this.saveChanges = this.saveChanges.bind(this);
        this.updateData = this.updateData.bind(this);
        this.handleChangeWorkflow = this.handleChangeWorkflow.bind(this);
        this.addWorkflowClicked = this.addWorkflowClicked.bind(this)
        this.getWorkflowUrl=this.getWorkflowUrl.bind(this);
        
    }
    
    addWorkflowClicked() {
        // this.state.client._workflows.push(this.state.selectedWorkflow);
        ApiCalls.assignWorkflow((response) => {
            console.log(response.data.result._workflows);
            localStorage.setItem('client',JSON.stringify(response.data.result));
            this.setState({client: response.data.result});
            this.clientWorkflows.clientUpdated(response.data.result);
            
        }, (error) => {
            console.log(error)
        }, this.state.client._id, this.state.selectedWorkflow._id)
    }
    
    handleChangeWorkflow(value) {
        for (let i = 0; i < this.state.workflows.length; i++) {
            if (value === this.state.workflows[i]._id) {
                this.setState({selectedWorkflow: this.state.workflows[i]});
                break;
            }
        }
        
    }
    
    componentWillMount() {
        let token = localStorage.getItem('token')
        let client = localStorage.getItem('client');
        if (!client){
            this.props.history.push('/lawyers/clients');
        }
        if (!token){
            localStorage.removeItem('client');
            this.props.history.push('/');
        }
        
        let path = this.props.location.pathname;
        ApiCalls.getWorkflows((workflows) => {
                let options = workflows.map((workflow, i) => {
                    return {value: workflow._id, label: workflow.name}
                    
                });
                this.setState({workflows: workflows, options: options});
            },
            (error) => {
                console.log('workflows are not valid duo to ' + error);
            });
        this.setState({url: path.slice(path.length - 3, path.length)});
        // localStorage.removeItem('client');
        
    }
    
    saveChanges() {
        if (this.state.url === 'add') {
            ApiCalls.addClient(this.state.client, () => {
                console.log('changes to client were saved');
            }, (error) => {
                console.log(error);
            }, {});
        }
        
    }
    
    updateData(e) {
        switch (e.target.name) {
            case 'company':
                this.setState({client: {companyName: e.target.value, contactPerson: this.state.client.contactPerson}});
                break;
            case 'name':
                this.setState({
                    client: {
                        companyName: this.state.client.companyName,
                        contactPerson: {name: e.target.value, email: this.state.client.contactPerson.email}
                    }
                });
                break;
            case 'email':
                this.setState({
                    client: {
                        companyName: this.state.client.companyName,
                        contactPerson: {name: this.state.client.contactPerson.name, email: e.target.value}
                    }
                });
        }
    }
    getWorkflowUrl(workflow,id){
        this.props.history.push("/lawyers/clients/workflow/details/"+id);
    }
    
    
    render() {
        let name, company, email
            if (this.state.url === 'add') {
                name = '';
                email = '';
                company = '';
            } else {
                this.state.client = JSON.parse(localStorage.getItem('client'));
                if (this.state.client) {
                    company = this.state.client.companyName;
                    name = this.state.client.contactPerson.name;
                    email = this.state.client.contactPerson.email
                } else {this.props.history.push('/lawyers/clients')}
            }
        
        
        return (
            <div>
                <h1>{company}</h1>
                <p>Company name <input className="dotted" name="company" onChange={this.updateData}
                                       defaultValue={company}/></p>
                <p> Contact person: </p>
                <p>Name <input className="dotted" name="name" defaultValue={name} onChange={this.updateData}/></p>
                <p>Email <input className="dotted" name="email" defaultValue={email} onChange={this.updateData}/></p>
                {/*<div >workflows: {this.state.clicked?this.state.selectedWorkflow.name:null}</div>*/}
                <ClientWorkflows workflows={this.state.client._workflows} redirectToWorkflow={this.getWorkflowUrl} addedWorkflow={this.state.selectedWorkflow} ref={instance => { this.clientWorkflows = instance; }}/>
                <Select
                    name="form-field-name"
                    options={this.state.options}
                    value={this.state.options}
                    onChange={this.handleChangeWorkflow}
                
                />
                <button onClick={this.addWorkflowClicked}>Add workflow</button>
                <button onClick={this.saveChanges}>Save changes</button>
            
            </div>
        )
    }
}

class ClientWorkflows extends Component {
    constructor(prop) {
        super(prop);
        this.state = {workflows: this.props.workflows?this.props.workflows:[]};
        this.deleteWorkflow = this.deleteWorkflow.bind(this);
        this.clientUpdated = this.clientUpdated.bind(this);
    }
    
    clientUpdated(client) {
        this.setState({workflows: client._workflows?client._workflows:[]});
    }
    deleteWorkflow(id) {
        let lawyerClientId = JSON.parse(localStorage.getItem('client'));
        lawyerClientId = lawyerClientId._id;
        ApiCalls.unassignWorkflow(id, lawyerClientId,
            (response) => {
                localStorage.setItem('client', JSON.stringify(response.data.result));
                this.setState({workflows: response.data.result._workflows});
            }, (error) => {
                console.log(error)
            })
    }
    
    render() {
        return (
            <div>
                Workflows:
                <table>
                    <tbody >
                    {this.state.workflows.map((workflow, i) => {
                        return <tr key={workflow._id}>
                            <td id="workflow" onClick={() => this.props.redirectToWorkflow(workflow._id)}>{workflow.name}</td><td><i className="fa fa-download" aria-hidden="true"></i></td><td><i className="fa fa-envelope" aria-hidden="true"></i>
                        </td><td onClick={() => this.deleteWorkflow(workflow._id)}><i className="fa fa-trash"></i></td>
                        </tr>
                    })}
                    </tbody>
                </table>

            </div>
        )
    }
}

