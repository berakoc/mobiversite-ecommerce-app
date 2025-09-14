"use client";

import { useRouter } from "next/navigation";
import { Button, ProductCard } from "../ui";
import {
  IconArrowRight,
  IconHeart,
  IconHearts,
  IconShoppingBag,
  IconUser,
} from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import axios from "../lib/api";
import { useIsLoggedIn, useProductCartCount } from "../hooks";
import Link from "next/link";
import { useStoreActions } from "../store";
import { Fragment, useCallback, useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { isLoggedIn, isCheckingIfLoggedIn } = useIsLoggedIn();
  const { data: featuredProducts, isLoading: isFeaturedProductsLoading } =
    useQuery({
      queryKey: ["featured-products"],
      queryFn: async () => {
        const response = await axios.get("/products/featured");
        return response.data;
      },
    });
  const totalCountOfProductsInCart = useProductCartCount();
  const { setMobileHeader } = useStoreActions();

  const onGoToLogin = useCallback(() => {
    router.push("/login");
  }, [router]);

  useEffect(() => {
    setMobileHeader({
      left: (
        <div className="flex flex-col gap-y-0.5">
          <span className="text-xs">Welcome back,</span>
          <span className="leading-2 font-medium">John</span>
        </div>
      ),
      middle: null,
      right: isCheckingIfLoggedIn ? (
        <div className="p-2 w-8.5 h-8.5 rounded-full bg-gray-300 animate-pulse" />
      ) : (
        <div className="flex flex-row gap-x-2 items-center">
          <Link
            href="/wishlist"
            className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full active:scale-95"
          >
            <div className="relative">
              <IconHearts size={18} />
              {totalCountOfProductsInCart > 0 && (
                <div className="absolute -bottom-3 -right-3 px-1 rounded-full bg-green-500 flex items-center justify-center">
                  <span className="text-xs text-white font-medium">
                    {totalCountOfProductsInCart}
                  </span>
                </div>
              )}
            </div>
          </Link>
          <Link
            href="/cart"
            className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full active:scale-95"
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
          {isLoggedIn ? (
            <Link
              href="/profile"
              className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full active:scale-95"
            >
              <IconUser size={18} />
            </Link>
          ) : (
            <Button variant="secondary" onClick={onGoToLogin}>
              Login
            </Button>
          )}
        </div>
      ),
    });

    return () => {
      setMobileHeader({});
    };
  }, [
    isCheckingIfLoggedIn,
    isLoggedIn,
    onGoToLogin,
    setMobileHeader,
    totalCountOfProductsInCart,
  ]);
  return (
    <Fragment>
      <div className="flex flex-col gap-y-1">
        <h2 className="text-lg font-semibold px-4">Featured Products</h2>
        <div className="flex items-center flex-row gap-x-2 overflow-x-auto pt-2 relative whitespace-nowrap px-4 [-webkit-overflow-scrolling:touch] no-scrollbar">
          {isFeaturedProductsLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="w-36 h-63 bg-gray-300 rounded-lg animate-pulse flex-shrink-0"
                />
              ))
            : featuredProducts?.map((product) => (
                <ProductCard isCompactMode key={product.id} product={product} />
              ))}
        </div>
      </div>
      <div className="px-4 mt-6">
        <Link href="/products">
          <div className="w-full rounded-xl border border-gray-200 bg-white p-6 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Discover All Products
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Browse our full catalog and find what you need.
              </p>
            </div>
            <IconArrowRight size={20} className="text-gray-500" />
          </div>
        </Link>
      </div>
    </Fragment>
  );
}
