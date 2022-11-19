import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { products } from "../productsStore";
import ProductCard from "../components/ProductCard";

const Store = () => {
  // const [productsArr, setProductsArr] = useState(products);

  return (
    <>
      <h1 align="center" className="p-3">Welcome to the Store</h1>
      <Row xs={1} md={3} className="g-4">
        {products.map((product) => {
          return (
            <Col align="center" key={product.id}>
              <ProductCard product={product}/>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default Store;
