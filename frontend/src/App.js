import React from 'react';
import logo from './logo.svg';
import { Switch, Route } from 'react-router-dom';
import './App.css';

/* User components */
import GranappNavbar from './components/GranappNavbar';
import ProductShop from './components/ProductShop';
import ErrorPage from './components/ErrorPage';
import Home from './components/Home';
import ListProducts from './components/ListProducts';
import ShowSingleProduct from './components/ShowSingleProduct';
import AddProduct from './components/AddProduct';

const App = () => {
    return (
        <div className="App">
            <GranappNavbar />
            <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/demo' component={ProductShop} />
                <Route path='/products/add' component={AddProduct}/>
                <Route path='/products/:id' component={ShowSingleProduct} />
                <Route path='/products' component={ListProducts} />
                {/* Last item in the Switch: will be matched if no other routes are matched before it. */}
                <Route component={ErrorPage} />
            </Switch>
        </div>
    );
}

export default App;
