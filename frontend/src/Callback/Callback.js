import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import auth0Client from '../Auth';
import "./Callback.css";


class Callback extends Component {
    async componentDidMount() {
        await auth0Client.handleAuthentication();
        this.props.history.replace('/');
    }

    render() {
        return (
            <div>
                <div className="lds-spinner">
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                </div>
            </div>
        );
    }
}


export default withRouter(Callback);