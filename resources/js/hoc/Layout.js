import React, { Component } from 'react';
import Aux from './_Aux';
import Navbar from '../components/Navbar';

class Layout extends Component {

    render() {
        return (
            <Aux>
                <Navbar />
                <main className="py-4">
                    {this.props.children}
                </main>
            </Aux>
        );
    }

}

export default Layout;