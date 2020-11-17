import React, { Component } from 'react';
import { Container, Form, Button, Row, Col, Card, Alert } from 'react-bootstrap';
import axios from 'axios';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import styles from './Auth.module.css';

class Login extends Component {

    state = {
        email: '',
        password: '',
        wrongCredentials: false,
    }

    componentDidMount() {
        const isLogged = localStorage.getItem('isLogged');

        if (isLogged !== null) {
            this.props.history.push({ pathname: '/', });
        }
    }

    loginHanlder = () => {
        axios.post('/api/login', { email: this.state.email, password: this.state.password }, { withCredentials: true })
            .then(response => {
                localStorage.setItem('isLogged', true);
                this.props.history.push({ pathname: '/', });
            })
            .catch(error => {
                if (error.response.status == 401) {
                    this.setState({ wrongCredentials: true });
                }
            });
    }

    render() {
        let errors = '';

        if (this.state.wrongCredentials) {
            errors = <Alert variant="danger">
                <Alert.Heading>Wrong credentials</Alert.Heading>
                <p>Wrong username or password</p>
            </Alert>
        }

        return (
            <Container className="py-4">
                <div className="col-md-8 offset-md-2 col-sm-10 offset-sm-1">
                    <Card md="justify-content-md-center">
                        <Card.Header>
                            <Row className="justify-content-md-center">
                                <Col md="12">
                                    <h2 className={styles.Logo}>Login</h2>
                                </Col>
                            </Row>
                        </Card.Header>
                        <Card.Body>
                            <Row className="justify-content-md-center">
                                <Col md="6">
                                    {errors}
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
                                    <Button className="btn-block" variant="primary" type="submit" onClick={this.loginHanlder}>Login</Button>
                                </Col>
                            </Row>
                            <Row className="justify-content-md-center">
                                <Col md="12">
                                    <div className={styles.Link}>
                                        <Link to="/register">Registration</Link>
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        );
    }

}

export default withRouter(Login);
