import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import '../css/App.css';

export default class Loading extends Component {
    render() {
        return (
            <div className="blog-loading">
                <div className="loading">
                    <img src={require('../images/logo.svg')} className="App-logo" alt={'Logo'} />
                </div>
            </div>
        )
    }
}