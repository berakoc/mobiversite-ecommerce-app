export const dynamic = "force-dynamic";

import { Suspense } from "react";
import { Products } from "../../ui";
import Loading from "./loading";

export default function ProductsPage() {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
  const products = fetch(baseUrl + "/products").then((response) =>
    response.json()
  );
  return (
    <Suspense fallback={<Loading />}>
      <Products products={products} />
    </Suspense>
  );
}
