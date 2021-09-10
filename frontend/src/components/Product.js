import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

/* my = margem no eixo y, p = padding em volta toda, rounded = border */

/* Ou então usa destructuring, só colocar {product}, e aí lá embaixo não precisa ter props */
const Product = (props) => {
    return (
        <Card className="my-3 p-3 rounded">
            <Link to={`/id/${props.product.id}`}>
                <Card.Img src={props.product.image} variant="top" />
            </Link>

            <Card.Body>
                <Link to={`/id/${props.product.id}`}>
                    <Card.Title as="div">
                        <strong>{props.product.name}</strong>
                    </Card.Title>
                </Link>
            </Card.Body>

            <Card.Text as="div"></Card.Text>

            <Card.Text as="h3">R${props.product.price}</Card.Text>
        </Card>
    );
};

export default Product;
