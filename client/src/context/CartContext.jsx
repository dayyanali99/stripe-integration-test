import { createContext, useState } from "react";
import { getProductData } from "../productsStore";

export const CartContext = createContext({
  items: [],
  getProductQuantity: () => {},
  addOneToCart: () => {},
  removeOneFromCart: () => {},
  deleteFromCart: () => {},
  getTotalCost: () => {},
});

const CartProvider = ({ children }) => {
  const [cartProducts, setCardProducts] = useState([]);

  const getProductQuantity = (id) => {
    const quantity = cartProducts.find(
      (product) => product.id === id
    )?.quantity;
    return quantity == undefined ? 0 : quantity;
  };

  const addOneToCart = (id) => {
    const quantity = getProductQuantity(id);
    if (quantity === 0) {
      setCardProducts([...cartProducts, { id: id, quantity: 1 }]);
    } else {
      setCardProducts(
        cartProducts.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity + 1 }
            : { ...product }
        )
      );
    }
  };

  const deleteFromCart = (id) => {
    setCardProducts(cartProducts.filter((product) => product.id !== id));
  };

  const removeOneFromCart = (id) => {
    const quantity = cartProducts.find((product) => product.id === id).quantity;
    quantity === 1
      ? deleteFromCart(id)
      : setCardProducts(
          cartProducts.map((product) =>
            product.id === id
              ? { ...product, quantity: product.quantity - 1 }
              : { ...product }
          )
        );
  };

  const getTotalCost = () => {
    let totalCost = 0;
    cartProducts.map((cartItem) => {
      const productData = getProductData(cartItem.id);
      totalCost += productData.price * cartItem.quantity;
    });

    return totalCost;
  };

  const contextValue = {
    items: cartProducts,
    getProductQuantity,
    addOneToCart,
    removeOneFromCart,
    deleteFromCart,
    getTotalCost,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
