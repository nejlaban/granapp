import React from 'react'

import { Jumbotron, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import GoogleSignInButton from './GoogleSignInButton';
import { hasValidJwt } from '../utils/jwtValidator';

const Home = () => {
    return (
        <div>
            <Jumbotron>
            <h1>Welcome to Gran<span style={{ color: '#ED5035' }}>App</span>.</h1>
            <p>
                A fresh and affordable approach to shopping.
            </p>
            <p>
                <Button variant="primary" as={NavLink} to='/products'>View products on display</Button>
            </p>
            {
                hasValidJwt() ? (
                    <p>You are logged in. </p>
                ) : (
                    <GoogleSignInButton />
                )
            }
            </Jumbotron>
        </div>
    )
}

export default Home;
