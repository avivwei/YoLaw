import React, {Component} from 'react';
import ApiCalls from '../apiCalls';

export default class AddItem extends Component {
    constructor(props){
        super(props)
        this.state={file:null, description:'', name: '', client: JSON.parse(localStorage.getItem('client'))}
        this.setFileToState = this.setFileToState.bind(this);
        this.setFileDescriptionToState = this.setFileDescriptionToState.bind(this);
        this.addFileToWorkflow = this.addFileToWorkflow.bind(this);
        this.setFileName=this.setFileName.bind(this);
    }
    setFileDescriptionToState(e){
        this.setState({discription: e.target.value});
    }
    
    setFileName(e){
        this.setState({name: e.target.value});
    }
    
    setFileToState(e){
        this.setState({file: e.target.files[0]})
    }
    
    addFileToWorkflow(){
        
        ApiCalls.addItem(this.state.client._id,this.props.match.params.id,this.state.name,this.state.discription,this.props.match.params.fileType,this.state.file,
            (response) =>{console.log(response);},
            (error) => {console.log(error);}
        )
    }
    
    
    render(){
        return(
            <div>
            
                <h3> + </h3>
               <input onChange={this.setFileToState} type="file" />
                
                <button onClick={this.addFileToWorkflow}>add {this.props.match.params.itemType}</button>
            </div>
        )
    }
}