import React, { Component } from 'react';
import { Container, Table, Button, Modal, Alert } from 'react-bootstrap';
import Layout from '../../hoc/Layout';
import Spinner from '../../UI/Spinner';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

class Department extends Component 
{
    state = {
        departments: [],
        show: false,
        department_id: false,
        loading: true,
        errors: false
    }

    componentDidMount() {
        this.getDepartments();
    }

    
    getDepartments = () => {

        this.setState({ ...this.state, loading: true });

        axios.get('/api/department', { withCredentials: true })
            .then(response => {
                this.setState({ departments: response.data });
                this.setState({ ...this.state, loading: false });
            })
            .catch(error => {
                if (error.response.status == 401) {
                    localStorage.removeItem('isLogged');
                    this.props.history.push({ pathname: '/login', });
                } else {
                    this.setState({ errors: error.response.data, loading: false, departments: [] });
                }
            });
    }

    handleCloseModal = (confirm) => {
        if (confirm) {
            axios.delete('/api/department/' + this.state.department_id,
                {
                    withCredentials: true
                })
                .then(response => {
                    this.getDepartments();
                })
                .catch(error => {
                    if (error.response.status == 401) {
                        localStorage.removeItem('isLogged');
                        this.props.history.push({ pathname: '/login', });
                    } else {
                        this.setState({ errors: error.response.data, departments: []});
                    }
                });
        }

        this.setState({ ...this.state, show: false, department_id: false });
    }

    handleOpenModal = (position) => {
        this.setState({ ...this.state, show: true, department_id: position });
    }


    render(){
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
                    <Link className="btn btn-success float-right mb-2" to="/department/modify">Add Department</Link>
                    <Table striped bordered hover className="table-sm">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Information</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.departments.map(department => (
                                <tr key={department.id}>
                                    <td>{department.id}</td>
                                    <td>{department.name}</td>
                                    <td>{department.info}</td>
                                    <td><Button variant="info" onClick={() => this.props.history.push({ pathname: '/department/modify/' + department.id, })}>Edit</Button>{' '}</td>
                                    <td><Button variant="danger" onClick={() => this.handleOpenModal(department.id)} >Delete</Button>{' '}</td>
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

export default withRouter(Department);