import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProducts, productSelectors, deleteProduct } from "../features/ProductSlice";

function ShowProduct() {
  const dispatch = useDispatch();
  const products = useSelector(productSelectors.selectAll);
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  return (
    <div className="box mt-5">
        <Button variant="primary" as={Link} to="add"><FontAwesomeIcon icon={faPlus}/> Add</Button>
      <Table hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Title</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td>
                  <Button as={Link} to={`edit/${product.id}`} variant="warning" size="sm" className="mx-2"><FontAwesomeIcon icon={faEdit} /></Button>
                  <Button onClick={() => dispatch(deleteProduct(product.id))} variant="danger" size="sm"><FontAwesomeIcon icon={faTrash} /></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ShowProduct;
