import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Container, Button, Card, Row, Col, Form, Alert } from 'react-bootstrap';
import Layout from '../../hoc/Layout';
import Spinner from '../../UI/Spinner';

class ModifyDepartment extends Component
{
    state = {
        id: '',
        name: '',
        info: '',
        loading: true,
        errors: false,
        formTitle: 'Edit Department'
    }

    getDepartment = () => {
        axios.get('/api/department/' + this.props.match.params.id, { withCredentials: true })
        .then(response => {

            if (response.data.length > 0) {
                this.setState({
                    id: response.data[0].id,
                    name: response.data[0].name,
                    info: response.data[0].info,
                });
            }

            this.setState({ links: response.data });
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
        let url = '/api/department';

        if (this.state.id != '') {
            url = url + '/' + this.state.id;
        }

        axios.post(url,
            {
                name: this.state.name,
                info: this.state.info,
            },
            {
                withCredentials: true
            })
            .then(response => {
                this.props.history.push({ pathname: '/department', });
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

    componentDidMount(){
        if(!this.props.match.params.id){
            this.setState({loading: false, formTitle: 'Add Department'});
        } else {
            this.getDepartment();
        }
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
                                        <h2 style={{textAlign: "center", color: "#007bff"}}>{this.state.formTitle}</h2>
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
                                        <Form.Group controlId="name">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control type="text" placeholder="Name..." value={this.state.name} onChange={(event) => this.setState({ name: event.target.value })} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="justify-content-md-center">
                                    <Col md="6">
                                        <Form.Group controlId="Information">
                                            <Form.Label>Information</Form.Label>
                                            <Form.Control as="textarea" rows={3} placeholder="Information..." value={this.state.info} onChange={(event) => this.setState({ info: event.target.value })} />
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

export default withRouter(ModifyDepartment);