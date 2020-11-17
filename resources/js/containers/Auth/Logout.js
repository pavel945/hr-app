import React, { Component } from 'react';
import axios from 'axios';

class Logout extends Component {

    componentDidMount() {
        axios.post('/api/logout', { withCredentials: true })
            .then(response => {
                localStorage.clear();
                this.props.history.push({ pathname: '/login', });
            })
            .catch(error => {
            });
    }

    render() {
        return (
            <p>Logout...</p>
        );
    }

}

export default Logout;