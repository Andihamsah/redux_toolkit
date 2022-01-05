import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";
import ShowProduct from "./components/ShowProduct";

function App() {


  return (
    <div className="mt-3">
      <Container>
        <Row>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<ShowProduct />} />
              <Route path="add" element={<AddProduct />} />
              <Route path="edit/:id" element={<EditProduct />} />
            </Routes>
          </BrowserRouter>
        </Row>
      </Container>
    </div>
  );
}

export default App;
