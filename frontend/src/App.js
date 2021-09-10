import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import EditScreen from "./screens/EditScreen";

function App() {
    return (
        <Router>
            <>
                <main className="py-3">
                    <Container>
                        <Route path="/" component={HomeScreen} exact />{" "}
                        {/* Caso contrário qualquer coisa contendo / cai na rota */}
                        <Route path="/id/:id" component={ProductScreen} />
                        <Route path="/EditScreen" component={EditScreen} />
                    </Container>
                </main>
            </>
        </Router>
    );
}

export default App;
