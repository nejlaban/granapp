import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';

/* User components */
import GranappNavbar from './components/GranappNavbar';
import ProductShop from './components/ProductShop';
import ErrorPage from './components/ErrorPage';
import Home from './components/Home';
import ListProducts from './components/ListProducts';
import ShowSingleProduct from './components/ShowSingleProduct';
import AddProduct from './components/AddProduct';
import Auth from './components/Auth';

import { isValidJwt } from './utils/jwtValidator';

/* Private routes - if the user is authenticated, render component; otherwise redirect to home page */
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        isValidJwt() === true ? <Component {...props} /> : <Redirect to='/' />
    )} />
  )

const App = () => {
    return (
        <div className="App">
            <GranappNavbar />
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/auth' component={Auth} />
                <Route path='/demo' component={ProductShop} />
                {/* Product-related routes are set as private */}
                <PrivateRoute path='/products/add' component={AddProduct}/>
                <PrivateRoute path='/products/:id' component={ShowSingleProduct} />
                <PrivateRoute path='/products' component={ListProducts} />
                {/* Last item in the Switch: will be matched if no other routes are matched before it. */}
                <Route component={ErrorPage} />
            </Switch>
        </div>
    );
}

export default App;
