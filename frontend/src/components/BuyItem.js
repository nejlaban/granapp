import React, { Component } from 'react'
import { Button, Form, FormControl } from 'react-bootstrap';

import { connect } from 'react-redux';
import { buyProduct } from '../actions/demoActions';

/* Class component */
class BuyItem extends Component {
    /* Component constructor */
    constructor(props) {
        super(props);

        /* Initial values of variables within the component */
        this.state = {
            inCart: 0,
            message: ''
        };
    }

    /* componentDidMount() example */
    componentDidMount = () => {
        console.log('The shop is open.');
    }

    /* componentShouldUpdate() example */
    shouldComponentUpdate = (nextProps, nextState) => {
        if (nextState.inCart == 20) {
            return false;
        }
        return true;
    }

    /* componentDidUpdate() example */
    componentDidUpdate = (prevProps, prevState) => {
        console.log(`Items before purchase: ${prevState.numOfItems}\nItems after purchase: ${this.state.numOfItems}`);
    }

    /* componentWillUnmount() example */
    componentWillUnmount = () => {
        console.log('The shop is closing...');
    }

    /* Listen to changes in the <input> element, and assign the new value to `inCart` */
    addToCart = (event) => {
        this.setState({
            inCart: event.target.value
        });
    }

    /* Change the amount of remaining items and output a success/error message */
    buyItem = (message) => {
        console.log(message);
        if (this.props.products[this.props.product] - this.state.inCart < 0) {
            this.setState({
                message: 'You cannot buy that many items.'
            });
        } else {
            this.props.buyProduct(this.props.product, this.state.inCart);
            this.setState({
                message: `You successfully bought ${this.state.inCart} items of ${this.props.product}.`
            });
        }
    }

    /* Render the component */
    render() {
        return (
            <div id='buy-item' style={{ marginTop: '1rem' }}>
                <p>Remaining amount of { this.props.product }: { this.props.products[this.props.product] }</p>
                <p>
                    <Form inline className="justify-content-center">
                        <Form.Group>
                            <Form.Label>Enter the amount of { this.props.product } you want to buy: &nbsp;</Form.Label>
                            <FormControl type="number" placeholder="Search for an item" className="mr-sm-2" onChange={ this.addToCart } />
                            <Button  onClick={ () => { this.buyItem('Purchase sucessfully made.') } } variant="outline-success">Buy</Button>
                        </Form.Group>
                    </Form>
                </p>
                <p><b>{ this.state.message }</b></p>
            </div>
        )
    }
}

/* Extracting data from the state */
const mapStateToProps = (state) => {
    /* Return the data which the component needs */
    return {
        products: state.demo
    }
}

/* Dispatch actions and functions that the component will use */
const mapDispatchToProps = (dispatch) => {
    return {
        buyProduct: (name, amount) => { dispatch(buyProduct(name, amount)) }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BuyItem);