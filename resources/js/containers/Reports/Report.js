import React, { Component } from 'react';
import { Container, Table, Button, Modal, Alert, Card, Row, Col, Form } from 'react-bootstrap';
import Layout from '../../hoc/Layout';
import Spinner from '../../UI/Spinner';
import axios from 'axios';
import HighestSalariesReport from '../../components/Reports/HighestSalaries';
import MoreThanTwoEmployees from '../../components/Reports/MoreThanTwoEmployees';

class Report extends Component 
{
    state = {
        report_id: 1,
        departments: [],
        errors: []
    }

    componentDidMount(){
        this.getReport(this.state.report_id);
    }

    changeReportTypeHandler = (type) => {
        this.getReport(type);
    }

    getReport = (type) => {
        this.setState({departments: []});
        axios.get('/api/department/report/' + type, { withCredentials: true })
        .then(response => {
            if (response.data.length > 0) {
                this.setState({
                    departments: response.data,
                    report_id: type
                });
            }

            this.setState({ ...this.state, loading: false });
        })
        .catch(error => {
            if (error.response.status == 401) {
                localStorage.removeItem('isLogged');
                this.props.history.push({ pathname: '/login', });
            } else {
                this.setState({ errors: error.response.data });
            }
        });
    }

    render(){
        const report = this.state.report_id == 1 ? <HighestSalariesReport departments={this.state.departments}/> : 
                                                                            <MoreThanTwoEmployees departments={this.state.departments}/>;

        return(
            <Layout>
                <Container>
                    <div className="col-md-8 offset-md-2 col-sm-10 offset-sm-1">
                            <Form.Group controlId="Department">
                                <Form.Label>Choose Report:</Form.Label>
                                <Form.Control as="select" value={this.state.department_id} onChange={(event) => this.changeReportTypeHandler(event.target.value)}>
                                    <option value="1">All departments along with the highest salary</option>
                                    <option value="2">Departments that have more than two employees that earn over 50k</option>
                                </Form.Control>
                            </Form.Group>
                            {report}
                    </div>
                </Container>
            </Layout>
        )
    }
}

export default Report;