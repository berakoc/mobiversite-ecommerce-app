import { useCart } from "../store";

export function useProductCartCount(productId) {
  const cart = useCart();

  if (productId) {
    const productInCart = cart.find(
      (product) => product.id === parseInt(productId, 10)
    );
    return productInCart ? productInCart.quantity : 0;
  }

  return cart.reduce((total, product) => total + product.quantity, 0);
}
