import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import Layout from '../hoc/Layout';
import { withRouter } from 'react-router';

class Home extends Component {

    componentDidMount() {
        const isLogged = localStorage.getItem('isLogged');

        if (isLogged === null) {
            this.props.history.push({ pathname: '/login', });
        } else {
            this.checkAuthHandler();
        }
    }

    checkAuthHandler = () => {
        axios.get('/api/checkAuth', { withCredentials: true })
            .then(response => {
            })
            .catch(error => {
                if (error.response.status == 401) {
                    localStorage.removeItem('isLogged');
                    this.props.history.push({ pathname: '/login', });
                }
            });
    };

    render() {
        return (
            <Layout>
                <Container>
                    <h2 className="text-primary" style={{textAlign: "center"}}>Welcome to Magic Buttons!</h2>
                    <p className="text-secondary" style={{textAlign: "center"}}>Please use navigation above to access our features.</p>
                </Container>
            </Layout>);
    }
}

export default withRouter(Home);