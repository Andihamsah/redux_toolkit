import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveProduct } from "../features/ProductSlice";

function AddProduct() {
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const createProduct = async (e) => {
        e.preventDefault()
        await dispatch(saveProduct({title, price}))
        navigate('/')
    }
  return (
    <div>
      <h3>Add Product</h3>
      <Form onSubmit={(e) => createProduct(e)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Product Name</Form.Label>
          <Form.Control type="text" name="title" onChange={(e) => setTitle(e.target.value)} value={title} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Price</Form.Label>
          <Form.Control type="text" name="price"  onChange={(e) => setPrice(e.target.value)} value={price} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default AddProduct;
