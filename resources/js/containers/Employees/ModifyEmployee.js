import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Container, Button, Card, Row, Col, Form, Alert } from 'react-bootstrap';
import Layout from '../../hoc/Layout';
import Spinner from '../../UI/Spinner';

class ModifyEmployee extends Component {
    state = {
        id: '',
        fname: '',
        lname: '',
        salary: 0,
        department_id: '',
        loading: true,
        errors: false,
        formTitle: 'Edit Employee',
        departments: []
    }

    getEmployee = () => {
        axios.get('/api/employee/' + this.props.match.params.id, { withCredentials: true })
            .then(response => {

                if (response.data.length > 0) {
                    this.setState({
                        id: response.data[0].id,
                        fname: response.data[0].fname,
                        lname: response.data[0].lname,
                        salary: response.data[0].salary,
                        department_id: response.data[0].department_id,
                    });
                }

                // this.setState({ links: response.data });
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

    getDepartments = () => {
        axios.get('/api/department/', { withCredentials: true })
            .then(response => {

                if (response.data.length > 0) {
                    this.setState({
                        departments: response.data
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

    saveHandler = () => {
        let url = '/api/employee';

        if (this.state.id != '') {
            url = url + '/' + this.state.id;
        }

        axios.post(url,
            {
                fname: this.state.fname,
                lname: this.state.lname,
                salary: this.state.salary,
                department_id: this.state.department_id
            },
            {
                withCredentials: true
            })
            .then(response => {
                this.props.history.push({ pathname: '/employee', });
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

    componentDidMount() {
        if (!this.props.match.params.id) {
            this.setState({ loading: false, formTitle: 'Add Employee' });
        } else {
            this.getEmployee();
        }

        this.getDepartments();
    }

    render() {
        let errors = "";

        if (this.state.errors) {
            errors = <Alert variant="danger">
                <Alert.Heading>Errors</Alert.Heading>
                {Object.keys(this.state.errors).map((k) => {
                    return <p key={k}>{this.state.errors[k][0]}</p>;
                })}
            </Alert>
        }

        let render = <Spinner />

        if (!this.state.loading) {
            render = <Container className="py-4">
                <div className="col-md-8 offset-md-2 col-sm-10 offset-sm-1">
                    <Card md="justify-content-md-center">
                        <Card.Header>
                            <Row className="justify-content-md-center">
                                <Col md="12">
                                    <h2 style={{ textAlign: "center", color: "#007bff" }}>{this.state.formTitle}</h2>
                                </Col>
                            </Row>
                        </Card.Header>
                        <Card.Body>
                            <Row className="justify-content-md-center">
                                <Col md="6">
                                    {errors}
                                </Col>
                            </Row>
                            <Row className="justify-content-md-center">
                                <Col md="6">
                                    <Form.Group controlId="fname">
                                        <Form.Label>Fist Name</Form.Label>
                                        <Form.Control type="text" placeholder="First Name..." value={this.state.fname} onChange={(event) => this.setState({ fname: event.target.value })} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="justify-content-md-center">
                                <Col md="6">
                                    <Form.Group controlId="lname">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control type="text" placeholder="Last Name..." value={this.state.lname} onChange={(event) => this.setState({ lname: event.target.value })} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="justify-content-md-center">
                                <Col md="6">
                                    <Form.Group controlId="salary">
                                        <Form.Label>Salary</Form.Label>
                                        <Form.Control type="number" placeholder="Salary..." value={this.state.salary} onChange={(event) => this.setState({ salary: event.target.value })} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="justify-content-md-center">
                                <Col md="6">
                                    <Form.Group controlId="Department">
                                        <Form.Label>Department</Form.Label>
                                        <Form.Control as="select" value={this.state.department_id} onChange={(event) => this.setState({ department_id: event.target.value })}>
                                            <option value="0">Default select</option>
                                            {this.state.departments.map((department, index) => (
                                                <option key={index} value={department.id} >{department.name}</option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="justify-content-md-center">
                                <Col md="6">
                                    <Button className="btn-block" variant="success" type="submit" onClick={this.saveHandler}>Save</Button>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        }

        return (
            <Layout>
                {render}
            </Layout>

        )
    }
}

export default withRouter(ModifyEmployee);