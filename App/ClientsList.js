import React, {Component} from 'react';
import ApiCalls from '../apiCalls';
import Redirect from 'react-router'
// TASKS
// I need to add api call to search input
//
class ClientsList extends Component{
    constructor(props){
        super(props);
        this.state={data: []};
        this.logout=this.logout.bind(this);
        this.handleKeyPress=this.handleKeyPress.bind(this);
        this.addClient = this.addClient.bind(this);
        this.editClient = this.editClient.bind(this);
    }
    
    componentWillMount(){
        ApiCalls.getClients((clientsData)=>{
            this.setState({data: clientsData});
        }, (error)=>{
            console.log(error)
            if (error === 'missing token') {
                this.props.history.push('/login');
            }
        })
    }
    
    logout(){
        localStorage.removeItem('token');
        this.props.history.push('/login');
    }
    
    handleKeyPress (e) {
        
        if (e.key === 'Enter') {
            let searchWord = e.target.value;
            ApiCalls.getClients((clientsData) => {
                this.setState({data: clientsData});
                console.log(this.state.data);
            }, (error) => {
                alert(error);
                this.props.history.push('/login');
            }, searchWord);
        }
        
    }
    
    editClient(client){
        localStorage.setItem('client', JSON.stringify(client));
        console.log(JSON.parse(localStorage.getItem('client')));
        this.props.history.push('/lawyers/clients/edit');
    }
    addClient(){
        this.props.history.push('/lawyers/clients/add');
    }
    
    render(){
        let data = this.state.data;
        console.log(data)
        
        return(
            <div>
                
                <button type='button' name='logout' onClick={this.logout}>logout</button>
                
                <div>
                    
                    <input placeholder="Find client" onKeyPress={this.handleKeyPress} />
                    <button placeholder="Add client"  onClick={this.addClient} >Add Client</button>
                </div>
                <table className="clients">
                    <tbody>
                        <tr >
                            <th>#</th><th>Name</th><th>Email</th><th>Company</th>
                        </tr>
                        {data.map((client, i)=>{
                            return <ObjectRow client={client} editClient={this.editClient} key={i} id={i+1} />;
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

class ObjectRow extends Component{
    constructor(props) {
        super(props);
        this.state = this.props;
        this.editClient = this.editClient.bind(this);
    }
    
    editClient() {
        this.props.editClient(this.state.client);
        
    }
    
    render() {
        
        return  (<tr  onClick={this.editClient}  >
            <td>{this.state.id}</td><td>{this.state.client.contactPerson.name}</td><td>{this.state.client.contactPerson.email}</td><td>{this.state.client.companyName}</td>
        </tr>)
    }
}

export default ClientsList;