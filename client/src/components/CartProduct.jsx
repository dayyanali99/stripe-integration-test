import { Button } from "react-bootstrap";
import useCart from "../hooks/useCart";
import { getProductData } from "../productsStore";

const CartProduct = ({ id, quantity }) => {
  const cart = useCart();
  const productData = getProductData(id);

  return (
    <>
      <h3>{productData.title}</h3>
      <p>{quantity} total</p>
      <p>${(quantity * productData.price).toFixed(2)}</p>
      <Button size="sm" onClick={() => cart.deleteFromCart(id)}>
        Remove
      </Button>
      <hr />
    </>
  );
};

export default CartProduct;
