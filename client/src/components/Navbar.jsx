import { Button, Container, Navbar, Modal } from "react-bootstrap";
import { useState } from "react";
import useCart from "../hooks/useCart";
import CartProduct from "./CartProduct";

const NavbarCmp = () => {
  const [show, setShow] = useState(false);
  const cart = useCart();
  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };

  const productsCount = cart.items.reduce(
    (sum, product) => sum + product.quantity,
    0
  );

  const checkout = async () => {
    const response = await fetch("http://localhost:3500/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: cart.items }),
    });

    const data = await response.json();

    if (data.url) {
      window.location.assign(data.url);
    }
  };

  return (
    <>
      <Navbar expand="sm">
        <Navbar.Brand href="/">Shopping Cart</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Button onClick={handleShow}>
            {productsCount > 0 ? `Cart '${productsCount}' Items` : "Cart"}
          </Button>
        </Navbar.Collapse>
      </Navbar>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Shopping Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {productsCount > 0 ? (
            <>
              <p>Items in your cart:</p>
              {cart.items.map((product, idx) => (
                <CartProduct
                  key={idx}
                  id={product.id}
                  quantity={product.quantity}
                />
              ))}
              <h1>Total: {cart.getTotalCost().toFixed(2)}</h1>
              <Button variant="success" onClick={checkout}>
                Purchase items!
              </Button>
            </>
          ) : (
            <h3>There are no items in your cart !</h3>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NavbarCmp;
