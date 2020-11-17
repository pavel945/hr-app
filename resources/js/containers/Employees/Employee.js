import React, { Component } from 'react';
import { Container, Table, Button, Modal, Alert } from 'react-bootstrap';
import Layout from '../../hoc/Layout';
import Spinner from '../../UI/Spinner';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

class Employee extends Component {
    state = {
        employees: [],
        show: false,
        employee_id: false,
        loading: true,
        errors: false
    }

    componentDidMount() {
        this.getEmployees();
    }


    getEmployees = () => {

        this.setState({ ...this.state, loading: true });

        axios.get('/api/employee', { withCredentials: true })
            .then(response => {
                this.setState({ employees: response.data });
                this.setState({ ...this.state, loading: false });
            })
            .catch(error => {
                if (error.response.status == 401) {
                    localStorage.removeItem('isLogged');
                    this.props.history.push({ pathname: '/login', });
                } else {
                    this.setState({ errors: error.response.data, loading: false, employees: [] });
                }
            });
    }

    handleCloseModal = (confirm) => {
        if (confirm) {
            axios.delete('/api/employee/' + this.state.employee_id,
                {
                    withCredentials: true
                })
                .then(response => {
                    this.getEmployees();
                })
                .catch(error => {
                    if (error.response.status == 401) {
                        localStorage.removeItem('isLogged');
                        this.props.history.push({ pathname: '/login', });
                    } else {
                        this.setState({ errors: error.response.data, departments: [] });
                    }
                });
        }

        this.setState({ ...this.state, show: false, employee_id: false });
    }

    handleOpenModal = (position) => {
        this.setState({ ...this.state, show: true, employee_id: position });
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
            render =
                <Container>
                    {errors}
                    <Link className="btn btn-success float-right mb-2" to="/employee/modify">Add Employee</Link>
                    <Table striped bordered hover className="table-responsive-sm">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Department</th>
                                <th>Salary</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.employees.map(employee => (
                                <tr key={employee.id}>
                                    <td>{employee.fname}</td>
                                    <td>{employee.lname}</td>
                                    <td>{employee.department_name}</td>
                                    <td>{employee.salary}</td>
                                    <td><Button variant="info" onClick={() => this.props.history.push({ pathname: '/employee/modify/' + employee.id, })}>Edit</Button>{' '}</td>
                                    <td><Button variant="danger" onClick={() => this.handleOpenModal(employee.id)} >Delete</Button>{' '}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <Modal show={this.state.show} onHide={() => this.handleCloseModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Clear Link</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Are you sure?</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => this.handleCloseModal(false)}>
                                No
                            </Button>
                            <Button variant="danger" onClick={() => this.handleCloseModal(true)}>
                                Clear
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Container>
        }

        return (
            <Layout>
                {render}
            </Layout>
        )
    }
}

export default withRouter(Employee);