import React from "react";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const EditScreen = (props) => {
    console.log(props.location.params);

    const [state, setState] = useState({
        product: props.location.params,
    });
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const newProductData = {
            id: e.target.id.value,
            image: e.target.image.value,
            name: e.target.name.value,
            categories: e.target.categories.value,
            price: e.target.price.value,
            brand: e.target.brand.value,
        };
        console.log(newProductData);
        axios.put("/api/id", newProductData).then((response) => {
            alert("Dados alterados com sucesso!");
            history.push(`/id/${newProductData.id}`);
        });
    };
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="id">
                <Form.Label>ID</Form.Label>
                <Form.Control type="text" value={state.product.id || ""} />
                <Form.Text className="text-muted">
                    ID do produto. Não pode ser alterado.
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="image">
                <Form.Label>Imagem (link)</Form.Label>
                <Form.Control
                    type="text"
                    defaultValue={state.product.image || ""}
                />
                <Form.Text className="text-muted">
                    URL da imagem do produto.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="name">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                    type="text"
                    defaultValue={state.product.name || ""}
                />
                <Form.Text className="text-muted">Nome do produto.</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="categories">
                <Form.Label>Categorias</Form.Label>
                <Form.Control
                    type="text"
                    defaultValue={state.product.categories || ""}
                />
                <Form.Text className="text-muted">
                    Categorias do produto.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="price">
                <Form.Label>Preço</Form.Label>
                <Form.Control
                    type="text"
                    defaultValue={state.product.price || ""}
                />
                <Form.Text className="text-muted">Preço do produto.</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="brand">
                <Form.Label>Marca</Form.Label>
                <Form.Control type="text" defaultValue={state.product.brand} />
                <Form.Text className="text-muted">Marca do produto.</Form.Text>
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
};

export default EditScreen;
