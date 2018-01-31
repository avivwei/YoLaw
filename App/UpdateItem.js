import React, {Component} from 'react';
import ApiCalls from '../apiCalls';


export default class UploadFile extends Component {
    constructor(props) {
        super(props);
        this.state ={
            file:null,
            isMajorVersion: null
        }
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.onChange = this.onChange.bind(this);
        this.updateDocument = this.updateDocument.bind(this);
        this.setVersion = this.setVersion.bind(this);
    }
    onFormSubmit(e){
        e.preventDefault(); // Stop form submit
        this.fileUpload(this.state.file).then((response)=>{
            console.log(response.data);
        })
    }
    onChange(e) {
        this.setState({file: e.target.files[0]})
    }
    
    updateDocument(){
        
        let clientId=JSON.parse(localStorage.getItem('client'))._id;
        console.log(this.props.match.params.id);
        ApiCalls.updateDocument(clientId,this.props.match.params.id,this.props.match.params.itemId,this.state.isMajorVersion,this.state.file,
        (response) =>{console.log(response)},
            (error) => {console.log(error);}
        )
    }
    
    setVersion(bool){
        console.log(bool);
        if (bool===true) {
            this.setState({isMajorVersion: true});
        }else {this.setState({isMajorVersion: false});
        }
    }
    
    
    render(){
        

        
        return(
        <div>
            <input className="fa fa-file"  onChange={this.onChange} type="file" />
            <div>
            <h3>Is this a new version of this document or a minor change?</h3>
            </div>
            <button  onClick={()=>this.setVersion(true)}>new version</button><button  onClick={()=>this.setVersion(false)}>minor update</button>
            
            <p>new version are saved separately, while minor changes override the previous file</p>
            
            <div>
                <button >Cancel</button>
                    <button type="submit" onClick={this.updateDocument}>Upload</button>
            </div>
        </div>
        )
    }
}