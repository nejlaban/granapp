import React, { Component } from 'react'

/* Class component */
class BuyItem extends Component {
    /* Component constructor */
    constructor(props) {
        super(props);

        /* Initial values of variables within the component */
        this.state = {
            numOfItems: this.props.inStock,
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
        if (this.state.numOfItems - this.state.inCart < 0) {
            this.setState({
                message: 'You cannot buy that many items.'
            });
        } else {
            this.setState({
                numOfItems: this.state.numOfItems - this.state.inCart,
                message: `You successfully bought ${this.state.inCart} items of ${this.props.product}.`
            });
        }
    }

    /* Render the component */
    render() {
        return (
            <div id='buy-item'>
                <p>Remaining amount of { this.props.product }: { this.state.numOfItems }</p>
                <p>
                    Enter the amount of { this.props.product } you want to buy: &nbsp;
                    <input type='number' onChange={ this.addToCart }/>
                    <button onClick={ () => { this.buyItem('Purchase sucessfully made.') } }>Buy</button>
                </p>
                <p><b>{ this.state.message }</b></p>
            </div>
        )
    }
}

export default BuyItem;