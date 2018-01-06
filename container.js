import React, {component} from 'react';
import Api from './components/ApiComponent';

export default class Container extends Component {
    render(){
        return (
            <div>
                
                <Api data={this.props.data} />
            </div>
        )
    }
    
}