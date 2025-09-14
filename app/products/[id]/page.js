"use client";
import { useQuery } from "@tanstack/react-query";
import { Button, MobileHeader, Toast } from "../../../ui";
import {
  IconArrowNarrowLeft,
  IconContract,
  IconHeart,
  IconHeartFilled,
  IconPackage,
  IconPackageExport,
  IconPackageOff,
  IconShoppingBag,
  IconStarFilled,
  IconTruck,
} from "@tabler/icons-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import axios from "../../../lib/api";
import Image from "next/image";
import { convertToCurrencyString } from "../../../lib/utils";
import { useStoreActions, useWishlist } from "../../../store";
import { Fragment, useCallback, useEffect, useState } from "react";
import { useProductCartCount } from "../../../hooks";

const AvailabilityStatus = {
  InStock: "In Stock",
  OutOfStock: "Out of Stock",
  LowStock: "Low Stock",
};

const getAvailabilityStatusIcon = (status) => {
  switch (status) {
    case AvailabilityStatus.InStock:
      return <IconPackage size={16} className="text-green-500" />;
    case AvailabilityStatus.OutOfStock:
      return <IconPackageOff size={16} className="text-gray-500" />;
    case AvailabilityStatus.LowStock:
      return <IconPackageExport size={16} className="text-amber-500" />;
    default:
      return null;
  }
};

export default function Product() {
  const [shouldShowToast, setShouldShowToast] = useState(false);
  const wishlist = useWishlist();
  const [toastMessage, setToastMessage] = useState("");
  const router = useRouter();
  const totalCountOfProductsInCart = useProductCartCount();
  const { id: productId } = useParams();
  const countOfProductInCart = useProductCartCount(productId);

  const { addToWishlist, addToCart, removeFromWishlist, setMobileHeader } =
    useStoreActions();
  const { data: product, isPending: isProductLoading } = useQuery({
    queryKey: ["product", productId],
    async queryFn() {
      const response = await axios.get(`/products/${productId}`);
      return response.data;
    },
  });
  const shouldRemoveFromWishlist =
    wishlist.find((p) => p?.id === product?.id) !== undefined;

  const onToastClose = () => {
    setShouldShowToast(false);
  };

  const discountedPrice = product?.discountPercentage
    ? product.price - (product.price * product.discountPercentage) / 100
    : product?.price;

  const onGoBack = useCallback(() => {
    router.back();
  }, [router]);

  const onAddToWishlist = () => {
    if (shouldRemoveFromWishlist) {
      removeFromWishlist(product.id);
      setToastMessage("Product removed from your wishlist");
      setShouldShowToast(true);
      return;
    }
    addToWishlist({
      id: product.id,
      title: product.title,
      price: product.price,
      discountedPrice,
      images: product.images,
      discountPercentage: product.discountPercentage,
    });
    setToastMessage("Product added to your wishlist");
    setShouldShowToast(true);
  };

  const onAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      discountedPrice,
      images: product.images,
      shippingInformation: product.shippingInformation,
      availabilityStatus: product.availabilityStatus,
    });
    setToastMessage("Product added to your cart");
    setShouldShowToast(true);
  };

  useEffect(() => {
    setMobileHeader({
      left: (
        <button onClick={onGoBack}>
          <IconArrowNarrowLeft />
        </button>
      ),
      right: (
        <Link
          href="/cart"
          className="p-2 bg-gray-100 rounded-full active:scale-95"
        >
          <div className="relative">
            <IconShoppingBag size={18} />
            {totalCountOfProductsInCart > 0 && (
              <div className="absolute -bottom-3 -right-3 px-1 rounded-full bg-green-500 flex items-center justify-center">
                <span className="text-xs text-white font-medium">
                  {totalCountOfProductsInCart}
                </span>
              </div>
            )}
          </div>
        </Link>
      ),
    });

    return () => setMobileHeader({});
  }, [onGoBack, setMobileHeader, totalCountOfProductsInCart]);

  return (
    <Fragment>
      <Toast
        isOpen={shouldShowToast}
        status="success"
        message={toastMessage}
        onClose={onToastClose}
      />
      {isProductLoading ? (
        <div className="flex flex-col gap-y-4 px-4">
          <div className="w-full h-64 bg-gray-300 rounded-lg animate-pulse" />
          <div className="flex flex-col gap-y-2">
            <div className="w-1/3 h-6 bg-gray-300 rounded-lg animate-pulse" />
            <div className="w-1/4 h-4 bg-gray-300 rounded-lg animate-pulse" />
            <div className="w-full h-20 bg-gray-300 rounded-lg animate-pulse" />
            <div className="w-1/2 h-6 bg-gray-300 rounded-lg animate-pulse" />
          </div>
        </div>
      ) : (
        product && (
          <div className="flex flex-col gap-y-4 px-4">
            <div className="w-full h-64 relative">
              <Image
                src={product.images[0]}
                alt={product.title}
                fill
                className="object-contain"
              />
            </div>
            <div className="flex flex-col gap-y-3">
              <div className="flex flex-col gap-y-0.5">
                <p className="text-sm text-gray-400 font-medium uppercase">
                  {product.brand}
                </p>
                <h1 className="text-lg font-semibold leading-5">
                  {product.title}
                </h1>
                <div className="flex items-center gap-x-1">
                  <IconStarFilled size={16} className="text-green-500" />
                  <div className="text-sm text-gray-400">
                    {product.rating} ({product.reviews.length} reviews)
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-x-2">
                <p className="text-lg font-normal">
                  {convertToCurrencyString(discountedPrice)}
                </p>
                <p className="text-lg text-gray-400 line-through">
                  {convertToCurrencyString(product.price)}
                </p>
                <div className="text-xs bg-green-100 font-medium p-1 rounded-md text-green-600">
                  {product.discountPercentage}% off
                </div>
              </div>
              <div className="flex flex-col gap-y-1">
                <div className="flex items-center gap-x-1">
                  {getAvailabilityStatusIcon(product.availabilityStatus)}
                  <span className="text-xs font-medium text-gray-400">
                    {product.availabilityStatus}
                  </span>
                </div>
                <div className="flex items-center gap-x-1">
                  <IconTruck size={16} className="text-gray-400" />
                  <span className="text-xs font-medium text-gray-400">
                    {product.shippingInformation}
                  </span>
                </div>
                <div className="flex items-center gap-x-1">
                  <IconContract size={16} className="text-gray-400" />
                  <span className="text-xs font-medium text-gray-400">
                    {product.warrantyInformation}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-700">{product.description}</p>
            </div>
            <div className="flex flex-row gap-x-2 sticky bottom-0 py-4 bg-white">
              <button
                onClick={onAddToWishlist}
                className="w-16 flex items-center justify-center border border-gray-300 rounded-lg py-3 font-medium active:scale-95"
              >
                {shouldRemoveFromWishlist ? (
                  <IconHeartFilled size={24} className="text-green-500" />
                ) : (
                  <IconHeart size={24} className="text-black" />
                )}
              </button>
              <Button
                onClick={onAddToCart}
                className="w-full relative flex items-center justify-center gap-2"
              >
                {countOfProductInCart > 0 && (
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 bg-white text-green-500 text-xs font-semibold px-2 py-0.5 rounded-full">
                    {countOfProductInCart}
                  </span>
                )}
                Add to Cart
              </Button>
            </div>
          </div>
        )
      )}
    </Fragment>
  );
}
