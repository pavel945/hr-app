import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './Auth/Login';
import Register from './Auth/Register';
import Logout from './Auth/Logout';
import Home from './Home';
import Department from './Departments/Department';
import ModifyDepartment from './Departments/ModifyDepartment';
import Employee from './Employees/Employee';
import ModifyEmployee from './Employees/ModifyEmployee';
import Report from './Reports/Report';

class Root extends Component {
    render()
    {
        return(
            <BrowserRouter>
                <Switch>
                    <Route path='/login' component={Login} />
                    <Route path='/logout' component={Logout} />
                    <Route path='/register' component={Register} />
                    <Route path='/department/modify/:id?' component={ModifyDepartment} />
                    <Route path='/department' component={Department} />
                    <Route path='/employee/modify/:id?' component={ModifyEmployee} />
                    <Route path='/employee' component={Employee} />
                    <Route path='/report' component={Report} />
                    <Route path='/' exact component={Home} />
                </Switch>
            </BrowserRouter>
        )
    }
}

export default Root;

if (document.getElementById('root')) {
    ReactDOM.render(<Root />, document.getElementById('root'));
}