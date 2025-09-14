"use client";

import Link from "next/link";
import { ProductCard } from "../../ui";
import { IconArrowNarrowLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useWishlist, useStoreActions } from "../../store";
import { Button } from "../../ui";
import { Fragment, useCallback, useEffect } from "react";

export default function Wishlist() {
  const router = useRouter();
  const wishlist = useWishlist();
  const { setMobileHeader } = useStoreActions();

  const goBack = useCallback(() => {
    router.back();
  }, [router]);

  useEffect(() => {
    setMobileHeader({
      left: (
        <button onClick={goBack} className="flex items-center">
          <IconArrowNarrowLeft />
        </button>
      ),
      middle: <div className="font-medium text-sm text-center">Wishlist</div>,
    });
    return () => {
      setMobileHeader({});
    };
  }, [goBack, setMobileHeader]);

  return (
    <Fragment>
      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 px-4">
          <h2 className="text-2xl font-bold mb-2">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-4 text-center">
            Looks like you haven&apos;t added any products yet.
          </p>
          <Link href="/products">
            <Button variant="secondary" className="px-6 py-2">
              Browse Products
            </Button>
          </Link>
        </div>
      ) : (
        <div className="px-4 flex flex-col flex-1 gap-y-4 relative mb-8">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </Fragment>
  );
}
