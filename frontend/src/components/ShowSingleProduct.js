import React, { Component } from 'react'
import { Container, Row, Table, Col, Figure } from 'react-bootstrap'
import Axios from 'axios';

class ShowSingleProduct extends Component {
    constructor(props) {
        super(props);

        this.state = {
            product: {}
        };
    }

    componentDidMount = () => {
        /* Get the ID from the pathname */
        let id = this.props.location.pathname.split('/')[2];

        Axios.get(`http://localhost:3001/public/items/${id}`).then(response => {
            /* Use response.data to access the actual data */
            this.setState({
                product: response.data
            });
        }).catch(error => {
            /* Use error to get the error message, or error.response(.data) to get all data returned with the error. */
            console.log(error.response);
        });
    }

    render() {
        return (
            <div id='show-single-item'>
                <Container>
                    <Row className='justify-content-center'>
                        {
                            this.state.product &&
                            <Figure>
                                <Figure.Image 
                                    src={this.state.product.image}
                                    alt={this.state.product.name}
                                    style={{ maxHeight: 250 }}
                                />
                                <Figure.Caption>
                                    {this.state.product.name}
                                </Figure.Caption>
                            </Figure>
                        }
                    </Row>
                    <Row>   
                        <Col sm={12}>
                            <Table striped bordered hover responsive='md'>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Category</th>
                                    <th>Subcategory</th>
                                    <th>Producer</th>
                                    <th>Country of origin</th>
                                    <th>Barcode</th>
                                    <th>Quantity</th>
                                </tr>
                            </thead>
                            {
                                this.state.product && 
                                <tbody>
                                    <tr>
                                        <td>{this.state.product.name}</td>
                                        <td>{this.state.product.description}</td>
                                        <td>{this.state.product.category}</td>
                                        <td>{this.state.product.subcategory}</td>
                                        <td>{this.state.product.producer}</td>
                                        <td>{this.state.product.country_of_origin}</td>
                                        <td>{this.state.product.barcode}</td>
                                        <td>{this.state.product.quantity}</td>
                                    </tr>
                                </tbody>
                            }
                        </Table>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default ShowSingleProduct; 