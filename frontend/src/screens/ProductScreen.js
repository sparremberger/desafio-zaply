import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    Row,
    Col,
    Image,
    ListGroup,
    Card,
    Button,
    Form,
} from "react-bootstrap";

import Message from "../components/Message";
import Loader from "../components/Loader";
import { listProductDetails } from "../actions/productActions";

//import products from "../products";

const ProductScreen = ({ history, match }) => {
    //const product = products.find((p) => p._id === match.params.id);
    //const [product, setProduct] = useState({});
    let showForm = false;

    const dispatch = useDispatch();

    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;

    const showFormHandler = () => {
        console.log(showForm);
        showForm = !showForm;
    };
    useEffect(() => {
        /*const fetchProduct = async () => {
            const res = await axios.get(`/api/products/${match.params.id}`);

            setProduct(res.data);
        };

        fetchProduct();*/
        dispatch(listProductDetails(match.params.id));
    }, [dispatch, match]);

    const newTo = {
        pathname: "/EditScreen",
        params: product,
    };

    return (
        <>
            <Link className="btn btn-light my-3" to="/">
                Voltar
            </Link>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Row>
                    <Col md={6}>
                        <Image
                            src={product.image}
                            alt={product.name}
                            fluid
                        ></Image>
                    </Col>
                    <Col md={3}>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h3>{product.name}</h3>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                Preço: R${product.price}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Categoria: {product.categories}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Marca: {product.brand}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <Card>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Price:</Col>
                                        <Col>
                                            <strong>R${product.price}</strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Link to={newTo}>
                                        <Button
                                            //onClick={showFormHandler}
                                            className="btn-block"
                                            type="button"
                                            //disabled={product.countInStock === 0}
                                        >
                                            Editar
                                        </Button>
                                    </Link>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            )}
        </>
    );
};

export default ProductScreen;
