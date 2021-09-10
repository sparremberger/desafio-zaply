//import React, { useState, useEffect } from "react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";

import { listProducts } from "../actions/productActions";
import { listProductDetails } from "../actions/productActions"; //
//import products from "../products";

/* Confere o products.map na cheatsheet qualquer coisa.
   Mas nesse caso ele provavelmente poderia ser substituído por um
   foreach. A output seria a mesma. Estudar mais essa parte. */

/* ^^^ após uma pesquisa no StackOverflow, está rolando uma "interpolação" nessa parte.
   os {} dentro de um componente dizem pro React colocar o conteúdo da variável dentro dele... acho. */
const HomeScreen = () => {
    //const [products, setProducts] = useState([]);
    const dispatch = useDispatch();

    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;

    // Limpa o estado anterior
    useEffect(() => {
        dispatch(listProductDetails());
    }, [dispatch]);

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);

    /*const fetchProducts = async () => {
            const res = await axios.get("/api/products");

            setProducts(res.data);
        };

        fetchProducts();
    }, []);*/
    return (
        <>
            <h1>Produtos</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Row>
                    {products.map((product) => (
                        // Quando fazemos uma lista, cada item precisa ser uma chave (key) única
                        <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>
            )}
        </>
    );
};

export default HomeScreen;
