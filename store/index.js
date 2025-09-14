import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useAppStore = create(
  devtools((set) => ({
    cart: [],
    wishlist: [],
    mobileHeader: {
      left: null,
      right: null,
      middle: null,
    },
    actions: {
      addToCart: (product) =>
        set(
          (state) => {
            const existingProduct = state.cart.find((p) => p.id === product.id);
            if (existingProduct) {
              return {
                cart: state.cart.map((p) =>
                  p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
                ),
              };
            }
            return { cart: [...state.cart, { ...product, quantity: 1 }] };
          },
          false,
          "addToCart"
        ),
      removeFromCart: ({ productId, shouldRemoveTheProduct = false }) =>
        set(
          (state) => {
            const existingProduct = state.cart.find((p) => p.id === productId);
            if (
              existingProduct &&
              existingProduct.quantity > 1 &&
              !shouldRemoveTheProduct
            ) {
              return {
                cart: state.cart.map((p) =>
                  p.id === productId ? { ...p, quantity: p.quantity - 1 } : p
                ),
              };
            }
            return {
              cart: state.cart.filter((item) => item.id !== productId),
            };
          },
          false,
          "removeFromCart"
        ),
      clearCart: () =>
        set(
          () => ({
            cart: [],
          }),
          false,
          "clearCart"
        ),
      addToWishlist: (product) =>
        set(
          (state) => ({
            wishlist: [...state.wishlist, product],
          }),
          false,
          "addToWishlist"
        ),
      removeFromWishlist: (productId) =>
        set(
          (state) => ({
            wishlist: state.wishlist.filter((item) => item.id !== productId),
          }),
          false,
          "removeFromWishlist"
        ),
      clearWishlist: () =>
        set(
          () => ({
            wishlist: [],
          }),
          false,
          "clearWishlist"
        ),
      setMobileHeader: ({ left, right, middle }) => {
        set(() => ({ mobileHeader: { left, right, middle } })),
          false,
          "setMobileHeader";
      },
    },
  }))
);

export const useMobileHeader = () => useAppStore((state) => state.mobileHeader);
export const useCart = () => useAppStore((state) => state.cart);
export const useWishlist = () => useAppStore((state) => state.wishlist);
export const useStoreActions = () => useAppStore((state) => state.actions);
