import { Suspense } from "react";
import { Products } from "../../ui";
import Loading from "./loading";
import axios from "../../lib/api";

export default function ProductsPage() {
  const products = axios.get("/products").then((res) => res.data);
  return (
    <Suspense fallback={<Loading />}>
      <Products products={products} />
    </Suspense>
  );
}
