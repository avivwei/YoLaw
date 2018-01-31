import React, { Component } from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import Signup from './App/Signup';
import Forgot from './App/Forgot';
import Login from './App/Login';
import ClientsList from'./App/ClientsList';
import RedirectUser from './App/RedirectUser';
import AddClient from './App/AddClient';
import WorkflowDetails from './App/WorkflowDetails';
import EditItem from './App/EditItem';
import UploadFile from './App/UpdateItem';
import AddItem from './App/AddItem';
class App extends Component {
    render() {
        
                return (
            <BrowserRouter >
                <div>
                    <h2>YoLaw</h2>
                    <hr />
                    
                    <Switch >
                        
                        <Route exact path="/lawyers/clients/workflow/details/:id/:itemId/upload" component={UploadFile} />
                        <Route exact path='/lawyers/clients/workflow/details/additem/:id/:itemType' component={AddItem} />
                        <Route exact path="/lawyers/clients/workflow/details/:id/:itemId/:itemType" component={EditItem} />
                        <Route exact path='/forgot' component={Forgot} />
                        <Route exact path='/signup' component={Signup} />
                        <Route exact path='/login' component={Login} />
                        <Route exact path="/" component ={RedirectUser} />
                        <Route exact path="/lawyers/clients" component={ClientsList} />
                        <Route exact path="/lawyers/clients/add" component={AddClient} />
                        <Route exact path="/lawyers/clients/edit" component={AddClient} />
                        <Route exaxt path="/lawyers/clients/workflow/details/:id" component={WorkflowDetails} />
                        {/*<Route exact path="/lawyers/clients/workflow/details/:id/:itemId" component={EditDocument} />*/}
                        {/*<Route exact path="/lawyers/clients/workflow/details/:id/:itemId/upload" component={UploadFile} />*/}
    

                    </Switch>

                </div>
            </BrowserRouter>
        );
    }
}
export default App;