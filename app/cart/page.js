"use client";

import { Button, Toast } from "../../ui";
import { useIsLoggedIn, useProductCartCount } from "../../hooks";
import {
  IconArrowNarrowLeft,
  IconMinus,
  IconPlus,
  IconX,
} from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "../../lib/api";
import { useCart, useStoreActions } from "../../store";
import Image from "next/image";
import { convertToCurrencyString } from "../../lib/utils";
import { useMutation } from "@tanstack/react-query";
import { Fragment, useCallback, useEffect, useState } from "react";

export default function Cart() {
  const [shouldShowToast, setShouldShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const router = useRouter();
  const totalCountOfProductsInCart = useProductCartCount();
  const { isLoggedIn, isCheckingIfLoggedIn } = useIsLoggedIn();
  const cart = useCart();
  const { addToCart, removeFromCart, clearCart, setMobileHeader } =
    useStoreActions();
  const { mutate: createOrder, isPending: isCreatingOrder } = useMutation({
    async mutationFn({ requestBody }) {
      const response = await axios.post("/orders", requestBody);

      return response.data;
    },
    onSuccess() {
      clearCart();
    },
  });

  const onGoBack = useCallback(() => {
    router.back();
  }, [router]);

  useEffect(() => {
    setMobileHeader({
      left: (
        <button className="flex items-center" onClick={onGoBack}>
          <IconArrowNarrowLeft />
        </button>
      ),
      middle: (
        <div className="font-medium text-sm text-center">Shopping Cart</div>
      ),
    });

    return () => {
      setMobileHeader({});
    };
  }, [onGoBack, setMobileHeader]);

  const onToastClose = () => {
    setShouldShowToast(false);
  };

  const removeProductFromCartCompletely = (productId) => {
    removeFromCart({ productId, shouldRemoveTheProduct: true });
  };

  const addProductToCart = (product) => {
    addToCart(product);
  };

  const removeProductFromCart = (productId) => {
    removeFromCart({ productId });
  };

  const onCreateOrder = () => {
    if (!isLoggedIn) {
      router.push(`/login?redirectTo=/cart`);
      return;
    }

    createOrder({
      requestBody: cart.map((product) => ({
        id: product.id,
        quantity: product.quantity,
        images: product.images,
        title: product.title,
        price: product.price,
        discountedPrice: product.discountedPrice,
      })),
    });
    setShouldShowToast(true), setToastMessage("You created a new order.");
  };

  return (
    <Fragment>
      <Toast
        isOpen={shouldShowToast}
        status="success"
        message={toastMessage}
        onClose={onToastClose}
      />
      {cart.length === 0 ? (
        <div className="px-4 flex flex-col items-center justify-center mt-20">
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-4 text-center">
            Looks like you haven&apos;t added anything to your cart yet.
          </p>
          <Link href="/">
            <Button variant="secondary" className="px-6 py-2">
              Start Shopping
            </Button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col flex-1 relative">
          <div className="flex-1 overflow-y-auto px-4">
            {cart.map((product) => (
              <div
                key={product.id}
                className="flex gap-6 border-b border-gray-200 border-dashed py-4 last:border-none"
              >
                <Image
                  src={product.images[0]}
                  alt={product.title}
                  width={84}
                  height={84}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1 flex flex-col gap-y-4 justify-between">
                  <div className="flex justify-between gap-x-4 items-start">
                    <h3 className="text-sm font-medium">{product.title}</h3>
                    <button
                      onClick={() =>
                        removeProductFromCartCompletely(product.id)
                      }
                      className="text-xs text-gray-400"
                    >
                      <IconX size={16} className="inline-block" />
                    </button>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-gray-400 line-through">
                        {convertToCurrencyString(product.price)}
                      </p>
                      <p className="text-md text-black">
                        {convertToCurrencyString(product.discountedPrice)}
                      </p>
                    </div>
                    <div className="flex items-center gap-x-3 border border-gray-300 rounded-full w-max">
                      <button
                        onClick={() => removeProductFromCart(product.id)}
                        className="text-sm px-2 py-1.5 active:scale-95 active:bg-gray-200 rounded-full"
                      >
                        <IconMinus size={16} />
                      </button>
                      <span className="text-sm">{product.quantity}</span>
                      <button
                        onClick={() => addProductToCart(product)}
                        className="text-sm px-2 py-1.5 active:scale-95 active:bg-gray-200 rounded-full"
                      >
                        <IconPlus size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="sticky bottom-0 bg-white py-4 px-4 border-t border-gray-200 flex flex-col gap-y-2">
            <div className="flex justify-between">
              <span className="text-lg font-medium">Total:</span>
              <div className="flex flex-col items-end">
                <span className="text-lg font-medium">
                  {convertToCurrencyString(
                    cart.reduce(
                      (total, product) =>
                        total + product.discountedPrice * product.quantity,
                      0
                    )
                  )}
                </span>
              </div>
            </div>
            <Button
              variant="secondary"
              onClick={onCreateOrder}
              className="w-full py-3"
              disabled={isCheckingIfLoggedIn}
              loading={isCreatingOrder}
            >
              Create Order ( {totalCountOfProductsInCart} items )
            </Button>
          </div>
        </div>
      )}
    </Fragment>
  );
}
