import React, {Component} from 'react';
import ApiCalls from '../apiCalls';
import {Link} from 'react-router-dom'


export default class WorkflowDetails extends Component {
    constructor(props) {
        super(props);
        this.state={workflowItems: [],workflowId: this.props.match.params.id, client: JSON.parse(localStorage.getItem('client'))};
        this.updateItems=this.updateItems.bind(this);
        this.goToEditItemPage = this.goToEditItemPage.bind(this);
        this.add = this.add.bind(this);
    }
    componentWillMount(){
        
        console.log('clientID:' + this.state.client._id+  '   workflowID: ' + this.state.workflowId);
        ApiCalls.getWorkflowDetails(this.state.workflowId, this.state.client._id,
            (response) => {
                console.log('clientID:' + this.state.client._id+  '   workflowID: ' + this.state.workflowId);
                console.log(response.data.result)
                this.setState({workflowItems: response.data.result.items, documentVersions: response.data.result.documentVersions});
                
            }, (error) => {
                console.log(error);
            })
    }
    
    goToEditItemPage(url){
        this.props.history.push(url)
    }
    
    updateItems(items){
        this.setState({workflowItems:items});
        console.log(items);
    }
    
    add(ItemType){
        this.props.history.push('/lawyers/clients/workflow/details/additem/'+this.props.match.params.id+'/'+ItemType)
    }
    
    render() {
            return (
                <div>
                    <table className="workflowDetails">
                        <tbody>
                     
                        {this.state.workflowItems.map((item)=>{
                            return <ObjectRow  key={item._id}  workflowId={this.state.workflowId} item={item} clientId={this.state.client._id} docVersions={this.state.documentVersions} updateItems={this.updateItems} goToEditItemPage={this.goToEditItemPage}   />
                        })}
                        </tbody>
                    </table>
                    <div>
                        <button onClick={()=>this.add('task')}><i className="fa fa-plus" aria-hidden="true"  ></i> add task</button>
                        <button onClick={()=>this.add('doc')}><i className="fa fa-plus" aria-hidden="true"  ></i> add doc</button>
                    </div>
                </div>
            )
        }
    
}

class ObjectRow extends Component{
    constructor(props) {
        super(props);
        this.state = this.props;
        this.getIcon=this.getIcon.bind(this);
        this.deleteThisItemFromDom = this.deleteThisItemFromDom.bind(this);
        this.goToItemPage = this.goToItemPage.bind(this);
   }
    
    deleteThisItemFromDom(){
        this.props.delete(this.state.item._id);
        
    }
    getIcon(){
      return this.state.item.itemType === "doc"? <i className="fa fa-file" aria-hidden="true"></i>:<i className="fa fa-tasks" aria-hidden="true"></i>
        
    }
    
    deleteThisItem(workflowId,clientLawyerId,itemId){
        console.log(workflowId);
        ApiCalls.removeItemFromWorkflow(workflowId,clientLawyerId,itemId,
            (response)=>{
                this.props.updateItems(response.data.result.items);
        },(error) => {
            console.log(error);
            })
    }
    
    goToItemPage(){
        let item = this.state.item;
        for (let i=0; i<this.props.docVersions.length; i++){
            if (this.props.docVersions[i]._workflowItem = item._id){
                localStorage.setItem('workflowItem', JSON.stringify({docVersions: this.props.docVersions[i].documents, workflowItemId: this.props.docVersions[i]._workflowItem, workflowItemName: this.state.item.name, itemDescription: this.state.item.description}))
                this.props.goToEditItemPage('/lawyers/clients/workflow/details/'+this.props.workflowId + '/'+item._id+'/' + item.itemType);
            }
        }
        
    }
    render() {
    
    
        return  (<tr key={this.state.item._id}>
            <td>{this.getIcon()}</td>
            <td>{this.state.item.name}<p style={{fontSize: '10px'}}>{this.state.item.description}</p></td>
            <td onClick={this.goToItemPage}><i className="fa fa-pencil" aria-hidden="true"></i></td>
            <td onClick={()=>this.deleteThisItem(this.props.workflowId,this.props.clientId,this.state.item._id)}><i className="fa fa-trash-o" aria-hidden="true"></i></td>

        </tr>)
    }
}