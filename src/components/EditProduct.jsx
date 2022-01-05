import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProducts, productSelectors, updateProduct } from "../features/ProductSlice";

function EditProduct() {
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {id} = useParams()

    const product = useSelector((state) => productSelectors.selectById(state, id) )
    
    useEffect(() => {
      dispatch(getProducts)        
    }, [dispatch])

    useEffect(() => {
        if (product) {
            setTitle(product.title)
            setPrice(product.price)
        }
    }, [product])

    const handleUpdate = async (e) => {
        e.preventDefault()
        await dispatch(updateProduct({id, title, price}))
        navigate('/')
    }
  return (
    <div>
      <h3>Edit Product</h3>
      <Form onSubmit={(e) => handleUpdate(e)} >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Product Name</Form.Label>
          <Form.Control type="text" name="title" onChange={(e) => setTitle(e.target.value)} value={title} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Price</Form.Label>
          <Form.Control type="text" name="price"  onChange={(e) => setPrice(e.target.value)} value={price} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Update
        </Button>
      </Form>
    </div>
  );
}

export default EditProduct;
