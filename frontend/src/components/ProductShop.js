import React, { Component } from 'react'

/* Import custom components */
import WelcomeBar from './WelcomeBar';
import BuyItem from './BuyItem';
import { Form, FormControl, Container, Row, Col, Button } from 'react-bootstrap';

class ProductShop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: 'bread',
            shopIsOpen: true,
            buttonText: 'Close up shop',
            variant: 'danger'
        }
    }

    /* ES6 method - good to go */
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    closeShop = (e) => {
        e.preventDefault();
        this.setState({
            shopIsOpen: !this.state.shopIsOpen,
            buttonText: this.state.shopIsOpen ? 'Open shop' : 'Close up shop',
            variant: this.state.shopIsOpen ? 'success' : 'danger'
        });
    }

    render() {
        return (
            <div id='product-shop'>
                 {/* Use custom components, and send them custom `props` - values */}
                <WelcomeBar appName='GranApp' />
                <Container>
                    <Row>
                        <Col>
                            <Form onSubmit={this.closeShop}>
                                <Form.Group>
                                    <Form.Label>Select a product: &nbsp;</Form.Label>
                                    <Form.Control as='select' name='product' value={this.state.product} onChange={this.handleChange}>
                                        <option value='bread'>Bread</option>
                                        <option value='milk'>Milk</option>
                                        <option value='chocolate'>Chocolate</option>
                                    </Form.Control>
                                </Form.Group>
                                &nbsp;
                                <Button variant={this.state.variant} onClick={this.closeShop}>{this.state.buttonText}</Button>
                            </Form>
                            {/* Conditional rendering of components */}
                            {
                                this.state.shopIsOpen && <BuyItem product={this.state.product} inStock={20} />
                            }
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default ProductShop;