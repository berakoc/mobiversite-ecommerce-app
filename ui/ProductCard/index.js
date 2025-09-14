"use client";

import Image from "next/image";
import {
  IconHeart,
  IconHeartFilled,
  IconCirclePlusFilled,
} from "@tabler/icons-react";
import { convertToCurrencyString } from "../../lib/utils";
import Link from "next/link";
import { useStoreActions, useWishlist } from "../../store";
import { useProductCartCount } from "../../hooks";

export const ProductCard = ({ product, className, isCompactMode = false }) => {
  const wishlist = useWishlist();
  const { addToWishlist, removeFromWishlist, addToCart } = useStoreActions();
  const countOfProductInCart = useProductCartCount(product?.id);
  const discountedPrice = product?.discountPercentage
    ? product.price - (product.price * product.discountPercentage) / 100
    : product?.price;
  const shouldRemoveFromWishlist =
    wishlist.find((p) => p?.id === product.id) !== undefined;

  const onWishlistButtonClick = (e) => {
    e.preventDefault();
    if (shouldRemoveFromWishlist) {
      removeFromWishlist(product.id);
      return;
    }
    addToWishlist({
      id: product.id,
      title: product.title,
      brand: product.brand,
      price: product.price,
      discountedPrice,
      images: product.images,
      discountPercentage: product.discountPercentage,
    });
  };

  const onAddToCart = (e) => {
    e.preventDefault();
    addToCart({
      id: product.id,
      title: product.title,
      brand: product.brand,
      price: product.price,
      discountedPrice,
      images: product.images,
      shippingInformation: product.shippingInformation,
      availabilityStatus: product.availabilityStatus,
    });
  };

  return (
    <Link
      href={`/products/${product.id}`}
      className={`border min-w-36 border-gray-200 rounded-lg p-3 relative gap-y-3 flex flex-col ${className}`}
    >
      <div className="absolute -top-2 -left-2 bg-green-500 text-white text-xs font-medium px-2 py-0.5 rounded-tr-lg rounded-bl-lg">
        {product.discountPercentage}% OFF
      </div>
      {countOfProductInCart > 0 && (
        <div className="absolute top-5 left-2 bg-white text-black text-xs font-medium px-1 flex items-center justify-center rounded-full border border-gray-300">
          {countOfProductInCart}
        </div>
      )}
      <button
        onClick={onWishlistButtonClick}
        className="absolute right-2.5 top-2.5 z-10 bg-transparent border-none cursor-pointer"
      >
        {shouldRemoveFromWishlist ? (
          <IconHeartFilled size={24} className="text-green-500" />
        ) : (
          <IconHeart size={24} className="text-black" />
        )}
      </button>
      <div>
        <div className="relative w-full h-[150px]">
          <Image
            src={product.images[0]}
            alt={product.title}
            width={36 * 4}
            height={36 * 4}
            className="object-contain"
          />
        </div>

        <div className="flex flex-col">
          <p className="text-xs text-gray-400">{product.brand}</p>
          <p className="truncate text-xs font-semibold">{product.title}</p>
        </div>
      </div>
      <div className="relative flex items-center bg-gray-100 rounded-full px-3 py-1.5">
        <p className="text-sm font-normal">
          {convertToCurrencyString(discountedPrice)}
        </p>
        {!isCompactMode && (
          <p className="text-sm text-gray-400 line-through ml-2">
            {convertToCurrencyString(product.price)}
          </p>
        )}
        <button
          onClick={onAddToCart}
          className="absolute right-1 bg-transparent border-none cursor-pointer active:scale-95"
        >
          <IconCirclePlusFilled size={24} className="text-black" />
        </button>
      </div>
    </Link>
  );
};
