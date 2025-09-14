"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { IconArrowNarrowLeft } from "@tabler/icons-react";
import { Button } from "../../ui";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "../../lib/api";
import { Fragment, useEffect } from "react";
import { useStoreActions } from "../../store";
import { convertToCurrencyString } from "../../lib/utils";

export default function ProfilePage() {
  const router = useRouter();
  const { setMobileHeader } = useStoreActions();
  const { mutate: logout, isPending: isLoggingOut } = useMutation({
    async mutationFn() {
      const response = await axios.post("/logout");
      return response.data;
    },
    onSuccess() {
      router.push("/login");
    },
  });
  const { data: orders, isPending: isOrdersLoading } = useQuery({
    queryKey: ["orders"],
    async queryFn() {
      const response = await axios.get("/orders", {
        params: {
          userId: 1,
        },
      });
      return response.data;
    },
  });

  const user = {
    id: "user_12345",
    name: "John Doe",
    image: "https://i.pravatar.cc/150?img=12",
  };

  const handleLogout = () => {
    logout();
  };

  const goToWishlist = () => {
    router.push("/wishlist");
  };

  useEffect(() => {
    setMobileHeader({
      left: (
        <Link href="/" className="flex items-center">
          <IconArrowNarrowLeft />
        </Link>
      ),
      middle: <div className="font-medium text-sm text-center">Profile</div>,
    });
    return () => {
      setMobileHeader({});
    };
  });

  return (
    <Fragment>
      <div className="flex flex-col items-center gap-y-2 px-4">
        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200">
          <Image
            src={user.image}
            alt={user.name}
            width={96}
            height={96}
            className="object-cover"
          />
        </div>

        <h2 className="text-xl font-semibold">{user.name}</h2>
        <p className="text-gray-500">ID: {user.id}</p>

        <div className="flex flex-col w-full gap-4 mt-6">
          <Button variant="primary" onClick={goToWishlist}>
            Go to Wishlist
          </Button>
          <Button
            loading={isLoggingOut}
            variant="secondary"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
        <div className="py-4 w-full px-4">
          <h3 className="text-lg font-semibold">Order History</h3>

          {isOrdersLoading ? (
            <div className="space-y-6 animate-pulse">
              {[1, 2].map((s) => (
                <div
                  key={s}
                  className="border rounded-lg shadow-sm p-4 bg-white space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="h-3 w-24 bg-gray-200 rounded"></div>
                      <div className="h-2 w-16 bg-gray-200 rounded"></div>
                    </div>
                    <div className="h-5 w-16 bg-gray-200 rounded-full"></div>
                  </div>
                  <div className="divide-y">
                    {[1, 2].map((p) => (
                      <div key={p} className="flex items-center gap-3 py-3">
                        <div className="w-14 h-14 bg-gray-200 rounded-md"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-3 w-32 bg-gray-200 rounded"></div>
                          <div className="h-2 w-20 bg-gray-200 rounded"></div>
                        </div>
                        <div className="h-3 w-12 bg-gray-200 rounded"></div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-12 text-gray-500">
              <div className="w-16 h-16 mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                📦
              </div>
              <p className="text-base font-medium">No orders yet</p>
              <p className="text-sm text-gray-400">
                When you place an order, it will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="border border-neutral-200 rounded-lg p-4 bg-white"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-sm text-gray-500">
                        Order ID: {order.id}
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span
                      className={`
                text-xs px-2 py-1 rounded-full font-medium
                ${
                  order.status === "Delivered"
                    ? "bg-green-100 text-green-700"
                    : order.status === "Pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-gray-100 text-gray-700"
                }
              `}
                    >
                      {order.status}
                    </span>
                  </div>

                  <div>
                    {order.products.map((product) => (
                      <Link
                        href={`/products/${product.id}`}
                        key={product.id}
                        className="flex items-center gap-3 py-3"
                      >
                        <div className="relative min-w-14 min-h-14 rounded-md overflow-hidden">
                          <Image
                            src={product.images[0]}
                            alt={product.title}
                            width={14 * 4}
                            height={14 * 4}
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium line-clamp-1">
                            {product.title}
                          </p>
                          <p className="text-xs text-gray-500">
                            Qty: {product.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          {product.discountedPrice < product.price ? (
                            <>
                              <p className="text-sm font-semibold text-green-600">
                                {convertToCurrencyString(
                                  product.discountedPrice
                                )}
                              </p>
                              <p className="text-xs text-gray-400 line-through">
                                {convertToCurrencyString(product.price)}
                              </p>
                            </>
                          ) : (
                            <p className="text-sm font-semibold">
                              {convertToCurrencyString(product.price)}
                            </p>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
}
