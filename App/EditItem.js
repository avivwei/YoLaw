import React, {Component} from 'react';
import ApiCalls from '../apiCalls'
import{Link} from 'react-router-dom';

export default class EditItem extends Component {
    constructor(props){
        super(props)
        this.state={ docVersions: JSON.parse(localStorage.getItem('workflowItem')).docVersions, name:JSON.parse(localStorage.getItem('workflowItem')).workflowItemName, description: JSON.parse(localStorage.getItem('workflowItem')).itemDescription}
        this.goToUploadFileUrl = this.goToUploadFileUrl.bind(this);
        this.setDocOrTask = this.setDocOrTask.bind(this);
        this.sendEditToSave = this.sendEditToSave.bind(this);
        this.goBackAPage = this.goBackAPage.bind(this);
    }
    
    goToUploadFileUrl(){
        this.props.history.push('/lawyers/clients/workflow/details/'+this.props.match.params.id+'/'+this.props.match.params.itemId+'/upload');
    }
    
    componentWillMount(){
        console.log(JSON.parse(localStorage.getItem('workflowItem')));
    }
    
    setDocOrTask(){
       if (this.props.match.params.itemType==='doc'){
           return <div>
               <div><strong>Document versions</strong>
                   <button onClick={this.goToUploadFileUrl}><i className="fa fa-upload" aria-hidden="true"></i>
                    upload file</button>
                </div>,
             <table ><tbody>{this.state.docVersions.map((version, i)=> {
        
                   return <VersionsComponent index = {i+1} key={version._id} version={version} />
               })}
                </tbody></table>
           </div>
       }
       else {
           return null;
       }
    }
    
    goBackAPage(){
        localStorage.removeItem('workflowItem');
        this.props.history.push('/lawyers/clients/workflow/details/'+this.props.match.params.id);
    }
    
    
    sendEditToSave(){
        let lawyerClientId = JSON.parse(localStorage.getItem('client'))._id;
        
        ApiCalls.editItem(lawyerClientId,this.props.match.params.id,this.props.match.params.itemId,this.state.name, this.state.description,
            (response) => {
                console.log(response)
                this.props.history.push('/lawyers/clients/workflow/details/' + this.props.match.params.id)
            },
            (error) => {console.log(error)
            }
        );
    }
    
    
    render(){
        
        
        return(
    
        <div className="myDoc">
            
                <div id="pagTitle">
                    <h1>Edit {this.props.match.params.itemType}</h1>
                </div>
            <h3> Name </h3>
            <input type="text" className="inputBox" placeholder={this.state.name} onChange={(e) => this.setState({name: e.target.value})}></input>
    
            <h3> Description </h3>
            <textarea name="text" rows="14" cols="10" wrap="soft" value={this.state.description}
                      onChange={(e) => this.setState({description: e.target.value})}>
                    </textarea>
           
            {this.setDocOrTask()}
                <div>
                   
                </div>
                
                <button onClick={this.goBackAPage}>cancel</button><button onClick={this.sendEditToSave}>Done</button>

            </div>
        )
        
    }
}

class VersionsComponent extends Component {
    constructor(props){
        super(props);
    }
    
    componentWillMount(){
        console.log(this.props.version)
        let date, dayMonth, month, year
        date = new Date(this.props.version.date);
        dayMonth = date.getDate();
        month = date.getMonth();
        year = date.getFullYear();
        switch (dayMonth) {
            case (dayMonth % 10 === 1):
                dayMonth = dayMonth+'st'
                break;
            case (dayMonth % 10 === 2):
                dayMonth = dayMonth+'nd';
                break;
            case (dayMonth % 10 === 3):
                dayMonth = dayMonth+'rd';
                break;
            default:
                dayMonth=dayMonth+'th';
        }
        let months = new Array(12);
        months[0] = "January";
        months[1] = "February";
        months[2] = "March";
        months[3] = "April";
        months[4] = "May";
        months[5] = "June";
        months[6] = "July";
        months[7] = "August";
        months[8] = "September";
        months[9] = "October";
        months[10] = "November";
        months[11] = "December";
        this.setState({date: months[month]+' '+dayMonth+', '+year});
    }
    render(){
        
        return (
            
                <tr >
                    <td>{this.props.index}</td><td className="iconColl">V{this.props.version.majorVersion + '.' + this.props.version.minorVersion}</td><td  >{this.state.date}
                </td>
                    <td className="iconCol"><a href={this.props.version.url} download> <i className="fa fa-download" aria-hidden="true" /></a></td>
                    <td className="iconCol" ><i className="fa fa-trash-o" aria-hidden="true" /></td>
                </tr>
            
        )
    }
}