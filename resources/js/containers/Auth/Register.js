import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Container, Form, Button, Row, Col, Card, Alert } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

import styles from './Auth.module.css';

class Register extends Component {

    state = {
        email: "",
        password: "",
        confirm_password: "",
        name: "",
        errors: false
    }

    componentDidMount() {
        const isLogged = localStorage.getItem('isLogged');

        if (isLogged !== null) {
            this.props.history.push({ pathname: '/', });
        }
    }

    registerHandler = () => {
        axios.post('/api/register',
            {
                email: this.state.email,
                password: this.state.password,
                confirm_password: this.state.confirm_password,
                name: this.state.name,
            },
            {
                withCredentials: true
            })
            .then(response => {
                localStorage.setItem('isLogged', true);
                this.props.history.push({ pathname: '/', });
            })
            .catch(error => {
                this.setState({ errors: error.response.data });
            });
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

        return (
            <Container className="py-4">
                <div className="col-md-8 offset-md-2 col-sm-10 offset-sm-1">
                    <Card md="justify-content-md-center">
                        <Card.Header>
                            <Row className="justify-content-md-center">
                                <Col md="12">
                                    <h2 className={styles.Logo}>Registration</h2>
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
                                    <Form.Group controlId="email">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type="email" placeholder="Enter email" value={this.state.email} onChange={(event) => this.setState({ email: event.target.value })} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="justify-content-md-center">
                                <Col md="6">
                                    <Form.Group controlId="password">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Password" value={this.state.password} onChange={(event) => this.setState({ password: event.target.value })} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="justify-content-md-center">
                                <Col md="6">
                                    <Form.Group controlId="confirm_password">
                                        <Form.Label>Confirm password</Form.Label>
                                        <Form.Control type="password" placeholder="Confirm password" value={this.state.confirm_password} onChange={(event) => this.setState({ confirm_password: event.target.value })} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="justify-content-md-center">
                                <Col md="6">
                                    <Form.Group controlId="name">
                                        <Form.Label>First name</Form.Label>
                                        <Form.Control type="text" placeholder="Name" value={this.state.name} onChange={(event) => this.setState({ name: event.target.value })} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="justify-content-md-center">
                                <Col md="6">
                                    <Button className="btn-block" variant="primary" type="submit" onClick={this.registerHandler}>Register</Button>
                                </Col>
                            </Row>
                            <Row className="justify-content-md-center">
                                <Col md="12">
                                    <div className={styles.Link}>
                                        <Link to="/login">Login</Link>
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        )
    }
}

export default withRouter(Register);