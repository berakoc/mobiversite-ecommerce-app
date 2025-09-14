"use client";

import { use, useCallback, useEffect } from "react";
import { ProductCard } from "..";
import { IconArrowNarrowLeft, IconShoppingBag } from "@tabler/icons-react";
import Link from "next/link";
import { useProductCartCount } from "../../hooks";
import { useRouter } from "next/navigation";
import { useStoreActions } from "../../store";

export function Products({ products }) {
  const allProducts = use(products);
  const router = useRouter();
  const { setMobileHeader } = useStoreActions();
  const totalCountOfProductsInCart = useProductCartCount();

  const onGoBack = useCallback(() => {
    router.back();
  }, [router]);

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

    return () => {
      setMobileHeader({});
    };
  }, [onGoBack, setMobileHeader, totalCountOfProductsInCart]);

  return (
    <div className="grid grid-cols-2 gap-4 px-4">
      {allProducts?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
