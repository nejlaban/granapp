import React, { Component } from 'react'
import { Button } from 'react-bootstrap';
import { isValidJwt } from '../utils/jwtValidator';

class LogOutButton extends Component {
    constructor(props) {
        super(props);
    }

    /* Remove the token from the storage, and reload the page; */
    /* If you are on an "authorized" (PrivateRoute) page, you should be redirected to the home route. */
    logOut = () => {
        localStorage.removeItem('jwtToken');
        window.location = '.';
    }

    render() {
        return (
            isValidJwt() && <Button onClick={this.logOut} style={{ marginLeft: 10 }} variant='danger'>Log out</Button>
        )
    }
}

export default LogOutButton;