import React, { Component } from 'react'

/* Asynchronous HTTP library */
import Axios from 'axios';
import { ListGroup, Card, ListGroupItem, CardColumns, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

class ListProducts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [ ]
        };
    }

    /* Use the lifecycle method to fetch relevant data */
    componentDidMount = () => {
        Axios.get('http://localhost:3001/public/items').then(response => {
            /* Use response.data to access the actual data */
            this.setState({
                products: response.data
            });
        }).catch(error => {
            /* Use error to get the error message, or error.response(.data) to get all data returned with the error. */
            console.log(error.response);
        }).finally(() => {
            /* finally() executes at the end of the request, regardless if it succeeded or not */
            console.log(`${this.state.products.length} items have been retrieved.`);
        });
    }

    render() {
        return (
            <div>
                <h2>Product list</h2>
                {
                    this.state.products && this.state.products.length > 0 && 
                    <CardColumns>
                        {
                            this.state.products.map(product => (
                                <Card style={{ width: '18rem', margin: '1rem' }}>
                                    <Card.Img variant="top" src={product.image} />
                                    <Card.Body>
                                        <Card.Title>{product.name}</Card.Title>
                                        <Card.Text>
                                            {product.description}
                                        </Card.Text>
                                    </Card.Body>
                                    <ListGroup className="list-group-flush">
                                        <ListGroupItem><b>Category: </b>{product.category}</ListGroupItem>
                                        <ListGroupItem><b>Subcategory: </b>{product.subcategory}</ListGroupItem>
                                        <ListGroupItem><b>Producer: </b>{product.producer}</ListGroupItem>
                                    </ListGroup>
                                    <Card.Footer>
                                        <Button variant='primary' as={NavLink} exact to={'/products/' + product._id}>View product</Button>
                                    </Card.Footer>
                                </Card>
                            ))
                        }
                    </CardColumns>
                }
                {/* Display if no products are available */}
                {
                    !this.state.products.length && <p className='text-muted'>There are no available products.</p>
                }
            </div>
        )
    }
}

export default ListProducts;