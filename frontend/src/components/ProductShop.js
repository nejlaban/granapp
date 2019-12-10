import React, { Component } from 'react'

/* Import custom components */
import WelcomeBar from './WelcomeBar';
import BuyItem from './BuyItem';

class ProductShop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: 'bread',
            shopIsOpen: true,
            buttonText: 'Close up shop'
        }
    }

    /* ES6 method - good to go */
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    closeShop = () => {
        this.setState({
            shopIsOpen: !this.state.shopIsOpen,
            buttonText: this.state.shopIsOpen ? 'Open shop' : 'Close up shop'
        });
    }

    render() {
        return (
            <div id='product-shop'>
                 {/* Use custom components, and send them custom `props` - values */}
                <WelcomeBar appName='GranApp' />
                <p>
                    Select a product: &nbsp;
                    <select name='product' value={this.state.product} onChange={this.handleChange}>
                        <option value='bread'>Bread</option>
                        <option value='milk'>Milk</option>
                        <option value='chocolate'>Chocolate</option>
                    </select>
                    &nbsp;
                    <button onClick={this.closeShop}>{this.state.buttonText}</button>
                </p>
                {/* Conditional rendering of components */}
                {
                    this.state.shopIsOpen && <BuyItem product={this.state.product} inStock={20} />
                }
            </div>
        )
    }
}

export default ProductShop;